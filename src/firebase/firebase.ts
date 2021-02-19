import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import { IUser /* IChatMessage */ } from "../interfaces/redux";

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
  uid: string,
  callback: (snapshot: firebase.database.DataSnapshot) => void
): Promise<unknown> => {
  /* const promise = new Promise((resolve) => {
    const result = db
      .ref("chatMessages/" + uid)
      .limitToLast(10)
      .on("value", callback);
    resolve(result);
  });
  return promise.then(); */
  const result = await db
    .ref("chatMessages/" + uid)
    .limitToLast(10)
    .on("value", callback);
  return result;
};
