"use client";
import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  // Structured FAQ data for better SEO
  const faqs = [
{
question: 'What services do you provide?',
answer:
'I provide Full Stack Web Development, Android & iOS App Development, Digital Marketing, Meta Ads Management, Social Media Management, Content Creation, and Freelance Consulting services for businesses and personal brands.',
},
{
question: 'Can you build a professional website for my business?',
answer:
'Yes! I create responsive, modern, fast, and SEO-friendly websites for businesses, startups, personal brands, catering services, shops, and other industries with a professional design and user experience.',
},
{
question: 'Do you run Facebook and Instagram ads?',
answer:
'Yes, I specialize in Meta Ads (Facebook & Instagram Ads). I help businesses generate leads, increase sales, improve brand awareness, and reach the right audience with effective ad campaigns.',
},
{
question: 'Do you develop Android & iOS mobile apps?',
answer:
'Yes, I develop modern mobile applications for Android and iOS with clean UI, smooth performance, and scalable features based on your business needs.',
},
{
question: 'Can you manage social media for my business?',
answer:
'Yes, I help businesses manage their social media by creating content, improving engagement, growing followers, and building a strong online presence.',
},
{
question: 'How can we start working together?',
answer:
'Simply contact me with your project details. We will discuss your goals, requirements, budget, and create the best solution for your business growth.',
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