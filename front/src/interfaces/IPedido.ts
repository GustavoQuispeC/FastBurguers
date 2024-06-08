import { IProduct } from "./IProduct";

export interface IPedido {
  id: string;
  date: string;
  prince: string;
  products: IProduct[];
}
