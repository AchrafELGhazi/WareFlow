import React from 'react';
import HeroSection from './components/HeroSection';
import Footer from '@/shared/Footer';
import { motion } from 'framer-motion';

const Home: React.FC = () => {



  return (
    <div className={`min-h-screen w-full bg-[#030712] z-0 `}>
      <motion.div
        className='absolute inset-0 opacity-40'
        animate={{
          background: [
            'radial-gradient(circle at 25% 30%, #22d3ee20 0%, transparent 50%)',
            'radial-gradient(circle at 75% 70%, #818cf820 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, #a78bfa20 0%, transparent 50%)',
            'radial-gradient(circle at 25% 30%, #22d3ee20 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <HeroSection />

     
      <Footer />
    </div>
  );
};

export default Home;
