export interface IOrderUser {
    name: string;
    id: string;
    email: string;
    address: string;
    phone: number;
    city: string;
    country: string;
    orders: {
      date: string;
      id: string;
      orderDetails: {
        id: string;
        price: string;
        products: {
          description: string;
          discount: string;
          id: string;
          imgUrl: string;
          name: string;
          price: string;
          size: string;
          stock: number;
        }[];
      };
      statushistory: {
        id: string;
        status: string;
        timestamp: string;
      }[];
    }[];
  }