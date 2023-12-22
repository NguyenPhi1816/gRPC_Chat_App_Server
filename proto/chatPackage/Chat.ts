// Original file: proto/chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AllUserRequest as _chatPackage_AllUserRequest, AllUserRequest__Output as _chatPackage_AllUserRequest__Output } from '../chatPackage/AllUserRequest';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { InitiateRequest as _chatPackage_InitiateRequest, InitiateRequest__Output as _chatPackage_InitiateRequest__Output } from '../chatPackage/InitiateRequest';
import type { InitiateResponse as _chatPackage_InitiateResponse, InitiateResponse__Output as _chatPackage_InitiateResponse__Output } from '../chatPackage/InitiateResponse';
import type { LogOutRequest as _chatPackage_LogOutRequest, LogOutRequest__Output as _chatPackage_LogOutRequest__Output } from '../chatPackage/LogOutRequest';
import type { MessageRequest as _chatPackage_MessageRequest, MessageRequest__Output as _chatPackage_MessageRequest__Output } from '../chatPackage/MessageRequest';
import type { RegisterRequest as _chatPackage_RegisterRequest, RegisterRequest__Output as _chatPackage_RegisterRequest__Output } from '../chatPackage/RegisterRequest';
import type { RegisterResponse as _chatPackage_RegisterResponse, RegisterResponse__Output as _chatPackage_RegisterResponse__Output } from '../chatPackage/RegisterResponse';
import type { RoomRequest as _chatPackage_RoomRequest, RoomRequest__Output as _chatPackage_RoomRequest__Output } from '../chatPackage/RoomRequest';
import type { RoomResponse as _chatPackage_RoomResponse, RoomResponse__Output as _chatPackage_RoomResponse__Output } from '../chatPackage/RoomResponse';
import type { RoomStreamRequest as _chatPackage_RoomStreamRequest, RoomStreamRequest__Output as _chatPackage_RoomStreamRequest__Output } from '../chatPackage/RoomStreamRequest';
import type { RoomStreamResponse as _chatPackage_RoomStreamResponse, RoomStreamResponse__Output as _chatPackage_RoomStreamResponse__Output } from '../chatPackage/RoomStreamResponse';
import type { StreamMessage as _chatPackage_StreamMessage, StreamMessage__Output as _chatPackage_StreamMessage__Output } from '../chatPackage/StreamMessage';
import type { StreamRequest as _chatPackage_StreamRequest, StreamRequest__Output as _chatPackage_StreamRequest__Output } from '../chatPackage/StreamRequest';
import type { UserStreamResponse as _chatPackage_UserStreamResponse, UserStreamResponse__Output as _chatPackage_UserStreamResponse__Output } from '../chatPackage/UserStreamResponse';

export interface ChatClient extends grpc.Client {
  AllUserStream(argument: _chatPackage_AllUserRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  AllUserStream(argument: _chatPackage_AllUserRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  allUserStream(argument: _chatPackage_AllUserRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  allUserStream(argument: _chatPackage_AllUserRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  
  ChatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  ChatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  ChatInitiate(argument: _chatPackage_InitiateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  ChatInitiate(argument: _chatPackage_InitiateRequest, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _chatPackage_InitiateRequest, callback: grpc.requestCallback<_chatPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  
  ChatStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  ChatStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  chatStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  chatStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  
  LogOut(argument: _chatPackage_LogOutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  LogOut(argument: _chatPackage_LogOutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  LogOut(argument: _chatPackage_LogOutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  LogOut(argument: _chatPackage_LogOutRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  logOut(argument: _chatPackage_LogOutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  logOut(argument: _chatPackage_LogOutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  logOut(argument: _chatPackage_LogOutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  logOut(argument: _chatPackage_LogOutRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _chatPackage_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _chatPackage_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _chatPackage_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _chatPackage_RegisterRequest, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _chatPackage_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _chatPackage_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _chatPackage_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _chatPackage_RegisterRequest, callback: grpc.requestCallback<_chatPackage_RegisterResponse__Output>): grpc.ClientUnaryCall;
  
  RoomStream(argument: _chatPackage_RoomStreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_RoomStreamResponse__Output>;
  RoomStream(argument: _chatPackage_RoomStreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_RoomStreamResponse__Output>;
  roomStream(argument: _chatPackage_RoomStreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_RoomStreamResponse__Output>;
  roomStream(argument: _chatPackage_RoomStreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_RoomStreamResponse__Output>;
  
  SendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  UserStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  UserStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  userStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  userStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  
  createRoom(argument: _chatPackage_RoomRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  createRoom(argument: _chatPackage_RoomRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  createRoom(argument: _chatPackage_RoomRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  createRoom(argument: _chatPackage_RoomRequest, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  createRoom(argument: _chatPackage_RoomRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  createRoom(argument: _chatPackage_RoomRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  createRoom(argument: _chatPackage_RoomRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  createRoom(argument: _chatPackage_RoomRequest, callback: grpc.requestCallback<_chatPackage_RoomResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ChatHandlers extends grpc.UntypedServiceImplementation {
  AllUserStream: grpc.handleServerStreamingCall<_chatPackage_AllUserRequest__Output, _chatPackage_UserStreamResponse>;
  
  ChatInitiate: grpc.handleUnaryCall<_chatPackage_InitiateRequest__Output, _chatPackage_InitiateResponse>;
  
  ChatStream: grpc.handleServerStreamingCall<_chatPackage_StreamRequest__Output, _chatPackage_StreamMessage>;
  
  LogOut: grpc.handleUnaryCall<_chatPackage_LogOutRequest__Output, _google_protobuf_Empty>;
  
  Register: grpc.handleUnaryCall<_chatPackage_RegisterRequest__Output, _chatPackage_RegisterResponse>;
  
  RoomStream: grpc.handleServerStreamingCall<_chatPackage_RoomStreamRequest__Output, _chatPackage_RoomStreamResponse>;
  
  SendMessage: grpc.handleUnaryCall<_chatPackage_MessageRequest__Output, _google_protobuf_Empty>;
  
  UserStream: grpc.handleServerStreamingCall<_chatPackage_StreamRequest__Output, _chatPackage_UserStreamResponse>;
  
  createRoom: grpc.handleUnaryCall<_chatPackage_RoomRequest__Output, _chatPackage_RoomResponse>;
  
}

export interface ChatDefinition extends grpc.ServiceDefinition {
  AllUserStream: MethodDefinition<_chatPackage_AllUserRequest, _chatPackage_UserStreamResponse, _chatPackage_AllUserRequest__Output, _chatPackage_UserStreamResponse__Output>
  ChatInitiate: MethodDefinition<_chatPackage_InitiateRequest, _chatPackage_InitiateResponse, _chatPackage_InitiateRequest__Output, _chatPackage_InitiateResponse__Output>
  ChatStream: MethodDefinition<_chatPackage_StreamRequest, _chatPackage_StreamMessage, _chatPackage_StreamRequest__Output, _chatPackage_StreamMessage__Output>
  LogOut: MethodDefinition<_chatPackage_LogOutRequest, _google_protobuf_Empty, _chatPackage_LogOutRequest__Output, _google_protobuf_Empty__Output>
  Register: MethodDefinition<_chatPackage_RegisterRequest, _chatPackage_RegisterResponse, _chatPackage_RegisterRequest__Output, _chatPackage_RegisterResponse__Output>
  RoomStream: MethodDefinition<_chatPackage_RoomStreamRequest, _chatPackage_RoomStreamResponse, _chatPackage_RoomStreamRequest__Output, _chatPackage_RoomStreamResponse__Output>
  SendMessage: MethodDefinition<_chatPackage_MessageRequest, _google_protobuf_Empty, _chatPackage_MessageRequest__Output, _google_protobuf_Empty__Output>
  UserStream: MethodDefinition<_chatPackage_StreamRequest, _chatPackage_UserStreamResponse, _chatPackage_StreamRequest__Output, _chatPackage_UserStreamResponse__Output>
  createRoom: MethodDefinition<_chatPackage_RoomRequest, _chatPackage_RoomResponse, _chatPackage_RoomRequest__Output, _chatPackage_RoomResponse__Output>
}
