export interface IChatMessage {
  date: number;
  type: string;
  value: string;
  id: string;
}

export interface IMessages {
  isLoading: boolean;
  chatMessages: IChatMessage[];
}
