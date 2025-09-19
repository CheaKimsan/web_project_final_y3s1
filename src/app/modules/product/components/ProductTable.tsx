import React, { useState } from 'react';
import { Product, ProductStatus } from '../core/model';
import StatusBadge from './StatusBadge';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useProduct } from '../core/action';
import FormProduct from './FormProduct';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const { onDeleteProduct } = useProduct();

  const determineStatus = (quantity: number): ProductStatus => {
    if (quantity > 5) return 'In Stock';
    else if (quantity > 0) return 'Low Stock';
    else return 'Out of Stock';
  };

  return (
      <div className='table-responsive'>
        <table className='table table-striped align-middle table-hover'>
          <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category_name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <img
                      src={product.thumbnail}
                      alt={product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </td>
                <td><StatusBadge status={determineStatus(product.quantity)} /></td>
                <td>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditClick(product)}>
                    <PencilSquare /> Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDeleteProduct(product.id)}>
                    <Trash /> Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        <FormProduct
            show={showModal}
            handleClose={() => {
              setShowModal(false);
              setEditProduct(null);
            }}
            mode={editProduct ? 'edit' : 'add'}
            product={editProduct}
        />
      </div>
  );
};

export default ProductTable;