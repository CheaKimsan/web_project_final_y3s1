import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import '../../assets/scss/custom.scss';
import { menuItems } from "../../../_stock_management/constants/MenuItem";


interface SidebarProps {
  collapsed: boolean;
}


const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <Nav className="flex-column vh-100 p-3 bg-side-bar">
      <h4 className={`mb-4 ${collapsed ? "d-none" : ""}`}>Stockly</h4>
      {menuItems.map(({ label, icon: Icon, path, mtAuto }) => (
        <Nav.Link
          as={Link}
          to={path}
          key={label}
          className={`d-flex align-items-center customize-sidebar text-muted mb-2 ${mtAuto ? "mt-auto" : ""} sidebar-item ${location.pathname === path ? "active" : ""}`}
        >
          <Icon className="me-2 customize-icon" /> {!collapsed && label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;