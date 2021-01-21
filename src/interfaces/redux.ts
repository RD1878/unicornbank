export interface IUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  avatarURL: string;
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
      validity: {
        month: number;
        year: number;
      };
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

export interface IActionSaveUser {
  type: string;
  payload: {
    user: IUser;
  };
}
