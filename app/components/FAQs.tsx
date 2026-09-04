"use client";
import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  // Structured FAQ data for better SEO
 const faqs = [
  {
    question: 'What services do you provide?',
    answer:
      'I provide Full Stack Web Development, Frontend & Backend Development, E-commerce Solutions, Website Maintenance & Support, API Development & Integration, Performance Optimization, and Freelance Technical Consulting.',
  },
  {
    question: 'Can you build a professional website for my business?',
    answer:
      'Yes! I create responsive, modern, fast, and SEO-friendly websites for businesses, startups, personal brands, e-commerce stores, and more. From simple landing pages to complex web applications.',
  },
  {
    question: 'Do you build e-commerce websites or online stores?',
    answer:
      'Absolutely. I develop complete e-commerce solutions with product management, payment gateway integration, shopping cart, order tracking, and a seamless checkout experience tailored to your business.',
  },
  {
    question: 'Can you integrate third-party services or APIs into my website?',
    answer:
      'Yes, I can integrate payment gateways, CRM systems, email services, social logins, maps, and other third-party APIs. I also build custom RESTful APIs for your own applications.',
  },
  {
    question: 'Do you provide ongoing maintenance and support?',
    answer:
      'Yes, I offer website maintenance packages that include security updates, bug fixes, performance monitoring, backups, and content updates to keep your site running smoothly.',
  },
  {
    question: 'Can you help improve my current website speed and performance?',
    answer:
      'Definitely. I analyze your existing website and optimize code, images, caching, server configuration, and database queries to significantly improve loading times and user experience.',
  },
  {
    question: 'How can we start working together?',
    answer:
      'Simply contact me with your project details. We’ll discuss your goals, requirements, budget, and timeline, then I’ll provide a clear plan and quote for your project.',
  },
];

  // Generate structured data for SEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>


      <section
        className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Intro Section - Optimized for SEO */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-4 md:gap-6">
              <div
                className="hidden md:block w-3 h-3 rounded-full bg-primaryPurple mt-4 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 text-gray-900">
                  Frequently Asked Questions
                </h1>
                <p className="text-gray-600 max-w-md text-base md:text-lg leading-relaxed">
                  Here are answers to some common questions from clients. If you don&apos;t see your question here, feel free to reach out — I&apos;m happy to help!
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Accordion - Mobile Optimized */}
          <div className="lg:col-span-8">
            <div
              className="border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100"
              role="region"
              aria-label="FAQ questions and answers"
            >
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="bg-white transition-all duration-200 hover:bg-gray-50"
                >
                  <button
                    className="w-full px-4 py-6 md:px-6 md:py-8 text-left focus:outline-none focus:ring-2 focus:ring-primaryPurple focus:ring-opacity-50 rounded-lg"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className="text-lg md:text-xl font-semibold text-gray-900 pr-4 text-left"
                        itemProp="name"
                      >
                        {faq.question}
                      </h3>
                      <span
                        className={`flex-shrink-0 w-6 h-6 transform transition-transform duration-200  ${openIndex === index ? 'rotate-180' : 'rotate-0'
                          }`}
                        aria-hidden="true"
                      >
                        <svg className="w-6 h-6 text-primaryPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-4 pb-6 md:px-6 md:pb-8">
                      <p
                        className="text-gray-600 text-base md:text-lg leading-relaxed"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}