import React, { useState, useMemo } from 'react';
import ProductTable from '../components/ProductTable';
import '../../../../_stock_management/assets/scss/custom.scss';
import {ProductStatus } from '../core/model';
import { useProduct } from '../core/action';
import Pagination from '../../../utils/Pagination';
import useCategory from '../../categories/core/action';
import FormProductUI from '../components/FormProduct'; // Import the modal UI

const ProductManagement: React.FC = () => {
  const { products } = useProduct();
  const { categories } = useCategory();

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const statuses: ProductStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];

  const determineStatus = (quantity: number): ProductStatus => {
    if (quantity > 10) return 'In Stock';
    if (quantity > 0) return 'Low Stock';
    return 'Out of Stock';
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch =
        selectedCategory === 'All Categories' || p.category_name === selectedCategory;
      const statusMatch =
        selectedStatus === 'All Status' || determineStatus(p.quantity) === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [products, selectedCategory, selectedStatus]);

  return (
    <div className="card p-4">
      <div className='card-headers d-flex justify-content-between'>
        <h2>Product Management</h2>
        <div>
          <button className='btn btn-success' onClick={handleShowModal}>
            + Add Product
          </button>
        </div>
      </div>

      <div className='d-flex gap-3 mb-4'>
        <select className='form-select w-auto' value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option>All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
        <select
          className='form-select w-auto'
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
        >
          <option value="All Status">All Status</option>
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <ProductTable products={filteredProducts} />

      <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <span>
          Showing 1 to {products.length} of {products.length} results
        </span>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log("Go to page", page)}
        />
      </div>

      {/* Add the modal here */}
      <FormProductUI show={showModal} handleClose={handleCloseModal} mode='add' />
    </div>
  );
};

export default ProductManagement;
