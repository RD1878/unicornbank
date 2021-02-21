export interface IChatMessage {
  date: number;
  type: string;
  value: string;
}

export interface IMessages {
  isLoading: boolean;
  chatMessages: IChatMessage[];
}
