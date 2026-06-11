"use client";
import React from 'react';

/**
 * Modern footer with gradient background and enhanced layout
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white mt-20 ">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-lg">
                DS
              </div>
              <span className="text-xl font-bold">D.Baskar</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
             Hi, I'm Baskar D — helping businesses grow through Web Development, App Development, and Digital Marketing.

            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {['About', 'Work', 'Services', 'Testimonials', 'Blog'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-4">
              {[
                'Affilate Marketing',
                'Web Design',
                'Andriod Development',
                'Brand Identity',
                'Social Ads',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="font-medium hover:text-blue-400 transition-colors duration-200">
                    baskard20521@gmail.com
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Call Today</div>
                  <div className="font-medium hover:text-green-400 transition-colors duration-200">
                    +91 8903352306
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="font-medium hover:text-purple-400 transition-colors duration-200">
                    Tiruttani, Tamil Nadu, India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-gray-800">
          <div className="text-gray-400 text-sm">
            © Copyright {currentYear}. All Rights Reserved by{' '}
            <a
              href="#"
              className="text-white hover:text-blue-400 transition-colors duration-200 font-semibold"
            >
              D.Baskar
            </a>
          </div>
          {/* Add social icons if needed */}
        </div>

        {/* Bottom Note */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            **Crafted with passion • Built with code • Designed for impact**
          </p>
        </div>
      </div>
    </footer>
  );
}
