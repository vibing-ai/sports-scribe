'use client';

import * as React from 'react';

// React 19 types are included with the React import
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from '@heroui/react';

// TypeScript types for our components

// Simple icon components with explicit return types
const createIcon = (content: string) => {
  return (props: React.HTMLAttributes<HTMLDivElement> & { className?: string }) => 
    React.createElement('div', { ...props, className: props.className }, content);
};

const FiZap = createIcon('⚡');
const FiClock = createIcon('🕒');
const FiTrendingUp = createIcon('📈');
const FiAward = createIcon('🏆');
const FiArrowRight = createIcon('→');
const FiChevronRight = createIcon('›');
const FiTwitter = createIcon('𝕏');
const FiGithub = createIcon('🐙');
const FiLinkedin = createIcon('🔗');
const FiInstagram = createIcon('📷');

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const _ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(_ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={_ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </motion.div>
  );
};

export default function HomePage() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [controls, isInView]);

  const features = [
    {
      icon: <FiZap className="w-6 h-6 text-blue-500" />,
      title: 'Lightning Fast',
      description: 'Get real-time updates and articles as the action happens.',
    },
    {
      icon: <FiClock className="w-6 h-6 text-blue-500" />,
      title: '24/7 Coverage',
      description: 'Never miss a moment with round-the-clock sports coverage.',
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-blue-500" />,
      title: 'AI-Powered',
      description: 'Advanced AI delivers in-depth analysis and insights.',
    },
    {
      icon: <FiAward className="w-6 h-6 text-blue-500" />,
      title: 'Expert Quality',
      description: 'Professional-grade sports journalism at your fingertips.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                SportScribe
              </motion.span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/articles" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50">
                Articles
              </Link>
              <Link href="/sports" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50">
                Sports
              </Link>
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                as={Link}
                href="/articles"
                size="sm"
                className="hidden md:flex items-center gap-2"
              >
                Get Started
                <FiArrowRight className="w-4 h-4" />
              </Button>
              <button className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 dark:from-blue-500/5 dark:to-purple-600/5">
            <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800/50 [mask-image:linear-gradient(0deg,transparent,white,darkgray)]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800/50"
                >
                  🚀 The future of sports journalism is here
                  <FiChevronRight className="ml-1 w-4 h-4" />
                </motion.div>

                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI-Powered
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Sports Journalism
                  </span>
                </motion.h1>

                <motion.p 
                  className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Experience the future of sports reporting with real-time, AI-generated articles that capture every thrilling moment as it happens.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button 
                    as={Link}
                    href="/articles" 
                    color="primary"
                    className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0"
                    size="lg"
                  >
                    Explore Articles
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    as={Link}
                    href="/sports" 
                    variant="bordered"
                    color="default"
                    className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium transition-all hover:shadow-lg hover:shadow-gray-500/10 hover:-translate-y-0.5 active:translate-y-0"
                    size="lg"
                  >
                    Browse Sports
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="mt-12 flex flex-wrap justify-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800"></div>
                      ))}
                    </div>
                    <span className="ml-3">Trusted by 10,000+ sports fans</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>24/7 Real-time updates</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900 relative">
          <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800/50 [mask-image:linear-gradient(0deg,transparent,white,darkgray)]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4 border border-blue-100 dark:border-blue-800/50"
              >
                ✨ Why Choose Us
              </motion.div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                The complete sports journalism
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> experience</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Cutting-edge technology meets sports journalism excellence with our AI-powered platform.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
            
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                as={Link}
                href="/features"
                variant="bordered"
                color="default"
                className="group inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Explore all features
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to experience the future of
                <span className="block bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">sports journalism?</span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join thousands of sports fans and professionals who trust our AI-powered platform for real-time sports coverage.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button 
                  as={Link}
                  href="/signup" 
                  color="primary"
                  className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  size="lg"
                >
                  Get Started Now
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  as={Link}
                  href="/about" 
                  variant="bordered"
                  color="default"
                  className="px-8 py-4 text-lg font-semibold text-white border-white/20 hover:bg-white/5 hover:border-white/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  size="lg"
                >
                  Learn More
                </Button>
              </motion.div>
              
              <motion.div 
                className="mt-10 flex flex-wrap justify-center gap-6 text-blue-100/80 text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Cancel anytime
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  14-day free trial
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  SportScribe
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                AI-powered sports journalism platform that generates real-time sports articles using intelligent multi-agent systems.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: 'Twitter', icon: <FiTwitter className="w-5 h-5" />, href: '#' },
                  { name: 'GitHub', icon: <FiGithub className="w-5 h-5" />, href: '#' },
                  { name: 'LinkedIn', icon: <FiLinkedin className="w-5 h-5" />, href: '#' },
                  { name: 'Instagram', icon: <FiInstagram className="w-5 h-5" />, href: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                    aria-label={social.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {[
              {
                title: 'Product',
                links: [
                  { name: 'Features', href: '#' },
                  { name: 'Pricing', href: '#' },
                  { name: 'API', href: '#' },
                  { name: 'Integrations', href: '#' },
                ]
              },
              {
                title: 'Company',
                links: [
                  { name: 'About Us', href: '#' },
                  { name: 'Blog', href: '#' },
                  { name: 'Careers', href: '#' },
                  { name: 'Contact', href: '#' },
                ]
              },
              {
                title: 'Legal',
                links: [
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'Terms of Service', href: '#' },
                  { name: 'Cookie Policy', href: '#' },
                ]
              }
            ].map((section, sectionIndex) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (sectionIndex + 1) }}
              >
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * linkIndex }}
                    >
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-white transition-colors flex items-center group"
                      >
                        <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} SportScribe. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Made with ❤️ for sports fans around the world
          </motion.div>
        </div>
      </footer>
    </div>
  );
}