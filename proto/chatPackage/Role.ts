// Original file: proto/chat.proto

export const Role = {
  ADMIN: 0,
  USER: 1,
} as const;

export type Role =
  | 'ADMIN'
  | 0
  | 'USER'
  | 1

export type Role__Output = typeof Role[keyof typeof Role]
