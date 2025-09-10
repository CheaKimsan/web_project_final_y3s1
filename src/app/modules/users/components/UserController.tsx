import React, { useState } from "react";
import UserTable from "./UserTable";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import "../../../../_stock_management/assets/scss/custom.scss";
import { users as allUsers } from "../../../../_stock_management/constants/User";
import { User } from "../../../../types/User";

const UserController: React.FC = () => {
  // Filter state
  const [role, setRole] = useState("All Roles");
  const [status, setStatus] = useState("All Status");

  // Apply filters
  const filteredUsers = allUsers.filter((user: User) => {
    return (
      (role === "All Roles" || user.role === role) &&
      (status === "All Status" || user.status === status)
    );
  });

  return (
    <div className="card">
      <div className="d-flex justify-content-between items-center mb-6">
        <div>
          <h2 className="card-headers fs-3 fw-semibold">User Management</h2>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary me-2">Export CSV</button>
          <button className="btn btn-success">+ Add User</button>
        </div>
      </div>

      {/* Filter bar with state props */}
      <FilterBar
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
      />

      {/* Table with filtered users */}
      <UserTable users={filteredUsers} />

      {/* Pagination (static for now) */}
      <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <span>
          Showing 1 to {filteredUsers.length} of {allUsers.length} results
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

export default UserController;
