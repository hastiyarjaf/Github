import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

const PageShell: React.FC<PageShellProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto px-6 py-12 md:py-20 ${className}`}>
      {children}
    </div>
  );
};

export default PageShell;