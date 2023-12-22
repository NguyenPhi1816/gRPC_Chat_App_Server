// Original file: proto/chat.proto


export interface MessageRequest {
  'senderId'?: (number);
  'roomId'?: (number);
  'message'?: (string);
}

export interface MessageRequest__Output {
  'senderId'?: (number);
  'roomId'?: (number);
  'message'?: (string);
}
