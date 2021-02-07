import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import { IUser, IChatMessages } from "../interfaces/redux";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();

export const db = firebase.database();

export type TUser = firebase.User | null;

export const readUserData = async (uid: string): Promise<IUser> => {
  const result = await db.ref("users/" + uid).once("value");
  const data = await result.val();
  return data;
};

export const readChatMessagesData = async (
  uid: string
): Promise<IChatMessages> => {
  const result = await db.ref("chatMessages/" + uid).once("value");
  const data = await result.val();
  return data;
};
