"use client";

import React from "react";
import Navbar from "../pages/Navbar";
import Link from "next/link";

const projectData = [
{
slug: "annam-catering",
title: "Annam Catering",
desc: "Professional catering business website with responsive UI, service showcase, and modern design.",
tech: "React",
status: "Completed",
live: "https://annam-catering.netlify.app/",
price: "₹7,999",
img: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
},
{
slug: "interior-design",
title: "Interior Design",
desc: "Modern interior design website with elegant UI and premium visual experience.",
tech: "React",
status: "Completed",
live: "https://interior-design-website-beryl.vercel.app/",
price: "₹4,999",
img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
},
{
slug: "portfolio-website",
title: "Portfolio Website",
desc: "Modern portfolio website built using Next.js.",
tech: "Next.js",
status: "Completed",
live: "https://baskarwebdev.vercel.app/",
price: "₹3,999",
img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
},
{
slug: "electricians-website",
title: "Electricians Website",
desc: "Business website for electrician services.",
tech: "HTML",
status: "Completed",
live: "https://baskar-ele.netlify.app/",
price: "Custom",
img: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
},
];


export default function ViewWork() {
return ( <div> <div className="mb-24"> <Navbar /> </div>


  <section
    id="portfolio"
    className="py-16 bg-gradient-to-b from-gray-50 to-white"
  >
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
        🚀 My Recent Works
      </h2>

      <p className="text-center text-gray-600 mb-12">
        Explore some of my recent web development projects and client work.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project, index) => (
          <Card key={index} project={project} />
        ))}
      </div>
    </div>
  </section>
</div>


);
}

function Card({ project }: any) {
return (
<Link href={`/projects/${project.slug}`}> <div className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border group hover:-translate-y-2">

    <div className="overflow-hidden">
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
      />
    </div>

    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium">
          {project.tech}
        </span>

        <span className="text-green-600 text-sm font-semibold">
          {project.status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {project.title}
      </h3>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        {project.desc}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-indigo-600">
          {project.price}
        </span>

        <span className="text-indigo-600 font-semibold">
          View Project →
        </span>
      </div>
    </div>
  </div>
</Link>

);
}
