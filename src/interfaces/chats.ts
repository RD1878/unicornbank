import { IHeadUserData } from "./user";
import { IChatMessage } from "../interfaces/chatMessage";

export interface IChat {
  clientData: IHeadUserData;
  dialog: IChatMessage[];
  isRead: boolean;
}

export interface IChats {
  [key: string]: IChat;
}
