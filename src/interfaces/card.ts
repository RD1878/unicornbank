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
