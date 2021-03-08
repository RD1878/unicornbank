import { firebaseAuth } from "../firebase/firebase";
import { IUser } from "../interfaces/user";
import { db } from "./../firebase/firebase";

export const fetchUser = async (): Promise<IUser> => {
  const uid = firebaseAuth?.currentUser?.uid;

  const response = await db.ref(`users/${uid}`).once("value");
  const data = await response.val();

  return data;
};
