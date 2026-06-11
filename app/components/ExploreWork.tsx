"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../pages/Navbar';

export default function Projects() {
 const projects = [
{
title: 'Annam Catering Website',
desc: 'A professional catering business website with responsive UI, service showcase, contact section, and modern design.',
tech: 'React',
status: 'Completed',
live: 'https://annam-catering.netlify.app/',
img: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
},
{
title: 'Interior Design Website',
desc: 'Modern interior design business website with elegant UI, responsive layout, and premium visuals.',
tech: 'React',
status: 'Completed',
live: 'https://interior-design-website-beryl.vercel.app/',
img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
},
{
title: 'Personal Portfolio Website',
desc: 'A modern portfolio website built using Next.js showcasing services, projects, and professional profile.',
tech: 'Next.js',
status: 'Completed',
live: 'https://baskarwebdev.vercel.app/',
img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
},
{
title: 'Electrician Service Website',
desc: 'Responsive website for electrician services with service listing, contact section, and business-focused design.',
tech: 'HTML',
status: 'Completed',
live: 'https://baskar-ele.netlify.app/',
img: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
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
  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border"
>
  <img
    src={item.img}
    alt={item.title}
    className="rounded-t-2xl w-full h-52 object-cover"
  />

  <div className="p-5">
    <div className="flex justify-between items-center mb-3">
      <span className="bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full">
        {item.tech}
      </span>

```
  <span className="text-green-600 text-sm font-medium">
    {item.status}
  </span>
</div>

<h3 className="text-xl font-bold text-gray-800 mb-2">
  {item.title}
</h3>

<p className="text-gray-600 text-sm mb-5">
  {item.desc}
</p>

<a
  href={item.live}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center text-indigo-600 font-semibold hover:underline"
>
  🔗 View Live Project →
</a>
```

  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
}
