import { IProduct } from "./IProduct";

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

export interface IOrderList {
  id: string;
  date: string;
  orderDetails: IOrderDetails;
}

export interface IOrderDetails {
  id: string;
  price: string;
  products: IProduct[];
  statushistory: IStatushistory[];
}
export interface IStatushistory {
  id: string;
  status: string;
  timestamp: string;
}
