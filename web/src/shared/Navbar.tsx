import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  path: string;
}

interface NavbarProps {
  links?: NavLink[];
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const defaultLinks: NavLink[] = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
  ];

  const navLinks = defaultLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2 bg-white/90 backdrop-blur-md shadow-lg'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link to='/' className='flex items-center group'>
            <div className='w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl transition-transform duration-300 group-hover:scale-110'>
              W
            </div>
            <span className='ml-3 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600'>
              WareFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center'>
            {/* Main navigation links */}
            <div className='flex space-x-8 mr-10'>
              {navLinks.map((link, index) => (
                <Link
                  key={`${link.label}-${index}`}
                  to={link.path}
                  className='font-medium text-gray-700 hover:text-indigo-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full'
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className='flex items-center space-x-4'>
              <Link
                to='/login'
                className='font-medium text-gray-700 hover:text-indigo-600 transition-colors'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5'
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 rounded-full text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-300'
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='container mx-auto px-6 py-4'>
          <div className='flex flex-col space-y-3'>
            {navLinks.map((link, index) => (
              <Link
                key={`mobile-${link.label}-${index}`}
                to={link.path}
                className='py-2.5 font-medium text-gray-800 hover:text-indigo-600 transition-colors'
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className='pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-4'>
              <Link
                to='/login'
                className='py-2.5 font-medium text-gray-800 hover:text-indigo-600 transition-colors'
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to='/register'
                className='py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all text-center'
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
