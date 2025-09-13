import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  // Fix: Add `disabled` to props to allow it to be passed to the component.
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  // Fix: Add styling for the disabled state for better user experience.
  const baseClasses = 'inline-block px-8 py-3 text-center font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-brand-accent text-white hover:bg-blue-600 focus:ring-brand-accent',
    secondary: 'bg-gray-200 text-brand-gunmetal hover:bg-gray-300 focus:ring-gray-400',
    outline: 'bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white focus:ring-brand-accent',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    // Fix: Pass the `disabled` prop to the underlying button element.
    <button onClick={onClick} className={combinedClasses} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;