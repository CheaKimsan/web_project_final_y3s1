import React from "react";
import { Navbar, Button, Nav, Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../../assets/scss/custom.scss";
import { menuItems } from "../../../_stock_management/constants/MenuItem";
import { useAuth } from "../../../app/modules/auth/AuthContext";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const activeItem = menuItems.find((item) => item.path === location.pathname);

  const { user, logout } = useAuth(); // ✅ use Firebase for Auth

  const handleLogin = () => {
    console.log("Redirect to login page or open modal");
  };

  return (
    <Navbar className="px-3 mb-4 bg-white shadow-sm rounded">
      <Button onClick={toggleSidebar} className="bg-btn-toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </Button>

      <Nav className="mx-1">
        <Nav.Link className="fw-semibold fs-5 text-primary" disabled>
          {activeItem ? activeItem.label : "Overview"}
        </Nav.Link>
      </Nav>

      <div className="ms-auto d-flex align-items-center">
        {user ? (
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-user" className="border-0 d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{ width: "35px", height: "35px", fontWeight: 600 }}
              >
                {user?.email ? user.email.split("@")[0].charAt(0).toUpperCase() : "U"}
              </div>
              <span className="fw-semibold text-dark">
                {user?.email ? user.email.split("@")[0] : "User"}
              </span>

            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-sm border-0 mt-2 rounded-3">
              <div className="px-3 py-2 border-bottom">
                <div className="fw-semibold">{user.displayName || user.email}</div>
                <small className="text-muted">Admin</small> {/* demo role */}
              </div>
              <Dropdown.Item className="text-danger fw-semibold" onClick={logout}>
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button variant="warning" size="sm" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
