export interface IProduct {
  //id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  size: string;
  discount: number;
  category: string;
  valune?: number;
  quantity?: number;
}

export interface IProductCart extends IProduct {
  quantity: number;
  drink?: string;
  drinkPrice?: string;
}

export interface IProductList {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  size: string;
  discount: number;
  category: string;
  valune?: number;
}
export interface IProductProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  discount: number;
  categoryID: string;
}
export interface IProducErrorProps {
  name: string;
  description: string;
  price: string;
  stock: string;
  imgUrl: string;
  discount: string;
  categoryID: string;
}
