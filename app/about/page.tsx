"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "../../public/freelancher.png";
import Link from "next/link";
import Navbar from "../pages/Navbar";

// ---------- Resume Data (from your text file) ----------
const resume = {
  name: "D. BHASKAR",
  title: "BBA Graduate | Data Analyst Aspirant | Web Developer",
  phone: "+91 70948 92052",
  email: "baskard20521@gmail.com",
  location: "Chennai, Tamil Nadu",
  github: "github.com/baskar211",
  linkedin: "linkedin.com/in/baskard20521",
  portfolio: "baskarwebsolution.vercel.app",
  summary:
    "BBA graduate with a strong interest in Data Analytics, Business Administration, and Web Development. Skilled in Microsoft Excel, SQL, Python, HTML, CSS, JavaScript, React.js, and Next.js, with practical experience in website development, SEO, digital marketing, lead generation, and client handling. Strong in analytical thinking, problem-solving, communication, and continuous learning. Seeking an entry-level opportunity where I can apply my business and technical skills while developing professionally.",
  skills: {
    "Data Analytics": [
      "Microsoft Excel",
      "Advanced Excel",
      "Data Cleaning",
      "Data Analysis",
      "Data Visualization",
      "Pivot Tables",
      "VLOOKUP/XLOOKUP",
      "SQL Queries",
      "Power BI",
      "Python Pandas",
      "Business Reporting",
    ],
    "Web Development": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Next.js",
      "Python",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "Git",
      "GitHub",
      "Responsive Web Design",
    ],
    "Business & Management": [
      "Business Administration",
      "Business Analysis",
      "Market Research",
      "Operations Management",
      "Lead Generation",
      "Client Handling",
      "Customer Relationship Management",
    ],
    "Digital Marketing": [
      "SEO",
      "Local SEO",
      "Google Business Profile",
      "Social Media Marketing",
      "WhatsApp Marketing",
      "Keyword Research",
      "Lead Generation",
    ],
    "Soft Skills": [
      "Communication",
      "Analytical Thinking",
      "Problem Solving",
      "Critical Thinking",
      "Time Management",
      "Teamwork",
      "Adaptability",
      "Quick Learning",
    ],
  },
  education: {
    degree: "Bachelor of Business Administration (BBA)",
    institution: "Government Nandanam Arts College, Chennai",
    period: "2022 – 2025",
    specialization: "Business Administration",
  },
  projects: [
    {
      title: "Business Website Development",
      details: [
        "Developed responsive business websites for local businesses.",
        "Used HTML, CSS, JavaScript, React.js, and Next.js.",
        "Implemented WhatsApp enquiry and contact features.",
        "Deployed websites using Vercel and Netlify.",
      ],
    },
    {
      title: "Data Analysis Project",
      details: [
        "Organized and analyzed business data using Excel and SQL.",
        "Performed basic data cleaning and analysis.",
        "Created reports and visualizations to identify business trends and insights.",
      ],
    },
    {
      title: "Lead Generation & Digital Marketing",
      details: [
        "Created lead-generation solutions for local businesses.",
        "Used Google Maps, WhatsApp, and social media for business outreach.",
        "Managed leads, follow-ups, and enquiry tracking.",
      ],
    },
    {
      title: "Personal Portfolio Website",
      details: [
        "Developed a personal portfolio website to showcase technical skills and projects.",
        "Implemented responsive design and project sections.",
        "Used React.js / Next.js, JavaScript, GitHub, and Vercel.",
      ],
    },
  ],
  interests: [
    "Data Analytics & Business Intelligence",
    "Business Administration & Operations",
    "Business Analysis",
    "Web & Frontend Development",
    "SQL & Database Management",
    "Digital Marketing & SEO",
    "Problem Solving",
    "Learning New Technologies",
  ],
  languages: [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Professional Working Proficiency" },
  ],
  hobbies: [
    "Learning new technologies",
    "Building small projects",
    "Practicing coding",
    "Exploring business and technology",
    "Learning Data Analytics",
  ],
};

export default function About() {
  return (
    <>
      <div className="mb-30">
        <Navbar />
      </div>

      <section className="overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* ---------- HERO SECTION (Original) ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-20">
            {/* Content */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-4 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    About Me
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight">
                  {resume.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
                  {resume.title}
                </p>
                <p className="text-base text-gray-500 dark:text-gray-400 mt-6 leading-relaxed max-w-2xl">
                  {resume.summary}
                </p>
              </div>

              {/* Stats Grid (customized) */}
              <div className="grid grid-cols-3 gap-8 mb-14">
                {[
                  { value: "2026", label: "Started Journey" },
                  { value: "10+", label: "Skills Learned" },
                  { value: "5+", label: "Projects Built" },
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
                    Phone
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                    {resume.phone}
                  </div>
                </div>
                <div className="group">
                  <div className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-3">
                    Email
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                    {resume.email}
                  </div>
                </div>
              </div>

              {/* Social & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <div className="flex items-center gap-4">
                  <a
                    href={`https://${resume.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white dark:bg-gray-800 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={`https://${resume.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white dark:bg-gray-800 border border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>

                <Link href="/view-work">
                  <button className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm tracking-widest uppercase rounded-xl hover:bg-blue-600 dark:hover:bg-gray-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                    Explore My Work
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Image */}
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
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600 dark:text-green-400">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">Available</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">For new projects</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ---------- RESUME SECTIONS ---------- */}
          <div className="space-y-20">
            {/* Professional Summary */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Professional Summary</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{resume.summary}</p>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(resume.skills).map(([category, skills]) => (
                  <div key={category} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{resume.education.degree}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{resume.education.institution}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{resume.education.period}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Specialization: {resume.education.specialization}</p>
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resume.projects.map((project, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                      {project.details.map((detail, i) => (
                        <li key={i} className="text-sm">{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Professional Interests */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Professional Interests</h2>
              <div className="flex flex-wrap gap-3">
                {resume.interests.map((interest) => (
                  <span key={interest} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Languages & Hobbies */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Languages</h2>
                <ul className="space-y-2">
                  {resume.languages.map((lang) => (
                    <li key={lang.name} className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{lang.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Hobbies</h2>
                <ul className="space-y-2">
                  {resume.hobbies.map((hobby) => (
                    <li key={hobby} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {hobby}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </>
  );
}