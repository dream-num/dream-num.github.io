import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './ToolLayout.css';
import Button from '../button/Button';

const ToolLayout: React.FC = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <div className="tool-layout">
      <Button btnType="default" onClick={goBackHome}>
        Back
      </Button>
      <div className="tool-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ToolLayout;
