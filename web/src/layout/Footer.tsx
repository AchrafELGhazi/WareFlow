import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '/features' },
        { name: 'Pricing', url: '/pricing' },
        { name: 'Demo', url: '/demo' },
        { name: 'Integrations', url: '/integrations' },
        { name: 'Roadmap', url: '/roadmap' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', url: '/docs' },
        { name: 'Blog', url: '/blog' },
        { name: 'Knowledge Base', url: '/knowledge-base' },
        { name: 'Case Studies', url: '/case-studies' },
        { name: 'Video Tutorials', url: '/tutorials' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '/about' },
        { name: 'Careers', url: '/careers' },
        { name: 'Contact Us', url: '/contact' },
        { name: 'Press', url: '/press' },
        { name: 'Partners', url: '/partners' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', url: '/privacy' },
        { name: 'Terms of Service', url: '/terms' },
        { name: 'Security', url: '/security' },
        { name: 'Compliance', url: '/compliance' },
        { name: 'GDPR', url: '/gdpr' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, url: '#', name: 'Facebook' },
    { icon: <Twitter size={20} />, url: '#', name: 'Twitter' },
    { icon: <Instagram size={20} />, url: '#', name: 'Instagram' },
    { icon: <Linkedin size={20} />, url: '#', name: 'LinkedIn' },
    { icon: <Github size={20} />, url: '#', name: 'GitHub' },
  ];

  return (
    <footer className='bg-gray-100 text-gray-800'>
      <div className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-6 gap-8'>
          <div className='md:col-span-2'>
            <div className='flex items-center mb-6'>
              <div className='w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mr-3'>
                W
              </div>
              <span className='text-2xl font-bold'>WareFlow</span>
            </div>
            <p className='mb-6 text-gray-600'>
              Next-generation warehouse management system designed to optimize
              logistics operations, enhance inventory control, and improve
              customer satisfaction.
            </p>

            <div className='space-y-3'>
              <div className='flex items-start'>
                <MapPin className='w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-500' />
                <p className='text-gray-600'>
                  123 Logistics Way, Suite 500
                  <br />
                  San Francisco, CA 94107
                </p>
              </div>
              <div className='flex items-center'>
                <Phone className='w-5 h-5 mr-3 flex-shrink-0 text-gray-500' />
                <p className='text-gray-600'>+1 (800) 123-4567</p>
              </div>
              <div className='flex items-center'>
                <Mail className='w-5 h-5 mr-3 flex-shrink-0 text-gray-500' />
                <p className='text-gray-600'>info@wareflow.com</p>
              </div>
            </div>
          </div>

          {footerLinks.map(column => (
            <div key={column.title}>
              <h3 className='font-semibold text-lg mb-4'>{column.title}</h3>
              <ul className='space-y-3'>
                {column.links.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      className='inline-flex items-center hover:underline text-gray-600 hover:text-gray-900'
                    >
                      <ChevronRight className='w-3 h-3 mr-1' />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className='my-8 border-gray-200' />

        <div className='flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-600 text-sm'>
            &copy; {currentYear} WareFlow Inc. All rights reserved.
          </p>

          <div className='flex space-x-4 mt-4 md:mt-0'>
            {socialLinks.map(social => (
              <a
                key={social.name}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                className='w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
