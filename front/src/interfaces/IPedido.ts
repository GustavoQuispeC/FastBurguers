import { IProduct } from "./IProduct";

export interface IStatusHistory {
  id: string;
  status: string;
  timestamp: string;
}

export interface IOrderDetails {
  id: string;
  price: string;
  products: IProduct[];
  statushistory: IStatusHistory[];
}

export interface IPedido {
  id: string;
  date: string;
  orderDetails: IOrderDetails[];
}
 