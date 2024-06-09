import { IOrderDetails, IPedido, IStatusHistory } from "./IPedido";
import { IProduct } from "./IProduct";

export interface IOrderUser {
    name: string;
    id: string;
    email: string;
    address: string;
    phone: number;
    city: string;
    country: string;
    orders:IPedido[];
  }