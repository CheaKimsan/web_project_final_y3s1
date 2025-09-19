
export type ProductStatus =  'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: number;
  name: string;
  category_name: string;
  price: string | number;
  quantity: number;
  status: ProductStatus;
  thumbnail?: string;
}




