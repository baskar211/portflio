"use client";
import React from 'react';
import Navbar from '../pages/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const API_URL = '/api/';


export default function HireMe() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const fectchdata = async () => {
      const response = await axios.get(`${API_URL}hireme`)
      console.log(response.data)
    }

    fectchdata();

  }, [])

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handledata = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${API_URL}hireme`, form)

      alert(`🙏 நன்றி ${form.name}! உங்கள் order successfully submit ஆனது.`);

      setForm({
        name: "",
        email: "",
        message: ""
      })
    }
    catch (err) {
      alert('❌ Failed to submit order. Please try again.');

    }
  }

  return (
    <div>
      <div className="mb-30">
        <Navbar />
      </div>
      <section id="contact" className="py-12 bg-gray-50">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            💬 Hire Me for Your Project
          </h2>

          <form
            onSubmit={handledata}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handlechange}
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handlechange}
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handlechange}
              placeholder="Tell me about your project..."
              className="w-full border p-3 rounded-lg"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              🚀 Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
