
export type ProductStatus =  'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: number;
  name: string;
  category_name: string;
  price: number;
  quantity: number;
  status: ProductStatus;
  description:string;
  thumbnail?: string;
}

export interface ProductPayload {
  pro_name: string;
  cate_id: number;
  price: number;
  qty: number;
  desc: string;
  thumbnail?: File | null;
}




