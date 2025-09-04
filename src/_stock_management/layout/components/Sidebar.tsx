import React from "react";
import { Nav } from "react-bootstrap";
import { House, FileText, People, Wallet, BarChart, Gear } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import '../../assets/scss/custom.scss';

interface SidebarProps {
  collapsed: boolean;
}

const menuItems = [
  { label: "Home", icon: House, path: "/" },
  { label: "Documents", icon: FileText, path: "/documents" },
  { label: "Users", icon: People, path: "/users" },
  { label: "Wallet", icon: Wallet, path: "/wallet" },
  { label: "Statistics", icon: BarChart, path: "/statistics" },
  { label: "Settings", icon: Gear, path: "/settings", mtAuto: true },
];

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
          className={`d-flex align-items-center customize-sidebar mb-2 ${mtAuto ? "mt-auto" : ""} sidebar-item ${location.pathname === path ? "active" : ""}`}
        >
          <Icon className="me-2" /> {!collapsed && label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;