"use client";
import React from 'react';
import Navbar from '../pages/Navbar';

const caseStudies = [
{
id: 1,
title: 'Business Website Development',
description:
'Designed and developed a modern responsive business website with SEO optimization and fast performance.',
image:
'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
link: '#',
},
{
id: 2,
title: 'Meta Ads Lead Generation Campaign',
description:
'Managed Facebook & Instagram ad campaigns to improve leads, sales, and customer reach.',
image:
'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
link: '#',
},
{
id: 3,
title: 'Restaurant & Catering Website',
description:
'Created a professional catering website with gallery, menu showcase, and mobile responsive design.',
image:
'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
link: '#',
},
{
id: 4,
title: 'Portfolio Website Design',
description:
'Built a modern portfolio website with animations, clean UI, and responsive layouts.',
image:
'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
link: '#',
},
{
id: 5,
title: 'Social Media Branding',
description:
'Created engaging content strategy and social media branding for business growth.',
image:
'https://images.pexels.com/photos/5054208/pexels-photo-5054208.jpeg',
link: '#',
},
{
id: 6,
title: 'Android & iOS App Development',
description:
'Designed and developed modern mobile app UI for Android and iOS platforms.',
image:
'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
link: '#',
},
];



export default function CaseStudy() {
  return (
    <section className="bg-gray-50 py-16 px-4" id="case-study">
      <div className="mb-30">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
          🎯 Selected Projects / Case Studies
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  🔍 See Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
