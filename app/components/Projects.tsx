"use client";
import React from 'react';
import Navbar from '../pages/Navbar';

export default function SelectedProjects() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website',
      desc: 'A full-featured online store built with React, TailwindCSS, and Firebase for real-time product management.',
      img: '/project1.jpg',
      link: 'https://yourproject1.com',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      desc: 'My personal portfolio showcasing web development projects and contact details, built using React + Tailwind.',
      img: '/project2.jpg',
      link: 'https://yourproject2.com',
    },
    {
      id: 3,
      title: 'Restaurant Landing Page',
      desc: 'A modern landing page for a local restaurant using Next.js and smooth animations with Framer Motion.',
      img: '/project3.jpg',
      link: 'https://yourproject3.com',
    },
  ];

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="mb-30">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
          ✨ Selected Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {p.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{p.desc}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
                >
                  🔗 View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
