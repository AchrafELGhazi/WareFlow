import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight,
  Sparkles,
  Activity,
  BarChart3,
  Package,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/shared/components/Button';

// Enhanced statistics with icons
const dashboardStats = [
  {
    label: 'Active Shipments',
    value: '347',
    icon: <Package className='w-5 h-5' />,
  },
  {
    label: 'Inventory Items',
    value: '5,892',
    icon: <BarChart3 className='w-5 h-5' />,
  },
  {
    label: 'Processing Time',
    value: '1.2 days',
    icon: <Activity className='w-5 h-5' />,
  },
  {
    label: 'Satisfaction',
    value: '98%',
    icon: <Sparkles className='w-5 h-5' />,
  },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
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

  return (
    <motion.div
      ref={heroRef}
      className='relative h-screen flex items-center overflow-hidden'
      style={{
        opacity: heroOpacity,
        scale: heroScale,
      }}
    >
      {/* Advanced Gradient Background with 3D effect */}
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

      <div className='container mx-auto px-8 relative z-10 flex flex-col lg:flex-row items-center'>
        {/* Left Content - Headline and CTA */}
        <div className='lg:w-5/12 lg:pr-12'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center lg:text-left'
          >
            {/* Text highlight effect */}
            <div className='mb-1 text-cyan-400 font-semibold tracking-wider flex items-center justify-center lg:justify-start'>
              <motion.div
                className='mr-2 h-px w-5 bg-cyan-400'
                initial={{ width: 0 }}
                animate={{ width: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              NEXT-GEN PLATFORM
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white'>
              Redefining
              <div className='relative inline-block'>
                <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500'>
                  {' '}
                  Warehouse{' '}
                </span>
                <motion.span
                  className='absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-full blur-sm'
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
              Management
            </h1>

            <p className='text-lg md:text-xl mb-8 text-slate-300/90 max-w-md mx-auto lg:mx-0 leading-relaxed'>
              Streamline operations with cutting-edge AI tracking, inventory
              control, and real-time analytics.
            </p>

            <div className='flex flex-wrap gap-5 justify-center lg:justify-start'>
              <Button
                variant='primary'
                size='lg'
                onClick={() => navigate('/login')}
                className='group relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.span
                  className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0'
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className='relative flex items-center'>
                  Get Started
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className='ml-2 w-5 h-5' />
                  </motion.div>
                </span>
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='border border-white/10 text-white hover:border-white/30 backdrop-blur-sm bg-white/5 rounded-full px-6 py-2 transition-all duration-300'
              >
                Explore Features
              </Button>
            </div>

            {/* Testimonial badge */}
            <motion.div
              className='mt-10 inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-full py-2 px-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className='flex -space-x-2'>
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${
                      i === 0
                        ? 'from-cyan-400 to-blue-500'
                        : i === 1
                        ? 'from-indigo-400 to-purple-500'
                        : 'from-fuchsia-400 to-pink-500'
                    } ring-2 ring-slate-900 flex items-center justify-center text-xs font-bold text-white`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className='text-sm text-slate-300'>
                Trusted by 2,000+ logistics leaders
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Content - Ultra-modern dashboard preview */}
        <div className='lg:w-7/12 mt-16 lg:mt-0'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className='relative group'
          >
            {/* Futuristic dashboard with neo-brutalism influences */}
            <div className='backdrop-blur-xl rounded-2xl border border-white/10 bg-slate-900/60 shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden'>
              {/* Top bar with glowing indicators */}
              <div className='flex justify-between items-center px-6 py-4 border-b border-slate-700/50'>
                <h3 className='text-xl font-semibold text-white flex items-center gap-2'>
                  <span className='inline-block w-3 h-3 rounded-full bg-cyan-400 animate-pulse'></span>
                  Warehouse Command Center
                </h3>
                <div className='flex space-x-2'>
                  <motion.div
                    className='w-3 h-3 rounded-full bg-red-400'
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div
                    className='w-3 h-3 rounded-full bg-amber-400'
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div
                    className='w-3 h-3 rounded-full bg-emerald-400'
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
              </div>

              <div className='p-6'>
                {/* Enhanced stats panel */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
                  {dashboardStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className='bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 group/stat'
                    >
                      <div className='flex items-center gap-2 mb-2'>
                        <div className='p-2 rounded-lg bg-slate-700/50 text-cyan-400 group-hover/stat:text-cyan-300 group-hover/stat:bg-slate-700 transition-colors'>
                          {stat.icon}
                        </div>
                        <p className='text-sm text-slate-400'>{stat.label}</p>
                      </div>
                      <p className='text-2xl font-bold text-white'>
                        {stat.value}
                      </p>

                      {/* Animated highlight */}
                      <motion.div
                        className='absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0'
                        animate={{
                          opacity: [0, 0.5, 0],
                          left: ['-100%', '100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          delay: 1 + index * 0.5,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Advanced visualization panel */}
                <div className='flex flex-col md:flex-row gap-4'>
                  <motion.div
                    className='flex-1 bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 backdrop-blur-lg border border-slate-700/50 relative overflow-hidden'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className='flex justify-between items-center mb-4'>
                      <h4 className='text-sm font-medium text-slate-300 flex items-center gap-2'>
                        <span className='inline-block w-1.5 h-1.5 rounded-full bg-cyan-400'></span>
                        Real-Time Inventory
                      </h4>
                      <span className='text-xs text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full'>
                        LIVE
                      </span>
                    </div>

                    {/* Futuristic circular chart */}
                    <div className='flex justify-center'>
                      <div className='relative w-32 h-32'>
                        <motion.div
                          className='absolute inset-0 rounded-full border-2 border-slate-700/50'
                          style={{ borderRadius: '100%' }}
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <div className='absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2'></div>
                        </motion.div>

                        <svg className='w-full h-full' viewBox='0 0 100 100'>
                          <defs>
                            <linearGradient
                              id='circleGradient'
                              x1='0%'
                              y1='0%'
                              x2='100%'
                              y2='100%'
                            >
                              <stop offset='0%' stopColor='#22d3ee' />
                              <stop offset='100%' stopColor='#3b82f6' />
                            </linearGradient>
                          </defs>

                          <circle
                            cx='50'
                            cy='50'
                            r='40'
                            fill='none'
                            stroke='#1e293b'
                            strokeWidth='4'
                          />
                          <motion.circle
                            cx='50'
                            cy='50'
                            r='40'
                            fill='none'
                            stroke='url(#circleGradient)'
                            strokeWidth='4'
                            strokeLinecap='round'
                            strokeDasharray='251.2'
                            initial={{ strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: 62.8 }}
                            transition={{
                              duration: 2,
                              delay: 0.8,
                              ease: 'easeOut',
                            }}
                            transform='rotate(-90 50 50)'
                          />

                          <text
                            x='50'
                            y='45'
                            textAnchor='middle'
                            dominantBaseline='middle'
                            className='fill-white text-2xl font-bold'
                          >
                            75%
                          </text>
                          <text
                            x='50'
                            y='60'
                            textAnchor='middle'
                            dominantBaseline='middle'
                            className='fill-slate-400 text-xs'
                          >
                            CAPACITY
                          </text>
                        </svg>

                        {/* Pulsing glow effect */}
                        <motion.div
                          className='absolute inset-0 rounded-full bg-cyan-500/10'
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 0.2, 0.6],
                          }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className='flex-1 bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 backdrop-blur-lg border border-slate-700/50 relative overflow-hidden'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className='flex justify-between items-center mb-3'>
                      <h4 className='text-sm font-medium text-slate-300 flex items-center gap-2'>
                        <span className='inline-block w-1.5 h-1.5 rounded-full bg-indigo-400'></span>
                        Weekly Performance
                      </h4>
                      <span className='text-xs text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded-full'>
                        +12%
                      </span>
                    </div>

                    {/* Ultra-modern bar chart */}
                    <div className='h-28 flex items-end space-x-2'>
                      {Array.from({ length: 7 }).map((_, i) => {
                        const height = [45, 65, 35, 50, 85, 40, 60][i];
                        return (
                          <div
                            key={i}
                            className='flex-1 flex flex-col items-center'
                          >
                            <motion.div
                              className={`w-full rounded-lg ${
                                i === 4
                                  ? 'bg-gradient-to-t from-blue-500 to-indigo-500'
                                  : 'bg-slate-600'
                              }`}
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{
                                duration: 1,
                                delay: 0.9 + i * 0.08,
                                ease: 'easeOut',
                              }}
                              whileHover={{
                                y: -5,
                                scale: 1.05,
                                backgroundColor:
                                  i !== 4 ? '#60a5fa' : undefined,
                                transition: { duration: 0.2 },
                              }}
                            >
                              {/* Value indicator */}
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 + i * 0.08 }}
                                className={`text-xs ${
                                  i === 4 ? 'text-white' : 'text-slate-300'
                                } text-center -mt-6`}
                              >
                                {height}
                              </motion.div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                    <div className='flex justify-between mt-2'>
                      <span className='text-xs text-slate-500'>Mon</span>
                      <span className='text-xs text-slate-300'>Thu</span>
                      <span className='text-xs text-slate-500'>Sun</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Enhanced glass effect with interactive hover */}
            <motion.div
              className='absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 -z-10'
              style={{
                filter: 'blur(40px)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6,182,212,0.2)',
                  '0 0 30px rgba(99,102,241,0.3)',
                  '0 0 20px rgba(6,182,212,0.2)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        <div className='flex flex-col items-center'>
          <span className='text-slate-400 text-sm mb-2'>Scroll</span>
          <div className='w-6 h-10 rounded-full border-2 border-slate-400/50 flex justify-center items-start p-1'>
            <motion.div
              className='w-1.5 h-1.5 bg-cyan-400 rounded-full'
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
