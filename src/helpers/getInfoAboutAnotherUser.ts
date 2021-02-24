import { db } from "../firebase/firebase";
// import { ICard } from "../interfaces/card";
import { IUser } from "../interfaces/user";
import { NOT_NUMBER_REGEX } from "../Pages/Profile/Profile";

interface IUserWithUid extends IUser {
  uid: string;
}

const cleanPhone = (phone: string): string =>
  phone.replace(NOT_NUMBER_REGEX, "");

export const getInfoAboutAnotherUser = async (
  phone: string
): Promise<IUserWithUid> => {
  const cleanedPhone = cleanPhone(phone);
  const res = await db.ref("users").once("value");
  const users = await res.val();
  const arrayUid = Object.keys(users);
  const arrayInfo = arrayUid.map((uid) => ({
    ...users[uid],
    uid,
  }));

  const anotherUserInfo = arrayInfo.find(
    (user) => user.contact?.phone === cleanedPhone
  );

  // const cards = anotherUserInfo.products.cards;
  // const arrayCards = Object.keys(cards);
  // const cardsInfo = arrayCards.map((id) => ({
  //   ...cards[id],
  //   id,
  // }));

  // const anotherCardInfo = cardsInfo.find((card) => card.isActive === true);
  // const card2Id = anotherCardInfo.id;

  // const card2Info = anotherCardInfo.products.cards[card2Id];
  // const { uid: anotherUserUid } = anotherUserInfo;

  return anotherUserInfo;
};
