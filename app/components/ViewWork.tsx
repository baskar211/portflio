"use client";
import React from 'react';
import Navbar from '../pages/Navbar';
import Link from 'next/link';

const projectData = [
  {
    title: 'Digital Marketing Website',
    image: '/ai-digital-marketing.png',
    description:
      'A modern online store built using React and TailwindCSS with product filters and cart functionality.',
    link: 'https://villa-agency-baskar.vercel.app/',
  },
  {
    title: 'food order Website',
    image: '/ai-food-order.png',
    description:
      'A responsive food ordering website built with React and TailwindCSS.',
    link: 'https://baskar-briyani-delivery.vercel.app/',
  },
  {
    title: 'E Commerce Website',
    image: '/ai-ecommerce.png',
    description:
      'An e-commerce platform built using Next.js and TailwindCSS.',
    link: 'https://electro-baskar.vercel.app/',
  },
  {
    title: 'Static Website',
    image: '/static-template.png',
    description:
      'A static website template built with HTML  and TailwindCSS.',
    link: 'https://baskar-ai-website.netlify.app/',
  },
  {
    title: 'shop Website',
    image: '/shop-template.png',
    description:
      'A responsive shop website built with React and TailwindCSS.',
    link: 'https://baskar-ecommerce-template.netlify.app/',
  },
];

export default function ViewWork() {
  return (
    <div>
      <div className="mb-30">
        <Navbar />
      </div>
      <section id="portfolio" className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          🚀 My Recent Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">

          {projectData.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              image={project.image}
              description={project.description}
              link={project.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({ title, image, description, link }: any) {
  return (
    <div>
      <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold capitalize md:py-2">{title}</h3>

        <img
          src={image}
          alt={title}
          className="rounded-lg mb-4"
        />
        <p className="text-gray-600 mt-2">
          {description}
        </p>
        <Link
          href={link}

          className="text-indigo-600 underline mt-3 inline-block"
        >
          View Project →
        </Link>
      </div>
    </div>
  )
}