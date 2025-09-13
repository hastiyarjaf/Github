import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = "block lg:inline-block px-4 py-2 text-brand-steel-blue hover:text-brand-accent transition-colors duration-300";
  const activeLinkClasses = "text-brand-accent font-semibold";

  return (
    <header className="bg-brand-dark-blue sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white tracking-wider">
          We<span className="text-brand-accent underline decoration-2 underline-offset-2">do</span>net.
        </NavLink>
        <div className="hidden lg:flex items-center space-x-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-brand-dark-blue">
          <nav className="flex flex-col items-center py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `${linkClasses} w-full text-center ${isActive ? activeLinkClasses : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;