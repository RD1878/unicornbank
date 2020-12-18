interface IOperation {
  id: number;
  accountId: string;
  date: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  type: string;
  category: string;
}

export type { IOperation };
