import { Redis } from "ioredis";
import { StreamMessage } from "./proto/chatPackage/StreamMessage";
import { User } from "./proto/chatPackage/User";
import { Room } from "./proto/chatPackage/Room";

const sub = new Redis();
const pub = new Redis();

const REDIS_CHANNELS = {
  newMessage: "NEW_MESSAGE",
  userChange: "USER_CHANGE",
  roomChange: "ROOM_CHANGE",
};

sub.subscribe(
  REDIS_CHANNELS.newMessage,
  REDIS_CHANNELS.userChange,
  REDIS_CHANNELS.roomChange,
  (err, count) => {
    if (err) return console.error(err);
    return console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    );
  }
);

export type listenFnCB<T> = (data: T, channel: string) => void;

export const emitMessageUpdate = (msg: StreamMessage) => {
  pub.publish(REDIS_CHANNELS.newMessage, JSON.stringify(msg));
  console.log("publish", msg);
};

export const emitUserUpdate = (user: User) => {
  pub.publish(REDIS_CHANNELS.userChange, JSON.stringify(user));
  console.log("publish", user);
};

export const emitRoomUpdate = (room: Room) => {
  pub.publish(REDIS_CHANNELS.roomChange, JSON.stringify(room));
  console.log("publish", room);
};

export const listenDataUpdate = (
  messageUpdate: listenFnCB<StreamMessage>,
  userUpdate: listenFnCB<User>,
  roomUpdate: listenFnCB<Room>
) => {
  sub.on("message", (channel, data) => {
    console.log(channel, data);

    switch (channel) {
      case REDIS_CHANNELS.newMessage:
        const msg = JSON.parse(data) as StreamMessage;
        messageUpdate(msg, channel);
        break;
      case REDIS_CHANNELS.userChange:
        const user = JSON.parse(data) as User;
        userUpdate(user, channel);
        break;
      case REDIS_CHANNELS.roomChange:
        const room = JSON.parse(data) as Room;
        roomUpdate(room, channel);
        break;
      default:
        break;
    }
  });
};
