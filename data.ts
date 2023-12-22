import { Redis } from "ioredis";
import { User } from "./proto/chatPackage/User";
import { StreamMessage } from "./proto/chatPackage/StreamMessage";
import { Account } from "./proto/chatPackage/Account";
import { Room } from "./proto/chatPackage/Room";
import { hashPassword, verifyPassword } from "./password";

const redis = new Redis();

const REDIS_KEYS = {
  messages: "messages",
  users: "users",
  accounts: "accounts",
  rooms: "rooms",
};

type cbFn<T> = (err: Error | null, data: T) => void;

export const addUser = (user: User, fn: cbFn<number>) => {
  redis
    .rpush(REDIS_KEYS.users, JSON.stringify(user))
    .then((n) => fn(null, n))
    .catch((err) => fn(err, -1));
};

export const listUsers = (fn: cbFn<Array<User>>) => {
  redis
    .lrange(REDIS_KEYS.users, 0, -1)
    .then((rows) => {
      const users: Array<User> = [];
      for (let row of rows) {
        const user = JSON.parse(row) as User;
        users.push(user);
      }

      fn(null, users);
    })
    .catch((err) => fn(err, []));
};

export const updateUser = (user: User, fn: cbFn<String>) => {
  listUsers((err, users) => {
    if (err) return fn(err, "");
    const i = users.findIndex((u) => u.id === user.id);
    if (i === -1) return fn(new Error("User was not found"), "");
    redis
      .lset(REDIS_KEYS.users, i, JSON.stringify(user))
      .then((res) => fn(null, res))
      .catch((err) => fn(err, ""));
  });
};

export const getUser = (id: number, fn: cbFn<User>) => {
  listUsers((err, users) => {
    if (err) return fn(err, {});
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) {
      return fn(new Error(`User with ${id} not found`), {});
    }
    return fn(null, users[idx]);
  });
};

export const addMessageToRoom = (message: StreamMessage, fn: cbFn<number>) => {
  redis
    .rpush(REDIS_KEYS.messages, JSON.stringify(message))
    .then((n) => fn(null, n))
    .catch((err) => fn(err, -1));
};

function compareMessagesByTime(
  messageA: StreamMessage,
  messageB: StreamMessage
): number {
  const timeA = new Number(messageA.createdAt).valueOf();
  const timeB = new Number(messageB.createdAt).valueOf();

  return timeA - timeB;
}

export const listMessagesInRoom = (
  roomId: number,
  fn: cbFn<Array<StreamMessage>>
) => {
  redis
    .lrange(REDIS_KEYS.messages, 0, -1)
    .then((rows) => {
      const msgs: Array<StreamMessage> = [];
      for (const row of rows) {
        const msg = JSON.parse(row) as StreamMessage;
        if (msg.roomId === roomId) {
          msgs.push(msg);
        }
      }
      const sortedMsgs = msgs.sort(compareMessagesByTime);
      return fn(null, sortedMsgs);
    })
    .catch((err) => fn(err, []));
};

export const checkUsernameExist = (username: string, fn: cbFn<boolean>) => {
  redis
    .lrange(REDIS_KEYS.accounts, 0, -1)
    .then((rows) => {
      const accounts: Array<Account> = [];
      for (const row of rows) {
        const account = JSON.parse(row) as Account;
        accounts.push(account);
      }
      const idx = accounts.findIndex((a) => a.username === username);
      return fn(null, idx !== -1);
    })
    .catch((err) => fn(err, true));
};

export const addAccount = (account: Account, fn: cbFn<number>) => {
  hashPassword(account.password!)
    .then((hashedPassword) => {
      account.password = hashedPassword;
      redis
        .rpush(REDIS_KEYS.accounts, JSON.stringify(account))
        .then((n) => fn(null, n))
        .catch((err) => fn(err, -1));
    })
    .catch((err) => console.error(err));
};

export const authentication = (
  username: string,
  password: string,
  fn: cbFn<number>
) => {
  redis
    .lrange(REDIS_KEYS.accounts, 0, -1)
    .then((rows) => {
      const accounts: Array<Account> = [];
      for (const row of rows) {
        const account = JSON.parse(row) as Account;
        accounts.push(account);
      }
      const account = accounts.find((a) => a.username === username);

      if (account && account.password) {
        verifyPassword(password, account.password)
          .then((isMatch) => {
            if (isMatch && account.userId) {
              return fn(null, account.userId);
            } else {
              return fn(new Error("Username or password is incorrect"), -1);
            }
          })
          .catch((err) => fn(err, -1));
      } else {
        return fn(new Error("Username or password is incorrect"), -1);
      }
    })
    .catch((err) => fn(err, -1));
};

export const ListRooms = (fn: cbFn<Array<Room>>) => {
  redis
    .lrange(REDIS_KEYS.rooms, 0, -1)
    .then((rows) => {
      const rooms: Array<Room> = [];
      for (let row of rows) {
        const room = JSON.parse(row) as Room;
        rooms.push(room);
      }

      fn(null, rooms);
    })
    .catch((err) => fn(err, []));
};

export const addRoom = (room: Room, fn: cbFn<number>) => {
  redis
    .rpush(REDIS_KEYS.rooms, JSON.stringify(room))
    .then((n) => fn(null, n))
    .catch((err) => fn(err, -1));
};

export const getUsersLength = (fn: cbFn<number>) => {
  redis
    .llen(REDIS_KEYS.users)
    .then((l) => fn(null, l))
    .catch((err) => fn(err, -1));
};
