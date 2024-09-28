import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: 'primary' | 'default' | 'plain-text';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ btnType = 'default', className, children, ...props }) => {
  const classNames =`button ${btnType}${className ? ` ${className}` : ''}`;
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
