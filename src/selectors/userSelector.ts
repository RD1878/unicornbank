import { IUser } from "../interfaces/redux";
import { IRootReducer } from "./../reducers";

export const userSelector = ({ user }: IRootReducer): IUser => user;
