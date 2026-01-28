import React, { useState } from 'react';
import Sidebar from '../layout/components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 992);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const mainContentStyle: React.CSSProperties = {
    padding: '18px',
    flexGrow: 1,
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginLeft: collapsed ? '80px' : '250px',
  };

  return (
    <div className="d-flex min-vh-100">
      <div
        className="customize-bg border-end"
        style={{
          width: collapsed ? '80px' : '250px',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'fixed',
          height: '100vh',
          zIndex: 1000,
        }}
      >
        <Sidebar collapsed={collapsed} />
      </div>
      <div style={mainContentStyle}>
        <Header toggleSidebar={toggleSidebar} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;