import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import '../../assets/scss/custom.scss';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <Navbar className="px-3 mb-4 bg-white shadow-sm rounded">
      <Button onClick={toggleSidebar} className="bg-btn-toggle">
        {/* Hamburger SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </Button>

      <Nav className="mx-2">
        <Nav.Link className="fw-semibold text-primary header-link" href="/">Overview</Nav.Link>
        <Nav.Link className="fw-semibold text-primary header-link" href="/">Payment</Nav.Link>
        <Nav.Link className="fw-semibold text-primary header-link" href="/">Account</Nav.Link>
      </Nav>
      
      <div className="ms-auto d-flex align-items-center">
        <span className="me-3">Sun, 18 Nov</span>
        <div
          className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
          style={{ width: "35px", height: "35px" }}
        >
          U
        </div>
      </div>
    </Navbar>
  );
};

export default Header;