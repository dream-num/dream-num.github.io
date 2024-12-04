import React from 'react';
import './ToolList.css';
import { tools } from '../../common/data/tools';
import ToolCard from '../tool-card/ToolCard';

const ToolList: React.FC = () => {
  return (
    <div className="tool-list-container">
      <h1 className="tool-list-title">Univer GUI Tools</h1>
      <div className="tool-list">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolList;
