"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../pages/Navbar';
import axios from 'axios';

const API_URL = '/api/';


export default function BookOrder() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
    budget: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}order`);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}order`, form);

      alert(`🙏 நன்றி ${form.name}! உங்கள் order successfully submit ஆனது.`);

      setForm({
        name: '',
        email: '',
        message: '',
        service: '',
        budget: '',
      });
    } catch (error) {
      console.error('Submit Error:', error);
      alert('❌ Failed to submit order. Please try again.');
    }
  };

  return (
    <section id="book-order" className="bg-gray-50 py-16 px-4">
      <div className="mb-30">
        <Navbar />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          📦 Book Your Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="உங்கள் பெயர்"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Service</option>
            <option>Website Design</option>
            <option>Web Development</option>
            <option>SEO Optimization</option>
          </select>

          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Budget</option>
            <option>Below ₹10,000</option>
            <option>₹10,000 - ₹25,000</option>
            <option>Above ₹25,000</option>
          </select>

          <textarea
            name="message"
            placeholder="Project details..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold"
          >
            🚀 Submit Order
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
