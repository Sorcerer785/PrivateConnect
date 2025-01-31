import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Message {
  'id' : string,
  'content' : string,
  'sender' : Principal,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'deleteMessage' : ActorMethod<[string], boolean>,
  'getMessages' : ActorMethod<[], Array<Message>>,
  'sendMessage' : ActorMethod<[string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
