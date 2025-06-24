"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We specialize in modern website design, development, and deployment—from landing pages to full-scale web apps.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer maintenance packages and support services to keep your site running smoothly after launch.",
  },
  {
    question: "Can I customize my plan?",
    answer:
      "Absolutely. Every project is different—we tailor our pricing and plans to your exact needs.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-indigo-600" />
                ) : (
                  <FaChevronDown className="text-indigo-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
