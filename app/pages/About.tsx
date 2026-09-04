"use client";
import React from 'react';
import { motion } from 'framer-motion';

import Image from '../../public/freelancher.png';

import Link from 'next/link';
import Navbar from './Navbar';

export default function About() {
  const socials = [
    {
      border: 'blue-500',
      color: 'blue-50',
      icon: (
        <>
          <>
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  <path d="M9.5 8.5c-.5 0-1 .5-1.5 1s-.5 1.5 0 2.5 1 2.5 2 3.5 2 2 3.5 2 2-.5 2.5-1.5 1-1.5.5-2.5" />
</>
          
        </>
      ),
    },
    {
      border: 'purple-500',
      color: 'purple-50',
      icon: (
        <>
          <>
  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
</>
        </>
      ),
    },
  ];

  return (
    <>
      <div className='mb-30'>
        <Navbar />

      </div>
      <section className=" overflow-x-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-4 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  About Me
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight">
                Creative{' '}
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Freelancer
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
                Hi, I&apos;m{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Baskar D
                </span>{' '}
               Hi, I'm Baskar D — a Freelance Full Stack Web Developer and Consultant specializing in frontend, backend, e-commerce, performance optimization, API integration, and website maintenance.

              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 mb-14">
              {[
              {
value: '2026',
label: 'Started Journey',
},
{
value: '10+',
label: 'Skills Learned',
},
{
value: '5+',
label: 'Projects Built',
},

              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left group">
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="group">
                <div className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-3">
                  Let&apos;s Talk
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                  +91 8903352306
                </div>
              </div>
              <div className="group">
                <div className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-3">
                  Email Me
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                  baskard20521@gmail.com
                </div>
              </div>
            </div>

            {/* Social Links & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex items-center gap-4">
                {socials.map((soc, idx) => (
                  <button
                    key={idx}
                    className={`p-4 bg-white dark:bg-gray-800 border border-gray-200 rounded-xl hover:border-${soc.border} hover:bg-${soc.color} hover:scale-105 transition-all duration-200 shadow-sm`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {soc.icon}
                    </svg>
                  </button>
                ))}
              </div>

              <Link href={'view-work'}>
                <button className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm tracking-widest uppercase rounded-xl hover:bg-blue-600 dark:hover:bg-gray-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                  Explore My Work
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-100 to-gray-200 rounded-3xl -z-10 animate-pulse"></div>

              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src={Image.src}
                  alt="Baskar D - Freelancer"
                  className="w-full h-auto max-w-md object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-green-600 dark:text-green-400"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      Available
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      For new projects
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
