"use client";
import React, { useState } from 'react';
import AccordionItem from '../components/Accordion';
import { motion } from 'framer-motion';

import Navbar from './Navbar';
import Image from '../../public/freelancher.png';


export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: 'Web Develpor',
      content:
        'Build responsive, fast, and user-friendly websites using HTML, CSS, JavaScript, and React.',
    },
    {
      title: 'Video Editing',
      content:
        'Create professional videos for YouTube, social media, or business promotions.',
    },
    {
      title: 'Affilate Marketing',
      content:
        'Promote products, drive traffic, and increase sales using smart strategies.',
    },
    {
      title: 'Digital Marketing',
      content:
        'Effective digital marketing strategies to grow your brand online.',
    },
  ];

  return (
    <>
      {/* Navbar can be added here if needed */}
<div className='mb-30'>
      <Navbar />

</div>
    <section
      id="services"
      className="min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6 lg:px-16"
      >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto">
        {/* Left Section */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          >
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-3 h-3 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mt-3" />
            <div>
              <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
                WHAT I CAN DO FOR YOU
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                Hi, I’m Baskar D – a Freelance Web Developer, Video Editor, and
                Digital Marketer.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 dark:border-gray-700">
            {items.map((it, i) => (
              <AccordionItem
              key={i}
              index={i + 1}
              title={it.title}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {it.content}
              </AccordionItem>
            ))}
          </div>
        </motion.div>

        {/* Right Section (Image) */}
        <motion.div
          className="lg:col-span-5 flex justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          >
          <div className="relative w-80 md:w-96">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
            <div className="relative rounded-2xl overflow-hidden rotate-3 shadow-2xl">
              <img
                src={Image.src}
                alt="Creative workspace"
                className="w-full h-full object-cover"
                />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
                </>
  );
}
{/* Service Section */} 
