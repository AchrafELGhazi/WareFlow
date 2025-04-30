import React from 'react';
import { motion } from 'framer-motion';
import useTheme from '@/shared/Hooks/useTheme';

const stats = [
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '40%', label: 'Reduced Processing Time' },
  { value: '99.9%', label: 'System Uptime' },
  { value: '24/7', label: 'Customer Support' },
];

const StatsSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className='text-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className='text-4xl md:text-5xl font-bold text-blue-600 mb-2'>
                {stat.value}
              </p>
              <p
                className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
