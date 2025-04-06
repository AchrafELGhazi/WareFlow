import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Search, CheckCircle, Clock } from 'lucide-react';
import useTheme from '@/shared/Hooks/useTheme';
import Button from '@/shared/components/Button';

const DemoSection: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`py-20 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } overflow-hidden`}
    >
      <div className='container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          <motion.div
            className='lg:w-1/2'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              See How It Works
            </h2>
            <p
              className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Our intuitive platform makes complex warehouse operations simple.
              From receiving to shipping, every process is streamlined for
              maximum efficiency.
            </p>

            <div className='space-y-6'>
              {[
                {
                  icon: <Package className='w-6 h-6' />,
                  title: 'Inventory Management',
                  description:
                    'Track every item with precision and eliminate stock discrepancies.',
                },
                {
                  icon: <Truck className='w-6 h-6' />,
                  title: 'Shipment Tracking',
                  description:
                    'Follow your products from warehouse to destination in real-time.',
                },
                {
                  icon: <Search className='w-6 h-6' />,
                  title: 'Smart Search',
                  description:
                    'Find any product instantly with our advanced search capabilities.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className='flex gap-4'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='mt-1 text-blue-600 bg-blue-100 rounded-full p-2 flex-shrink-0'>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                    <p
                      className={`${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className='mt-10'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                variant='primary'
                size='lg'
                onClick={() => navigate('/demo')}
              >
                Request a Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className='lg:w-1/2 relative'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Interactive product tracking visualization */}
            <div
              className={`relative rounded-xl overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } p-6 border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className='mb-6'>
                <h3 className='text-xl font-bold mb-4'>
                  Product Journey Tracker
                </h3>
                <div
                  className={`h-2 w-full rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  <motion.div
                    className='h-full rounded-full bg-blue-600'
                    initial={{ width: '0%' }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className='flex justify-between mt-2 text-sm'>
                  <span>Origin</span>
                  <span>In Transit</span>
                  <span>Warehouse</span>
                  <span>Delivered</span>
                </div>
              </div>

              <div className='space-y-4'>
                {[
                  {
                    status: 'Completed',
                    label: 'Order Processing',
                    time: 'Jan 15, 10:30 AM',
                    icon: <CheckCircle className='w-5 h-5 text-green-500' />,
                  },
                  {
                    status: 'Completed',
                    label: 'Packaging',
                    time: 'Jan 15, 2:45 PM',
                    icon: <CheckCircle className='w-5 h-5 text-green-500' />,
                  },
                  {
                    status: 'Completed',
                    label: 'Shipping',
                    time: 'Jan 16, 9:15 AM',
                    icon: <CheckCircle className='w-5 h-5 text-green-500' />,
                  },
                  {
                    status: 'Active',
                    label: 'In Transit',
                    time: 'Jan 17, Current',
                    icon: <Truck className='w-5 h-5 text-blue-500' />,
                  },
                  {
                    status: 'Pending',
                    label: 'Warehouse Arrival',
                    time: 'Est. Jan 18',
                    icon: <Clock className='w-5 h-5 text-gray-400' />,
                  },
                  {
                    status: 'Pending',
                    label: 'Delivery',
                    time: 'Est. Jan 20',
                    icon: <Clock className='w-5 h-5 text-gray-400' />,
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    className={`flex items-center p-3 rounded-lg ${
                      step.status === 'Active'
                        ? isDarkMode
                          ? 'bg-blue-900/30 border border-blue-700'
                          : 'bg-blue-50 border border-blue-100'
                        : isDarkMode
                        ? 'bg-gray-700/50'
                        : 'bg-gray-50'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className='mr-4'>{step.icon}</div>
                    <div className='flex-1'>
                      <p className='font-medium'>{step.label}</p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {step.time}
                      </p>
                    </div>
                    {step.status === 'Active' && (
                      <motion.div
                        className='w-2 h-2 rounded-full bg-blue-500'
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Map visualization placeholder */}
              <motion.div
                className={`mt-6 h-48 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                } overflow-hidden relative`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                viewport={{ once: true }}
              >
                <div className='absolute inset-0 opacity-40 bg-map-pattern'></div>

                {/* Route line */}
                <svg
                  className='absolute inset-0 w-full h-full'
                  viewBox='0 0 400 200'
                >
                  <motion.path
                    d='M 50,100 C 100,50 200,150 350,100'
                    stroke='rgb(59, 130, 246)'
                    strokeWidth='4'
                    fill='transparent'
                    strokeDasharray='340'
                    initial={{ strokeDashoffset: 340 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    viewport={{ once: true }}
                  />
                </svg>

                {/* Origin point */}
                <motion.div
                  className='absolute left-[12%] top-[50%] w-4 h-4 bg-green-500 rounded-full transform -translate-y-1/2'
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.7 }}
                  viewport={{ once: true }}
                />

                {/* Destination point */}
                <motion.div
                  className='absolute right-[12%] top-[50%] w-4 h-4 bg-red-500 rounded-full transform -translate-y-1/2'
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 2 }}
                  viewport={{ once: true }}
                />

                {/* Current location */}
                <motion.div
                  className='absolute left-[60%] top-[50%] w-6 h-6 bg-blue-500 rounded-full transform -translate-y-1/2 flex items-center justify-center'
                  initial={{ scale: 0, x: -100 }}
                  whileInView={{ scale: 1, x: 0 }}
                  transition={{ duration: 2, delay: 1.5 }}
                  viewport={{ once: true }}
                >
                  <Truck className='w-3 h-3 text-white' />
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className='absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl'></div>
            <div className='absolute -z-10 -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-3xl'></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
