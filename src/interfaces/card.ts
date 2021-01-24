interface ICard {
  id: number;
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
      id: number;
      name: string;
      type: string;
    };
  };
  requisites: {
    recipient: string;
    account: number;
    purposeOfPayment: string;
    bik: number;
    bankOfRecipient: string;
    correspondentAccount: number;
    inn: number;
    kpp: number;
  };
}

export type { ICard };
