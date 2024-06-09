import { IOrderList } from "./IOrderList";

export interface IOrderUser {
  name: string;
  id: string;
  email: string;
  address: string;
  phone: number;
  city: string;
  country: string;
  orders: IOrderList[];
}
