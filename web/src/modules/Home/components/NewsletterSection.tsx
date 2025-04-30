import React from 'react';
import { motion } from 'framer-motion';
import useTheme from '@/shared/Hooks/useTheme';
import Button from '@/shared/components/Button';
const NewsletterSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className='container mx-auto px-6'>
        <div
          className={`max-w-3xl mx-auto rounded-xl p-8 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold mb-3'>Stay Updated</h3>
            <p
              className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Subscribe to our newsletter for the latest product updates,
              industry insights, and warehouse management tips.
            </p>
            <div className='flex flex-col sm:flex-row gap-3'>
              <input
                type='email'
                placeholder='Enter your email'
                className={`flex-1 px-4 py-3 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-800 border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <Button
                variant='primary'
                size='base'
                className='whitespace-nowrap'
              >
                Subscribe Now
              </Button>
            </div>
            <p
              className={`mt-4 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
