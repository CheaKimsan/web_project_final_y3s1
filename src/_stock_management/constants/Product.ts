import { Product } from '../../types/Product';

export const Products: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 120,
    status: 'In Stock',
    thumbnail: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=Audio',
  },
  {
    id: 'prod-002',
    name: 'Cotton T-Shirt',
    category: 'Apparel',
    price: 24.5,
    stock: 300,
    status: 'In Stock',
    thumbnail: 'https://via.placeholder.com/150/10B981/FFFFFF?text=Wear',
  },
  {
    id: 'prod-003',
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 45.0,
    stock: 8,
    status: 'Low Stock',
    thumbnail: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=Style',
  },
  {
    id: 'prod-004',
    name: 'Smartwatch Series 8',
    category: 'Electronics',
    price: 399.0,
    stock: 0,
    status: 'Out of Stock',
    thumbnail: 'https://via.placeholder.com/150/EF4444/FFFFFF?text=Gadget',
  },
  {
    id: 'prod-005',
    name: 'Running Shoes',
    category: 'Footwear',
    price: 89.95,
    stock: 75,
    status: 'In Stock',
    thumbnail: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=Shoes',
  },
];