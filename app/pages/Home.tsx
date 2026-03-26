"use client";
import React, { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Use react-icons instead of lucide-react to avoid export errors
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Link from 'next/link';

// Import components normally (remove dynamic imports that cause errors)
import Navbar from './Navbar';
import Service from './Service';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

import Image from '../../public/freelancher.png';
import FAQ from '../components/FAQs';

// Social links configuration
const SOCIAL_LINKS = {
  email: 'mailto:kondapurambaskar@gmail.com',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/baskar_d20521',
  twitter: 'https://twitter.com/baskar_d20521'
};

export default function HeroSection() {
  return (
    <>
      <Navbar />
      <Hero />
      <Service />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

// Memoized Social Icon component
const SocialIcon = memo(({ href, ariaLabel, children }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-110 transition-transform duration-200"
  >
    {children}
  </a>
));

SocialIcon.displayName = 'SocialIcon';

// Error Boundary for Hero component
const withErrorBoundary = (Component) => {
  return class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Hero Component Error:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We&apos;re having trouble loading this section.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};

// Main Hero component with performance optimizations
const HeroComponent = ({
  name = 'D.Baskar',
  titles = ['Web Developer', 'Video Editor', 'Digital Marketer'],
  locationLine = 'Chennai, Tamil Nadu, India',
  ctaText = 'View Work',
  ctaHref = '/view-work',
  imageUrl = Image,
}) => {
  const [index, setIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Optimized interval with useCallback
  const rotateTitle = useCallback(() => {
    setIndex(prev => (prev + 1) % titles.length);
  }, [titles.length]);

  useEffect(() => {
    const interval = setInterval(rotateTitle, 3000);
    return () => clearInterval(interval);
  }, [rotateTitle]);

  // Memoized social icons render – using react-icons
  const renderSocialIcons = useCallback(() => (
    <div className="mt-6 flex items-center justify-center md:justify-start gap-4 dark:text-gray-300 text-gray-600">
      <SocialIcon href={SOCIAL_LINKS.email} ariaLabel="Email">
        <FiMail size={18} />
      </SocialIcon>
      <SocialIcon href={SOCIAL_LINKS.github} ariaLabel="Github">
        <FiGithub size={18} />
      </SocialIcon>
      <SocialIcon href={SOCIAL_LINKS.linkedin} ariaLabel="LinkedIn">
        <FiLinkedin size={18} />
      </SocialIcon>
      <SocialIcon href={SOCIAL_LINKS.twitter} ariaLabel="Twitter">
        <FiTwitter size={18} />
      </SocialIcon>
    </div>
  ), []);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section className="mt-[6rem] min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 sm:px-8 lg:px-12">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              {name}
            </h1>

            {/* Decorative gradient rule */}
            <div
              className="mt-4 h-1 w-28 mx-auto md:mx-0 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400"
              aria-hidden="true"
            />

            {/* Optimized Animated Title */}
            <div className="mt-4 text-lg md:text-2xl font-light text-gray-500 dark:text-gray-300 tracking-wider h-8 md:h-10 relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 right-0 mx-auto"
                >
                  {titles[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="max-w-xl mx-auto md:mx-0 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            {locationLine}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center border border-transparent px-6 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-none text-sm font-semibold uppercase tracking-wide hover:opacity-95 transition-opacity duration-200"
            >
              {ctaText}
            </Link>
            <div className="mt-2 sm:mt-0">
              <Link
                href="/hire-me"
                className="inline-block text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline transition-colors duration-200"
              >
                Hire me →
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          {renderSocialIcons()}
        </motion.div>

        {/* Right: Image Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-2xl transition-shadow duration-300">
            {imageUrl && !imageError ? (
              <img
                src={typeof imageUrl === 'string' ? imageUrl : imageUrl?.src}
                alt={`${name} portrait`}
                className="w-full h-80 object-cover"
                loading="lazy"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">DB</span>
                  </div>
                  <span className="text-gray-400 text-sm">D. Baskar</span>
                </div>
              </div>
            )}

            <div className="p-6">
              <Link href="/projects">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition-colors duration-200">
                  Selected projects
                </h3>
              </Link>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Modern UI, Motion-rich Framer prototypes and responsive websites.
              </p>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <Link
                  href="/case-study"
                  className="text-sm font-medium underline hover:no-underline transition-all duration-200 dark:text-purple-400 text-gray-700"
                >
                  See case studies
                </Link>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">
                  Available for freelance
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Wrap with error boundary and memo
const Hero = withErrorBoundary(memo(HeroComponent));
export { Hero };