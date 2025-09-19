import React, { useState, useEffect } from "react";
import { User } from "../core/model";
import FilterBar from "./FilterBar";
import UserTable from "./UserTable";
import Pagination from "../../../utils/Pagination";
import useUsers from "../core/action";
import "../../../../_stock_management/assets/scss/custom.scss";

const UserManagement: React.FC = () => {
    const { users, loading, error } = useUsers();

    // Filter state
    const [role, setRole] = useState("All Roles");
    const [status, setStatus] = useState("All Status");

    // Filtered users based on role and status
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        setFilteredUsers(
            users.filter(
                (user) =>
                    (role === "All Roles" || user.role === role) &&
                    (status === "All Status" || user.status === status)
            )
        );
    }, [users, role, status]);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="card p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-3 fw-semibold">User Management</h2>
                <div className="d-flex gap-2">
                    <button className="btn btn-secondary">Export CSV</button>
                    <button className="btn btn-success">+ Add User</button>
                </div>
            </div>

            {/* Filter */}
            <FilterBar
                role={role}
                setRole={setRole}
                status={status}
                setStatus={setStatus}
            />

            {/* User table */}
            <UserTable users={filteredUsers} />

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
        <span>
          Showing 1 to {filteredUsers.length} of {users.length} results
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

export default UserManagement;
