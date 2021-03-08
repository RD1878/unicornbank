import { db } from "../firebase/firebase";
import { IUser } from "../interfaces/user";

interface IUserWithUid extends IUser {
  uid: string;
}

export const getInfoAboutAnotherUser = async (
  phone: string
): Promise<IUserWithUid> => {
  const res = await db.ref("users").once("value");
  const users = await res.val();
  const arrayUid = Object.keys(users);
  const arrayInfo = arrayUid.map((uid) => ({
    ...users[uid],
    uid,
  }));

  const anotherUserInfo = arrayInfo.find(
    (user) => user.contact?.phone === phone
  );

  return anotherUserInfo;
};
