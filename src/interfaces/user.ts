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
  isLoading: boolean;
  products: {
    cards: {
      [key: string]: {
        balance: number;
        currency: string;
        isActive: boolean;
        number: string;
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
          account: number;
          bankOfRecipient: string;
          bik: string;
          correspondentAccount: string;
          inn: string;
          kpp: string;
          purposeOfPayment: string;
          recipient: string;
        };
      };
    };
  };
}
