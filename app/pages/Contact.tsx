"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../../public/freelancher.png';

import Navbar from './Navbar';
import { useEffect } from 'react';
import axios from 'axios';


const API_URL = '/api/';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Web Development',
    'Video Editing',
    'Branding',
    'Consulting',
  ];

  useEffect(() => {
    const fectchdata = async () => {
      const response = await axios.get(`${API_URL}form`)
    }

    fectchdata();


  }, [])

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}form`, form)

      alert(`🙏 நன்றி ${form.name}! உங்கள் order successfully submit ஆனது.`);

      setForm({
        name: "",
        email: "",
        message: "",
        service: ""
      })
    }
    catch (err) {
      alert('❌ Failed to submit order. Please try again.');

    }
  }


  return (
    <>
      <div className='mb-30'>
        <Navbar />

      </div>
      <section className=" overflow-x-hidden bg-gradient-to-br from-purple-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                <img
                  src={Image.src}
                  alt="Portrait"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Hi badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -left-6 -bottom-6 sm:-left-8 sm:-bottom-8"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-600 flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-800">
                  <span className="text-white font-semibold text-xl sm:text-2xl">
                    Hi
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
              LET’S WORK TOGETHER
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Let&apos;s create something impactful — your brand, your website, or your
              next big idea. Tell me what you have in mind.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-700 dark:text-purple-400 block mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="D. Baskar"
                    className="w-full rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm text-gray-700 dark:text-purple-400 block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Service Dropdown */}
              <div>
                <label
                  htmlFor="service"
                  className="text-sm text-gray-700 dark:text-purple-400 block mb-2"
                >
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="">Select...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm text-gray-700 dark:text-purple-400 block mb-2"
                >
                  What Can I Help You With?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hello, I'd like to enquire about..."
                  className="w-full rounded-2xl bg-gray-100 dark:bg-gray-800 px-5 py-4 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-10 py-3 rounded-full border-2 border-purple-600 text-purple-600 font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
                  aria-busy={submitted}
                >
                  {submitted ? 'Sending...' : 'SUBMIT'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
