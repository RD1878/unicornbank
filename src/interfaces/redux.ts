export interface IUser {
  passport: string;
  snils: string;
  contact: {
    phone: string;
    email: string;
  };
}

export interface IActionSaveUser {
  type: string;
  payload: {
    user: IUser;
  };
}
