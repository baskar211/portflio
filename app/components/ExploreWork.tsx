"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../pages/Navbar';

export default function Projects() {
  const projects = [
    {
      title: 'Portfolio Website',
      desc: 'A clean, responsive portfolio using React and TailwindCSS.',
      img: 'https://via.placeholder.com/400x250',
    },
    {
      title: 'Bakery Landing Page',
      desc: 'Modern website design for a bakery with animations.',
      img: 'https://via.placeholder.com/400x250',
    },
    {
      title: 'Affiliate Blog',
      desc: 'SEO-friendly blog built using Next.js and Markdown.',
      img: 'https://via.placeholder.com/400x250',
    },
  ];

  return (
    <section className="min-h-screen bg-white py-16 px-8">
      <div className="mb-30">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/"
            className="flex items-center text-indigo-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🚀 My Selected Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4"
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm mb-4">{item.desc}</p>
              <button className="text-indigo-600 font-medium hover:underline">
                See Case Study →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
