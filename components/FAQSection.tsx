"use client";

import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We specialize in modern website design, development, and deployment — from landing pages to full-scale web applications tailored to your business needs.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes! We offer maintenance and support packages to ensure your website runs smoothly and stays up to date after launch.",
  },
  {
    question: "Can I customize my plan?",
    answer:
      "Absolutely. We understand every project is unique, so we tailor our pricing and plans to fit your specific requirements.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope, but most landing pages can be completed within 1-2 weeks, while larger apps might take 4-8 weeks.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We primarily work with Next.js, React, Tailwind CSS, and modern backend tools like Node.js and MongoDB to build fast, scalable apps.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-300 rounded-xl bg-white shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full px-6 py-5 text-left text-gray-900 font-semibold hover:bg-indigo-50 rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <HiChevronUp className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <HiChevronDown className="w-6 h-6 text-indigo-600" />
                  )}
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  className={`px-6 pt-0 pb-6 text-gray-700 text-sm leading-relaxed transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
