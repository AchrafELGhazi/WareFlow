import React from 'react';
import { motion } from 'framer-motion';
import useTheme from '@/shared/Hooks/useTheme';

const PartnersSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className='container mx-auto px-6'>
        <p
          className={`text-center text-lg mb-10 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Trusted by leading companies worldwide
        </p>

        <div className='flex flex-wrap justify-center items-center gap-x-16 gap-y-8'>
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className={`h-12 w-32 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              } rounded opacity-70 flex items-center justify-center`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ opacity: 1 }}
            >
              <div
                className={`font-bold ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                LOGO {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
