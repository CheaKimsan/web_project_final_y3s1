// components/UserTable.tsx
import React from "react";
import { User } from "../core/model";
import UserRow from "./UserRow";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-hover">
        <thead className="table-light">
          <tr className="fw-semibold">
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Active</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
