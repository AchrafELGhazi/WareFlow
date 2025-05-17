import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Interactive 404 Not Found page with animated elements and particles
 */
const NotFound: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize particle system
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;

        // Random color from gradient palette
        const colors = ['#4f46e5', '#7c3aed', '#c026d3', '#db2777'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }

        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particle array
    const particles: Particle[] = [];
    const particleCount = Math.min(
      100,
      Math.floor((window.innerWidth * window.innerHeight) / 10000)
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with slight transparency for trail effect
      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${1 - distance / 100})`; // Fade based on distance
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden'>
      {/* Interactive background */}
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full' />

      {/* Content container */}
      <div className='relative z-10 max-w-xl w-full mx-4 p-8 backdrop-blur-lg bg-gray-900/50 rounded-2xl border border-gray-800 shadow-2xl'>
        {/* Error code */}
        <div className='flex items-center justify-center mb-8'>
          <h1 className='text-9xl font-black text-white'>
            <span className='inline-block relative animate-bounce delay-100'>
              4
            </span>
            <span className='inline-block relative animate-bounce delay-200'>
              0
            </span>
            <span className='inline-block relative animate-bounce delay-300'>
              4
            </span>
          </h1>
        </div>

        {/* Error message */}
        <h2 className='text-2xl md:text-3xl font-bold text-center text-white mb-4'>
          Page Not Found
        </h2>
        <p className='text-gray-300 text-center mb-8'>
          The page you're looking for doesn't exist or has been moved to another
          URL.
        </p>

        {/* Search form */}
        <div className='mb-8'>
          <div className='flex max-w-md mx-auto rounded-md overflow-hidden shadow-sm'>
            <input
              type='text'
              placeholder='Search for pages...'
              className='flex-grow px-4 py-3 bg-gray-800 text-white focus:outline-none border-0'
            />
            <button className='px-4 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium text-white mb-4 text-center'>
            Popular Pages
          </h3>
          <div className='grid grid-cols-2 gap-3'>
            <Link
              to='/'
              className='text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm text-gray-300 hover:text-white'
            >
              Home
            </Link>
            <Link
              to='/dashboard'
              className='text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm text-gray-300 hover:text-white'
            >
              Dashboard
            </Link>
            <Link
              to='/users'
              className='text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm text-gray-300 hover:text-white'
            >
              Users
            </Link>
            <Link
              to='/warehouses'
              className='text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm text-gray-300 hover:text-white'
            >
              Warehouses
            </Link>
          </div>
        </div>

        {/* Main actions */}
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Link
            to='/'
            className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 transition-all duration-200'
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className='inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800 transition-all duration-200'
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
