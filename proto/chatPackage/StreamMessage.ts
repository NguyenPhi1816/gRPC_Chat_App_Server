// Original file: proto/chat.proto

import type { Long } from '@grpc/proto-loader';

export interface StreamMessage {
  'senderId'?: (number);
  'senderName'?: (string);
  'senderAvatar'?: (string);
  'message'?: (string);
  'createdAt'?: (number | string | Long);
  'roomId'?: (number);
}

export interface StreamMessage__Output {
  'senderId'?: (number);
  'senderName'?: (string);
  'senderAvatar'?: (string);
  'message'?: (string);
  'createdAt'?: (Long);
  'roomId'?: (number);
}
