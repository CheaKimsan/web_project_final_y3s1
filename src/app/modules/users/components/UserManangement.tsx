import React, { useState } from "react";
import { users } from "../../../../_stock_management/constants/user";
import { User } from "../../../../types/User";
import FilterBar from "./FilterBar";
import UserTable from "./UserTable";

const UserManagement: React.FC = () => {
  const [role, setRole] = useState("All Roles");
  const [status, setStatus] = useState("All Status");

  const filteredUsers = users.filter((user: User) => {
    return (
      (role === "All Roles" || user.role === role) &&
      (status === "All Status" || user.status === status)
    );
  });

  return (
    <div>
      <FilterBar role={role} setRole={setRole} status={status} setStatus={setStatus} />
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default UserManagement;
