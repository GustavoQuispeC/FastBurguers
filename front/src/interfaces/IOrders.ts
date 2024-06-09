import { IProduct } from "./IProduct";

export interface IOrders {
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
