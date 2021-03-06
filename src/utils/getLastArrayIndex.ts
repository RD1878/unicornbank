import { IChatMessage } from "../interfaces/chatMessage";

export const getLastArrayIndex = (array: IChatMessage[]): number =>
  array.length - 1;
