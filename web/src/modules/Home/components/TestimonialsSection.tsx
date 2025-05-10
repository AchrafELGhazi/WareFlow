import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useTheme from '@/shared/Hooks/useTheme';


const testimonials = [
  {
    quote:
      "This WMS transformed our logistics operations. We've reduced processing time by 40% and virtually eliminated shipping errors.",
    author: 'Sarah Johnson',
    position: 'Operations Director, GlobalTech',
    // image: '/src/assets/images/testimonials/profile1.jpg',
  },
  {
    quote:
      'The real-time tracking feature has been a game-changer for our clients. They love the transparency and we love the efficiency.',
    author: 'Michael Chen',
    position: 'Logistics Manager, FastShip Inc.',
    // image: '/src/assets/images/testimonials/profile2.jpg',
  },
  {
    quote:
      'Implementing this system has improved our inventory accuracy from 92% to 99.8%. The ROI was evident within the first quarter.',
    author: 'Aisha Patel',
    position: 'Supply Chain Lead, Retail Solutions',
    // image: '/src/assets/images/testimonials/profile3.jpg',
  },
];

const TestimonialsSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    // Auto rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Trusted by Industry Leaders
          </h2>
          <p
            className={`max-w-2xl mx-auto text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            See what our clients have to say about their experience with our
            warehouse management system.
          </p>
        </motion.div>

        <div className='relative'>
          <div className='overflow-hidden'>
            <motion.div
              className='flex transition-all duration-500 ease-in-out'
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className='min-w-full px-4'>
                  <div
                    className={`max-w-3xl mx-auto ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white'
                    } rounded-xl shadow-lg p-8 relative`}
                  >
                    <div className='absolute -top-5 left-10 text-blue-500 text-7xl opacity-20'>
                      "
                    </div>
                    <p
                      className={`text-xl mb-6 relative z-10 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {testimonial.quote}
                    </p>
                    <div className='flex items-center'>
                      <div className='w-14 h-14 rounded-full bg-gray-300 mr-4'>
                        {/* <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className='w-full h-full rounded-full object-cover'
                          onError={e => {
                            (e.target as HTMLImageElement).src =
                              'https://via.placeholder.com/56';
                          }}
                        /> */}
                      </div>
                      <div>
                        <p className='font-medium text-lg'>
                          {testimonial.author}
                        </p>
                        <p
                          className={`${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className='flex justify-center mt-8'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  activeTestimonial === index
                    ? 'bg-blue-600'
                    : isDarkMode
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
