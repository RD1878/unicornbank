interface ICard {
  number: string;
  currency: string;
  balance: number;
  isActive: boolean;
  validity: {
    month: number;
    year: number;
  };
  operations: {
    [key: string]: {
      amount: number;
      category: string;
      currency: string;
      date: string;
      description: string;
      name: string;
      type: string;
    };
  };
  requisites: {
    recipient: string;
    account: number;
    purposeOfPayment: string;
    bik: string;
    bankOfRecipient: string;
    correspondentAccount: string;
    inn: string;
    kpp: string;
  };
}

export type { ICard };
