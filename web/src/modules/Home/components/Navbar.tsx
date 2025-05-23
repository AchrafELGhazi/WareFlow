import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@/shared/components/Button';
import { Menu, X } from 'lucide-react';
import Logo from '@/shared/components/Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      className='fixed top-6 left-1/2 z-50 flex items-center'
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className={`flex items-center justify-between py-2 px-5 rounded-full backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-700/50'
            : 'bg-slate-900/50 border border-slate-700/30'
        }`}
      >
        <Link to='/' className='flex items-center space-x-2'>
          <Logo size='sm' />
          <span className='font-bold text-xl  bg-clip-text text-gray-50'>
            WareFlow
          </span>
        </Link>

        <div className='hidden md:flex items-center space-x-6 ml-6'>
          <Link
            to='/about'
            className='text-white hover:text-cyan-300 transition-colors font-medium'
          >
            About
          </Link>
          <Link
            to='/features'
            className='text-white hover:text-cyan-300 transition-colors font-medium'
          >
            Features
          </Link>
          <Link
            to='/pricing'
            className='text-white hover:text-cyan-300 transition-colors font-medium'
          >
            Pricing
          </Link>
        </div>

        <div className='flex items-center ml-6 space-x-3'>
          <div className='md:hidden'>
            <button
              onClick={toggleMobileMenu}
              className='flex items-center justify-center w-8 h-8 text-white focus:outline-none'
            >
              {mobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
          <div className='hidden md:flex items-center space-x-3'>
            <Link to='/auth/signin'>
              <Button
                variant='secondary'
                size='sm'
                className='text-white bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/50 rounded-full px-4 py-1.5 transition-all duration-300'
              >
                Sign In
              </Button>
            </Link>
            <Link to='/auth/signup'>
              <Button
                variant='primary'
                size='sm'
                className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white rounded-full px-4 py-1.5 transition-all duration-300'
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
