import { Conversation, Message, User } from "@prisma/client";
import { type } from "os";

export type FullMessageType = Message & {
    sender: User,
    seen: User[],
}

export type FullConversationType = Conversation & {
    users: User[],
    messages: FullMessageType[],
}