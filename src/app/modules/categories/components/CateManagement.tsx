import React from "react";
import CateTable from "./CateTable";
import { Categories } from "../../../../_stock_management/constants/Category";
import Pagination from "../../users/components/Pagination";

const CateManagement:React.FC = () =>{
    return<>
        <div className="card p-4">
      <div className='card-headers' >
        <h2>Category Management</h2>
        <div>
          <button className='btn btn-secondary me-1'>Export CSV</button>
          <button className='btn btn-success'>+ Add Category</button>
        </div>
      </div>

      <div className='d-flex gap-3 mb-4'>
        <select className='form-select w-auto'><option>All Categories</option></select>
        <select className='form-select w-auto'><option>All Status</option></select>
      </div>

      <CateTable categories={Categories} />

      <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <span>
          Showing 1 to {Categories.length} of {Categories.length} results
        </span>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log("Go to page", page)}
        />
      </div>
    </div>
    </>
}
export default CateManagement;