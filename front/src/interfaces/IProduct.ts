export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  size: string;
  discount: number;
  category: string;
}

export interface IProductCart extends IProduct {
  quantity: number
}
