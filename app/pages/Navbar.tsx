"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  return (
    <div>
      <Header />
    </div>
  );
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Work', href: '/view-work' },
    { id: 3, name: 'Service', href: '/service' },
    { id: 4, name: 'About', href: '/about' },
    { id: 5, name: 'Blog', href: '/blog' },
    { id: 6, name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300    
      ${scrolled
          ? 'bg-white/90 dark:bg-gray-900/80 shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-700'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md"
            >
              <span className="text-white font-bold text-lg">DS</span>
            </motion.div>
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-purple-400 dark:hover:text-blue-400 ">
              Baskar Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative font-medium 
                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                after:w-0 after:bg-gradient-to-r from-blue-600 to-purple-600 
                after:transition-all after:duration-300
                hover:after:w-full transition-colors duration-200
                ${location === item.href
                    ? 'text-blue-600 after:w-full'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/book-order">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl 
                hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 shadow-md"
              >
                Book Order
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <div
                className={`w-full h-0.5 bg-gray-900 dark:bg-purple-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
              ></div>
              <div
                className={`w-full h-0.5 bg-gray-900 dark:bg-purple-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''
                  }`}
              ></div>
              <div
                className={`w-full h-0.5 bg-gray-900 dark:bg-purple-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 py-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`px-4 py-2 font-medium transition-colors duration-200
                    ${location === item.href
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/book-order"
                  className="mx-4 mt-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 text-center border-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Order
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};