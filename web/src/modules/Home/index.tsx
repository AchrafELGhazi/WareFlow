import React, { useRef } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import CTASection from './components/CTASection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from '@/shared/Footer';
import PartnersSection from './components/PartnersSection';
import { motion } from 'framer-motion';

const Home: React.FC = () => {

  const demoRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);


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
      {/* Hero Section with animated dashboard preview */}
      <HeroSection />

      {/* Features Section with feature cards */}
      <FeaturesSection />

      {/* Interactive Demo Section */}
      <div ref={demoRef}>
        <DemoSection />
      </div>

      {/* Testimonials Section with client quotes */}
      <div ref={testimonialsRef}>
        <TestimonialsSection />
      </div>

      {/* Call to Action Section */}
      <CTASection />

      {/* Statistics Section */}
      <StatsSection />

      {/* FAQ Section with accordion */}
      <div ref={faqRef}>
        <CTASection />
      </div>

      {/* Partners/Clients Logo Section */}
      <PartnersSection />

      {/* Newsletter Subscription Section */}
      <NewsletterSection />

      {/* Footer with navigation and company info */}
      <Footer />
    </div>
  );
};

export default Home;
