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
  // id: string;
  amount: string;
  orderDetailsProducts: [
    {
      quantity: number;
      products: {
        id: string;
        name: string;
        imgUrl: string;
        price: string;
        discount: string;
      };
    }
  ];

  statushistory: IStatushistory[];
}
export interface IStatushistory {
  // id: string;
  status: string;
  timestamp: string;
}
