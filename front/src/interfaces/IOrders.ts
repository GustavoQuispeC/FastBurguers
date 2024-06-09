


import { IProduct } from "./IProduct";

export interface IOrders {
  // id: string;
  // name: string;
  // email: string;
  // phone: number;
  // country: string;
  // address: string;
  // city: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  orderDetails: OrderDetails;
}

export interface OrderDetails {
  id: string;
  price: string;
  products: IProduct[];
  statushistory: Statushistory[];
}
export interface Statushistory {
  id: string;
  status: string;
  timestamp: string;
}
