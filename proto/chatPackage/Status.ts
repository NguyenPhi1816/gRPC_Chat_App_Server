// Original file: proto/chat.proto

export const Status = {
  UNKOWN: 0,
  ONLINE: 1,
  OFFLINE: 2,
} as const;

export type Status =
  | 'UNKOWN'
  | 0
  | 'ONLINE'
  | 1
  | 'OFFLINE'
  | 2

export type Status__Output = typeof Status[keyof typeof Status]
