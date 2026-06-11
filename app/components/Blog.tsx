"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../pages/Navbar";
import Link  from "next/link";

const blogPosts = [
  {
    id: 1,
    slug:"how-i-built-my-portfolio-using-react",
    title: "How I Built My Portfolio Using React",
    date: "June 10, 2026",
    description:
      "A step-by-step guide to building a professional portfolio using React and TailwindCSS.",
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    link: "#",
  },

  {
    id: 2,
    slug:"top-5-tools-every-freelancer-should-use",
    title: "Top 5 Tools Every Freelancer Should Use",
    date: "June 08, 2026",
    description:
      "Discover the best tools for productivity, communication, and client management.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    link: "#",
  },

  {
    id: 3,
    slug:"why-personal-branding-matters-in-2026",
    title: "Why Personal Branding Matters in 2026",
    date: "June 05, 2026",
    description:
      "Learn why building a strong online presence helps freelancers grow faster.",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    link: "#",
  },

  {
    id: 4,
    slug:"best-ui-design-trends-for-websites",
    title: "Best UI Design Trends for Websites",
    date: "June 01, 2026",
    description:
      "Explore modern UI/UX trends that make websites look premium and professional.",
    image:
      "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg",
    link: "#",
  },

  {
    id: 5,
    slug:"how-to-get-freelance-clients-in-2026",
    title: "How to Get Freelance Clients in 2026",
    date: "May 28, 2026",
    description:
      "Simple methods to find clients using LinkedIn, Instagram, and cold outreach.",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    link: "#",
  },

  {
    id: 6,
    slug:"seo-basics-for-small-business-websites",
    title: "SEO Basics for Small Business Websites",
    date: "May 20, 2026",
    description:
      "Learn simple SEO techniques to rank your business website on Google.",
    image:
      "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg",
    link: "#",
  },

  {
    id: 7,
    slug:"meta-ads-for-local-business-growth",
    title: "Meta Ads for Local Business Growth",
    date: "May 15, 2026",
    description:
      "How local businesses can generate more leads using Meta Ads campaigns.",
    image:
      "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg",
    link: "#",
  },

  {
    id: 8,
    slug:"how-to-build-a-business-website-fast",
    title: "How to Build a Business Website Fast",
    date: "May 10, 2026",
    description:
      "A practical guide for creating fast, responsive websites for clients.",
    image:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    link: "#",
  },

  {
    id: 9,
    slug:"content-creation-tips-for-beginners",
    title: "Content Creation Tips for Beginners",
    date: "May 05, 2026",
    description:
      "Start creating content easily using free tools and simple strategies.",
    image:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    link: "#",
  },

  {
    id: 10,
    slug:"how-digital-marketing-helps-small-businesses",
    title: "How Digital Marketing Helps Small Businesses",
    date: "May 01, 2026",
    description:
      "See how SEO, Meta Ads, and social media marketing help local businesses grow.",
    image:
      "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg",
    link: "#",
  },
];

export default function Blog() {
  return (
    <div>
      <div className="mb-24">
        <Navbar />
      </div>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            📝 Latest Blog Posts
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Card key={index} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ post }: any) {
  return (
    <Link href={`/projects/blog/${post.slug}`} className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group">
    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group">
      <div className="overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />
      </div> 
      <div className="p-6">
        <p className="text-sm text-indigo-500 mb-2">
          {post.date}
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-5">
          {post.description}
        </p>
        <motion.a
          href={post.link}
          className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800"
          whileHover={{ scale: 1.05 }}
        >
          Read More →
        </motion.a>
      </div>
    </div>
    </Link>
      )}