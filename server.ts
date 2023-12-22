import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/chat";
import { ChatHandlers } from "./proto/chatPackage/Chat";
import {
  ListRooms,
  addAccount,
  addMessageToRoom,
  addRoom,
  addUser,
  authentication,
  checkUsernameExist,
  getUser,
  getUsersLength,
  listMessagesInRoom,
  listUsers,
  updateUser,
} from "./data";
import {
  emitMessageUpdate,
  emitRoomUpdate,
  emitUserUpdate,
  listenDataUpdate,
} from "./pubsub";
import { User } from "./proto/chatPackage/User";
import { Status } from "./proto/chatPackage/Status";
import { StreamMessage } from "./proto/chatPackage/StreamMessage";
import { StreamRequest__Output } from "./proto/chatPackage/StreamRequest";
import { UserStreamResponse } from "./proto/chatPackage/UserStreamResponse";
import { Account } from "./proto/chatPackage/Account";
import { AllUserRequest__Output } from "./proto/chatPackage/AllUserRequest";
import { Role } from "./proto/chatPackage/Role";
import { Room } from "./proto/chatPackage/Room";
import { RoomStreamRequest__Output } from "./proto/chatPackage/RoomStreamRequest";
import { RoomStreamResponse } from "./proto/chatPackage/RoomStreamResponse";

const PORT = 8082;
const PROTO_FILE = "./proto/chat.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const chatPackage = grpcObj.chatPackage;

function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Your server has started on port ${PORT}`);
      server.start();
      setupPubSub();
    }
  );
  // const user: User = {
  //   id: 1,
  //   name: "Admin",
  //   avatar: "https://robohash.org/123.png",
  //   status: Status.ONLINE,
  //   role: Role.ADMIN,
  // };

  // const account: Account = {
  //   userId: 1,
  //   username: "Admin",
  //   password: "123456",
  // };

  // addUser(user, (err) => {
  //   if (err) return;
  //   addAccount(account, (err) => {
  //     if (err) return;
  //     emitUserUpdate(user);
  //     return;
  //   });
  // });
}

const messageStreamByUserId = new Map<
  number,
  grpc.ServerWritableStream<StreamRequest__Output, StreamMessage>
>();
const userStreamByUserId = new Map<
  number,
  grpc.ServerWritableStream<StreamRequest__Output, UserStreamResponse>
>();
const allUserStreamByUserId = new Map<
  number,
  grpc.ServerWritableStream<AllUserRequest__Output, UserStreamResponse>
>();
const RoomStreamByUserId = new Map<
  number,
  grpc.ServerWritableStream<RoomStreamRequest__Output, RoomStreamResponse>
>();

const usersInRoom = new Map<number, Array<User>>();

const usersInRoomUpdate = () => {
  for (const [, userCall] of userStreamByUserId) {
    const { roomId = -1 } = userCall.request;
    const users = usersInRoom.get(roomId);
    userCall.write({ users });
  }
};

function getServer() {
  const server = new grpc.Server();
  server.addService(chatPackage.Chat.service, {
    Register: (call, callback) => {
      const username = call.request.username;
      const password = call.request.password;
      const name = (call.request.name || "").trim();
      const avatar = call.request.avatarUrl || "";

      if (!username || !password || !name || !avatar)
        return callback(new Error("Missing information."));

      checkUsernameExist(username, (err, isExist) => {
        if (err) return callback(err);
        if (isExist) return callback(new Error("Username exist"));

        getUsersLength((err, len) => {
          if (err) return callback(err);
          const user: User = {
            id: len + 1,
            name: name,
            avatar: avatar,
            status: Status.ONLINE,
            role: Role.USER,
          };

          const account: Account = {
            userId: user.id,
            username: username,
            password: password,
          };

          addUser(user, (err) => {
            if (err) return callback(err);
            addAccount(account, (err) => {
              if (err) return callback(err);
              emitUserUpdate(user);
              return callback(null, { id: user.id });
            });
          });
        });
      });
    },
    ChatInitiate: (call, callback) => {
      const username = call.request.username;
      const password = call.request.password;

      if (!username || !password)
        return callback(new Error("Missing username or password."));

      authentication(username, password, (err, user_id) => {
        if (err) return callback(err);
        listUsers((err, users) => {
          if (err) return callback(err);
          const dbUser = users.find((u) => u.id === user_id);
          if (dbUser === undefined)
            return callback(new Error("Something went wrong."));
          dbUser.status = Status.ONLINE;
          updateUser(dbUser, (err) => {
            if (err) return callback(err);
            emitUserUpdate(dbUser);
            return callback(null, { user: dbUser });
          });
        });
      });
    },
    SendMessage: (call, callback) => {
      const { senderId = -1, roomId = -1, message = "" } = call.request;
      if (!senderId || !message || !roomId)
        return callback(new Error("Something went wrong."));

      getUser(senderId, (err, user) => {
        if (err) return callback(err);
        const msg: StreamMessage = {
          senderId: user.id,
          message,
          senderName: user.name,
          senderAvatar: user.avatar,
          createdAt: new Date().getTime(),
          roomId,
        };
        addMessageToRoom(msg, (err) => {
          if (err) return callback(err);
          emitMessageUpdate(msg);
          callback(null);
        });
      });
    },
    ChatStream: (call) => {
      const { userId = -1, roomId = -1 } = call.request;
      if (!userId || !roomId) return call.end();
      getUser(userId, (err, user) => {
        if (err) return call.end();
        listMessagesInRoom(roomId, (err, msgs) => {
          if (err) return call.end();
          for (const msg of msgs) {
            call.write(msg);
          }

          let _usersInRoom = usersInRoom.get(roomId);
          if (_usersInRoom === undefined) _usersInRoom = [];
          usersInRoom.set(roomId, [..._usersInRoom, user]);
          usersInRoomUpdate();

          messageStreamByUserId.set(userId, call);
        });
        call.on("cancelled", () => {
          console.log(`${user.name} has cancelled the message stream`);
          let _usersInRoom = usersInRoom.get(roomId);
          if (_usersInRoom === undefined) _usersInRoom = [];
          else {
            const idx = _usersInRoom.indexOf(user);
            if (idx !== -1) {
              _usersInRoom.splice(idx, 1);
            }
          }
          usersInRoom.set(roomId, _usersInRoom);
          usersInRoomUpdate();

          messageStreamByUserId.delete(userId);
        });
      });
    },
    UserStream: (call) => {
      const { userId = -1, roomId = -1 } = call.request;
      if (!userId || !roomId) return call.end();
      getUser(userId, (err) => {
        if (err) return call.end();
        const users = usersInRoom.get(roomId);
        call.write({ users });
        userStreamByUserId.set(userId, call);
        call.on("cancelled", () => userStreamByUserId.delete(userId));
      });
    },
    AllUserStream: (call) => {
      const { userId } = call.request;
      if (!userId) return call.end();
      getUser(userId, (err, user) => {
        if (err) return call.end();
        listUsers((err, users) => {
          if (err) return call.end();
          call.write({ users });
          allUserStreamByUserId.set(userId, call);
          call.on("cancelled", () => {
            allUserStreamByUserId.delete(userId);
          });
        });
      });
    },
    LogOut: (call, callback) => {
      const { userId } = call.request;
      if (!userId) return callback(new Error("Something went wrong."));
      getUser(userId, (err, user) => {
        if (err) return callback(new Error("User is not found."));
        user.status = Status.OFFLINE;
        updateUser(user, (err) => {
          if (err)
            return callback(
              new Error("Something went wrong when updating user status.")
            );
          emitUserUpdate(user);
          callback(null);
        });
      });
    },
    createRoom: (call, callback) => {
      const {
        userId = -1,
        name = "",
        description = "",
        imageUrl = "",
      } = call.request;

      if (!userId || !name || !description || !imageUrl)
        return callback(new Error("Missing information."));
      getUser(userId, (err, user) => {
        if (err) return callback(err);
        if (user.role !== Role.ADMIN)
          return callback(new Error("Permission denied."));

        ListRooms((err, rooms) => {
          if (err) return callback(err);
          const roomLen = rooms.length + 1;
          const room: Room = {
            id: roomLen,
            name,
            description,
            imageUrl,
          };
          addRoom(room, (err) => {
            if (err) return callback(err);
            emitRoomUpdate(room);
            return callback(null, { id: room.id });
          });
        });
      });
    },
    RoomStream: (call) => {
      const { userId = -1 } = call.request;
      if (!userId) return call.end();
      getUser(userId, (err, user) => {
        if (err) return call.end();
        ListRooms((err, rooms) => {
          if (err) return call.end();
          call.write({ rooms });
          RoomStreamByUserId.set(userId, call);
          call.on("cancelled", () => {
            RoomStreamByUserId.delete(userId);
          });
        });
      });
    },
  } as ChatHandlers);

  return server;
}

const setupPubSub = () => {
  const messageUpdate = (msg: StreamMessage) => {
    for (const [, userCall] of messageStreamByUserId) {
      if (msg.roomId === userCall.request.roomId) {
        userCall.write(msg);
      }
    }
  };

  const userUpdate = () => {
    for (const [, userCall] of allUserStreamByUserId) {
      listUsers((err, users) => {
        if (err) return userCall.end();
        userCall.write({ users });
      });
    }
  };

  const roomUpdate = () => {
    for (const [, userCall] of RoomStreamByUserId) {
      ListRooms((err, rooms) => {
        if (err) return userCall.end();
        userCall.write({ rooms });
      });
    }
  };

  listenDataUpdate(messageUpdate, userUpdate, roomUpdate);
};

main();
