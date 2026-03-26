"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';

const blogPosts = [
  {
    id: 1,
    title: 'How I Built My Portfolio Using React',
    date: 'Nov 10, 2025',
    description:
      'A step-by-step guide on how I created my own portfolio website using React and TailwindCSS.',
    link: '#',
  },
  {
    id: 2,
    title: 'Top 5 Tools Every Freelancer Should Use',
    date: 'Oct 25, 2025',
    description:
      'From design to productivity, here are my favorite tools that make freelancing easier and smarter.',
    link: '#',
  },
  {
    id: 3,
    title: 'Why Personal Branding Matters in 2025',
    date: 'Sep 15, 2025',
    description:
      'Your online presence is your resume. Learn how to stand out as a freelancer or creator.',
    link: '#',
  },
];

export default function Blog() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-20 text-center">
      <div className="mb-20">
        <Navbar />
      </div>
      {/* Heading Animation */}
      <motion.h2
        className="text-4xl font-bold text-indigo-700 mb-12"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        📝 My Blog
      </motion.h2>

      {/* Blog Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{post.date}</p>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <motion.a
              href={post.link}
              className="inline-block text-indigo-600 font-medium hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Read More →
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
