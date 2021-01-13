export interface IUser {
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
      number: number;
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
