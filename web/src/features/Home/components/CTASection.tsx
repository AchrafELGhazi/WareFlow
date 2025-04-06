import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/shared/components/Button';
import useTheme from '@/shared/Hooks/useTheme';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-r from-blue-600 to-indigo-700'
      }`}
    >
      {/* Abstract background shapes */}
      <div className='absolute inset-0 overflow-hidden opacity-20'>
        <div className='absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl'></div>
        <div className='absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-indigo-400 blur-3xl'></div>
        <div className='absolute bottom-0 left-1/2 w-96 h-96 rounded-full bg-purple-400 blur-3xl'></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <motion.div
          className='max-w-3xl mx-auto text-center text-white'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl md:text-5xl font-bold mb-6'>
            Ready to Transform Your Warehouse Operations?
          </h2>
          <p className='text-xl md:text-2xl mb-10 text-white/80'>
            Join hundreds of businesses that have increased efficiency, reduced
            costs, and improved customer satisfaction.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button
              variant='light'
              size='xl'
              onClick={() => navigate('/register')}
              className='font-bold'
            >
              Start Free Trial
            </Button>
            <Button
              variant='outline-light'
              size='xl'
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </Button>
          </div>
          <p className='mt-6 text-white/70'>
            No credit card required. 14-day free trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
