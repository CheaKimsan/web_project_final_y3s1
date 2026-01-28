// CateManagement.tsx
import React, { useState } from "react";
import CateTable from "./CateTable";
import Pagination from "../../../utils/Pagination";
import { Category } from "../core/model";
import FormCategory from "./FormCategory";

const CateManagement: React.FC = () => {
    const [categories] = useState<Category[]>([]); // declare it
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


  return (
    <div className="card p-4">
      <div className='card-headers'>
        <h2>Category Management</h2>
        <div>
          <button className='btn btn-success' onClick={handleShowModal}>+ Add Category</button>
        </div>
      </div>

      <div className='d-flex gap-3 mb-4'>
        <select className='form-select w-auto'><option>All Categories</option></select>
        <select className='form-select w-auto'><option>All Status</option></select>
      </div>

      {/* pass your array to CateTable */}
      <CateTable category={categories} />

      <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <span>
          Showing 1 to {categories.length} of {categories.length} results
        </span>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log("Go to page", page)}
        />
      </div>

        <FormCategory show={showModal} handleClose={handleCloseModal} mode='add' />
    </div>
  );
};

export default CateManagement;
