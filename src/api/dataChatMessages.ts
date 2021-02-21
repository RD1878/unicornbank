import { firebaseAuth } from "../firebase/firebase";
import { IChatMessage } from "../interfaces/chatMessage";
import { db } from "../firebase/firebase";

export const fetchChatMessages = async (): Promise<IChatMessage[]> => {
  const uid = firebaseAuth?.currentUser?.uid;

  const response = await db.ref(`chatMessages/${uid}`).once("value");
  const data = await response.val();

  return data;
};
