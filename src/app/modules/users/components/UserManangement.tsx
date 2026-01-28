// src/app/modules/users/features/UserManagement.tsx
import React, { useState, useEffect } from "react";
import { User } from "../core/model";
import FilterBar from "./FilterBar";
import UserTable from "./UserTable";
import useUsers from "../core/action";
import FormUser from "./FormUser";

const UserManagement: React.FC = () => {
  const { users, loading, error, deleteUser, addOrUpdateUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  // Filter
  const [role, setRole] = useState("All Roles");
  const [status, setStatus] = useState("All Status");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        user =>
          (role === "All Roles" || user.role === role) &&
          (status === "All Status" || user.status === status)
      )
    );
  }, [users, role, status]);

  const handleAdd = () => {
    setMode("add");
    setSelectedUser(undefined);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setMode("edit");
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  const handleFormSubmit = async (user: User) => {
    await addOrUpdateUser(user);
    setShowForm(false);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-3 fw-semibold">User Management</h2>
        <button className="btn btn-success" onClick={handleAdd}>+ Add User</button>
      </div>

      <FilterBar role={role} setRole={setRole} status={status} setStatus={setStatus} />

      <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />

      <FormUser
        show={showForm}
        handleClose={() => setShowForm(false)}
        mode={mode}
        user={selectedUser}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UserManagement;
