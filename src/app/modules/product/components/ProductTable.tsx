// src/components/ProductTable.tsx

import React from 'react';
import { Product } from '../../../../types/Product'; // Adjust path
import StatusBadge from './StatusBadge'; // Adjust path

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {

  return (
    <div className='table-responsive'>
      <table className='table align-middle table-hover'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {product.name}
              </td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
              </td>
              <td><StatusBadge status={product.status} /></td>
              <td>
                <button className="btn btn-warning btn-sm me-1">
                  edit
                </button>
                <button className="btn btn-danger btn-sm">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;