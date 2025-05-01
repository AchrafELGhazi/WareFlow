import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Package,
  BarChart2,
  Bell,
  Shield,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import useTheme from '@/shared/Hooks/useTheme';

const features = [
  {
    icon: <Package className='w-12 h-12' />,
    title: 'Real-Time Tracking',
    description:
      'Track products at every stage from shipping to delivery with real-time updates and notifications.',
    color: 'from-cyan-500 to-blue-500',
    lightColor: 'bg-cyan-50',
    darkColor: 'bg-slate-800/80',
    hoverGlow: 'hover:shadow-cyan-500/20',
  },
  {
    icon: <BarChart2 className='w-12 h-12' />,
    title: 'Advanced Analytics',
    description:
      'Gain insights into warehouse operations with comprehensive dashboards and custom reports.',
    color: 'from-indigo-500 to-purple-500',
    lightColor: 'bg-indigo-50',
    darkColor: 'bg-slate-800/80',
    hoverGlow: 'hover:shadow-indigo-500/20',
  },
  {
    icon: <Bell className='w-12 h-12' />,
    title: 'Smart Notifications',
    description:
      'Receive timely alerts about low stock, delayed shipments, and delivery confirmations.',
    color: 'from-fuchsia-500 to-pink-500',
    lightColor: 'bg-fuchsia-50',
    darkColor: 'bg-slate-800/80',
    hoverGlow: 'hover:shadow-fuchsia-500/20',
  },
  {
    icon: <Shield className='w-12 h-12' />,
    title: 'Secure Access',
    description:
      'Role-based access control ensures data security and appropriate permissions for all users.',
    color: 'from-emerald-500 to-teal-500',
    lightColor: 'bg-emerald-50',
    darkColor: 'bg-slate-800/80',
    hoverGlow: 'hover:shadow-emerald-500/20',
  },
];

const FeaturesSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  // Background for the entire section
  // const sectionBackground = isDarkMode ? 'bg-[#030712]' : 'bg-slate-50';

  // Text colorsconst [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Advanced particle effect
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    // Generate dynamic particles with varied colors
    const dynamicParticles = Array.from({ length: 25 }, (_, i) => {
      const colors = ['#22d3ee', '#818cf8', '#a78bfa', '#60a5fa', '#34d399'];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setParticles(dynamicParticles);
  }, []);

  // Mouse position for interactive effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900';

  const subheadingColor = isDarkMode ? 'text-slate-300' : 'text-slate-600';

  return (
    <section className={`py-24 relative overflow-hidden `}>
      <div className='absolute inset-0 bg-[#030712] z-0'>
        {/* Animated background gradient */}
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

        {/* Interactive spotlight effect that follows cursor */}
        <div
          className='absolute inset-0 opacity-30'
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #60a5fa30 0%, transparent 25%)`,
            transition: 'background 0.2s ease',
          }}
        />

        {/* Ultra-modern grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMFYweiIvPjxwYXRoIGQ9Ik02MCAwdjYwSDBWMGg2MHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] bg-[length:60px_60px]" />

        {/* Advanced animated particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className='absolute rounded-full'
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [
                particle.opacity,
                particle.opacity * 2,
                particle.opacity,
              ],
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Futuristic accent elements */}
        <motion.div
          className='absolute top-1/4 left-1/3 w-96 h-96 rounded-full'
          style={{
            background: 'linear-gradient(135deg, #22d3ee10, #818cf810)',
            filter: 'blur(100px)',
            y: parallaxY,
          }}
        />
        <motion.div
          className='absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full'
          style={{
            background: 'linear-gradient(225deg, #a78bfa10, #60a5fa10)',
            filter: 'blur(80px)',
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
        />
      </div>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className='relative'
          >
            {/* Feature label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className='mb-3 flex items-center justify-center'
            >
              <div className='flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20'>
                <Sparkles className='w-4 h-4 mr-2 text-cyan-500' />
                <span className='text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500'>
                  POWERFUL CAPABILITIES
                </span>
              </div>
            </motion.div>

            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${headingColor}`}
            >
              <span className='relative'>
                Modern Solutions for
                <span className='relative ml-2 inline-block'>
                  <span className='relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500'>
                    Complex Logistics
                  </span>
                  <motion.span
                    className='absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-full blur-sm'
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </span>
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto text-xl ${subheadingColor}`}>
              Our warehouse management system combines cutting-edge technology
              with intuitive design to revolutionize your operations.
            </p>
          </motion.div>
        </div>

        {/* Features grid with hover interactions */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`${
                isDarkMode ? feature.darkColor : feature.lightColor
              } p-8 rounded-2xl backdrop-blur-sm ${
                isDarkMode
                  ? 'border border-slate-700/50'
                  : 'border border-slate-200'
              } transition-all duration-300 group relative overflow-hidden ${
                feature.hoverGlow
              } hover:shadow-xl transform hover:-translate-y-1`}
            >
              {/* Background highlight on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Icon with gradient background */}
              <div className='mb-6 relative'>
                <div
                  className={`p-3 rounded-2xl inline-block bg-gradient-to-br ${feature.color} text-white`}
                >
                  {feature.icon}
                </div>

                {/* Animated glow effect */}
                <motion.div
                  className='absolute inset-0 rounded-2xl'
                  animate={
                    hoveredIndex === index
                      ? {
                          boxShadow: [
                            '0 0 0px rgba(0,0,0,0)',
                            '0 0 20px rgba(0,0,0,0.2)',
                            '0 0 0px rgba(0,0,0,0)',
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: hoveredIndex === index ? Infinity : 0,
                  }}
                />
              </div>

              {/* Feature title and description */}
              <h3
                className={`text-2xl font-bold mb-4 ${headingColor} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${feature.color} transition-all duration-300`}
              >
                {feature.title}
              </h3>
              <p className={`${subheadingColor} text-lg`}>
                {feature.description}
              </p>

              {/* Learn more button with slide animation */}
              <div className='mt-6 overflow-hidden'>
                <motion.div
                  className={`flex items-center font-medium cursor-pointer transition-transform`}
                  style={{
                    color: isDarkMode ? '#fff' : '#1e293b',
                    background: `linear-gradient(to right, ${
                      hoveredIndex === index ? 'currentColor' : 'currentColor'
                    } 0%, currentColor 50%, transparent 50%, transparent 100%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:
                      hoveredIndex === index ? 'transparent' : 'currentColor',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <motion.div
                    animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                    transition={{
                      duration: 1,
                      repeat: hoveredIndex === index ? Infinity : 0,
                    }}
                  >
                    <ChevronRight className='ml-1 w-5 h-5' />
                  </motion.div>
                </motion.div>
              </div>

              {/* Animated border on hover */}
              {hoveredIndex === index && (
                <motion.div
                  className={`absolute inset-0 rounded-2xl border border-transparent`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    background: `linear-gradient(90deg, transparent 0%, ${
                      isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                    } 50%, transparent 100%)`,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <a
            href='#'
            className={`inline-flex items-center px-6 py-3 rounded-full ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/15 text-white backdrop-blur-sm'
                : 'bg-slate-900/90 hover:bg-slate-900 text-white'
            } font-medium transition-all duration-300 group`}
          >
            Explore all features
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className='ml-2 w-5 h-5' />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
