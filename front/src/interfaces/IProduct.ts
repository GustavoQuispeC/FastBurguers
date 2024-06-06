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
  valune?: number;
}

export interface IProductCart extends IProduct {
  quantity: number;
  drink?: string;
  drinkPrice?: string;
}

export interface IProductList{
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
export interface InsertProductProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  size: string;
  discount: number;
  categoryID: string;
}
export interface InsertErrorProductProps {
  name: string;
  description: string;
  price: string;
  stock: string;
  imgUrl: string;
  size: string;
  discount: string;
  categoryID: string;
}

export interface UpdateProductProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  discount: number;
  categoryID: string;
}
export interface UpdateErrorProductProps {
  
  name: string;
  description: string;
  price: string;
  stock: string;
  imgUrl: string;
  size: string;
  discount: string;
  categoryID: string;
}
