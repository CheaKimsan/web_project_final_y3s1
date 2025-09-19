import Pagination from "../../../utils/Pagination";
import React from "react";
import RoleManagement from "./RoleManagement";
import RoleTable from "./RoleTable";

const roleManagement = () => {
    return <>
        <div className="card p-4">
            <div className='card-headers'>
                <h2>Role Management</h2>
                <div>
                    <button className='btn btn-secondary me-1'>Export CSV</button>
                    <button className='btn btn-success'>+ Add Category</button>
                </div>
            </div>

            <div className='d-flex gap-3 mb-4'>
                <select className='form-select w-auto'>
                    <option>All Roles</option>
                </select>
                <select className='form-select w-auto'>
                    <option>All Status</option>
                </select>
            </div>

            <RoleTable />

            <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <span>
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
export default roleManagement;