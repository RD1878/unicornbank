import { firebaseAuth } from "../firebase/firebase";
import { db } from "./../firebase/firebase";

export interface IUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  icon: null | HTMLImageElement;
  passport: string;
  snils: string;
  contact: {
    phone: string;
    email: string;
  };
  products: {
    cards: {
      balance: number;
      currency: string;
      id: number;
      isActive: boolean;
      number: string;
      requisites: {
        account: number;
        bankOfRecipient: string;
        bik: number;
        correspondentAccount: number;
        inn: number;
        kpp: number;
        purposeOfPayment: string;
        recipient: string;
      };
    }[];
  };
}

export const fetchUser = async (): Promise<IUser> => {
  try {
    const uid = firebaseAuth?.currentUser?.uid;

    const response = await db.ref(`users/${uid}`).once("value");
    const data = await response.val();

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
