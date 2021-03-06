import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import { IUser } from "../interfaces/user";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();

export const db = firebase.database();

export type TUser = firebase.User | null;

export const readUserData = async (uid: string): Promise<IUser> => {
  const result = await db.ref("users/" + uid).once("value");
  const data = await result.val();
  return data;
};
