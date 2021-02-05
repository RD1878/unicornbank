export interface IUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  avatarUrl: string;
  passport: string;
  snils: string;
  contact: {
    phone: string;
    email: string;
  };
  products: {
    cards: {
      [key: string]: {
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
      };
    };
  };
}

export interface IAction<T> {
  type: string;
  payload: T;
}
