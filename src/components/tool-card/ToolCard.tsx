// src/ToolCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ToolCard.css';
import { Tool } from '../../types/Tool';

interface ToolCardProps {
  tool: Tool;
}


const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
    const navigate = useNavigate();

  const navigateToTool = () => {
    navigate(tool.path);
  };

  return (
    <div className="tool-card" onClick={navigateToTool}>
      {tool.emoji}
      <h2>{tool.name}</h2>
      <p>{tool.description}</p>
    </div>
  );
};

export default ToolCard;
