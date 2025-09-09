import React from "react";

interface FilterBarProps {
  role: string;
  setRole: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ role, setRole, status, setStatus }) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <select
        className="form-select w-auto"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>All Roles</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>User</option>
      </select>

      <select
        className="form-select w-auto"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Suspended</option>
      </select>

    </div>
  );
};

export default FilterBar;
