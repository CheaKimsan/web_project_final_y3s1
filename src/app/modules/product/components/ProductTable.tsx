import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import StatusBadge from './StatusBadge';
import FormProduct from './FormProduct';
import { useProduct } from '../core/action';
import { Product, ProductStatus } from '../core/model';

interface ProductTableProps {
  products: Product[];
}

const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/50x50/EEE/31343C?text=No+Img';
const PHP_UPLOAD_BASE_URL = 'http://localhost/';

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const { fetchProducts, onDeleteProduct } = useProduct();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Determine status based on quantity
  const determineStatus = (quantity: number): ProductStatus => {
    if (quantity > 5) return 'In Stock';
    if (quantity > 0) return 'Low Stock';
    return 'Out of Stock';
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setModalMode('add');
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    setEditProduct(null);
    await fetchProducts(); // refresh products after add/edit
  };

  const handleDelete = async (id: number) => {
      await onDeleteProduct(id);
      await fetchProducts(); // refresh after delete
  };

  return (
      <div className='table-responsive'>
        <Table className='table-striped align-middle table-hover'>
          <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {products.map(product => {
            const imageUrl = product.thumbnail
                ? `${PHP_UPLOAD_BASE_URL}${product.thumbnail}`
                : PLACEHOLDER_IMAGE_URL;

            return (
                <tr key={product.id}>
                  <td>{product.name.toUpperCase()}</td>
                  <td>{product.category_name}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img
                        src={imageUrl}
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE_URL; }}
                    />
                  </td>
                  <td>
                    <StatusBadge status={determineStatus(product.quantity)} />
                  </td>
                  <td>{product.description}</td>
                  <td>
                    <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(product)}
                    >
                      <PencilSquare /> Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                    >
                      <Trash /> Delete
                    </Button>
                  </td>
                </tr>
            );
          })}
          </tbody>
        </Table>

        <FormProduct
            show={showModal}
            mode={modalMode}
            product={editProduct ?? undefined}
            handleClose={handleCloseModal}
        />
      </div>
  );
};

export default ProductTable;
