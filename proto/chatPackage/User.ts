// Original file: proto/chat.proto

import type { Status as _chatPackage_Status, Status__Output as _chatPackage_Status__Output } from '../chatPackage/Status';
import type { Role as _chatPackage_Role, Role__Output as _chatPackage_Role__Output } from '../chatPackage/Role';

export interface User {
  'id'?: (number);
  'name'?: (string);
  'status'?: (_chatPackage_Status);
  'avatar'?: (string);
  'role'?: (_chatPackage_Role);
}

export interface User__Output {
  'id'?: (number);
  'name'?: (string);
  'status'?: (_chatPackage_Status__Output);
  'avatar'?: (string);
  'role'?: (_chatPackage_Role__Output);
}
