export interface IStatusHistory {
  id: string;
  status: string;
  timestamp: string;
}

export interface IOrderDetails {
  id: string;
  price: string;
}

export interface IPedido {
  id: string;
  date: string;
  orderDetails: IOrderDetails;
  statushistory: IStatusHistory[];
}
