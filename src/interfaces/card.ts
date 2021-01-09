interface ICard {
  id: number;
  number: number;
  currency: string;
  balance: number;
  isActive: boolean;
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
