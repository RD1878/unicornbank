import { firebaseAuth } from "../firebase/firebase";
import { IChatMessages } from "../interfaces/redux";
import { db } from "../firebase/firebase";

export const fetchChatMessages = async (): Promise<IChatMessages> => {
  const uid = firebaseAuth?.currentUser?.uid;

  const response = await db.ref(`chatMessages/${uid}`).once("value");
  const data = await response.val();

  return data;
};
