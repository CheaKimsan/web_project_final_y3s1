
import React from 'react';
import { Product } from '../../../../types/Product'; // Adjust path
import ProductTable from '../components/ProductTable'; // Adjust path
import '../../../../_stock_management/assets/scss/custom.scss';
import { Products } from '../../../../_stock_management/constants/Product';
import Pagination from '../../users/components/Pagination';
// Mock data for products


const ProductManagement: React.FC = () => {
  return (
    <div className="card p-4">
      <div className='card-headers' >
        <h2>Product Management</h2>
        <div>
          <button className='btn btn-secondary me-1'>Export CSV</button>
          <button className='btn btn-success'>+ Add Product</button>
        </div>
      </div>

      <div className='d-flex gap-3 mb-4'>
        <select className='form-select w-auto'><option>All Categories</option></select>
        <select className='form-select w-auto'><option>All Status</option></select>
      </div>

      <ProductTable products={Products} />

      <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <span>
          Showing 1 to {Products.length} of {Products.length} results
        </span>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log("Go to page", page)}
        />
      </div>
    </div>
  );
};

export default ProductManagement;