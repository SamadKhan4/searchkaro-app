/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ChevronRight, X, Plus } from "lucide-react";

export default function LegalPolicy() {
  const [expandedIndex, setExpandedIndex] = useState(0); // First item expanded by default

  // FAQ data from the image
  const faqs = [
    {
      id: 1,
      question: "How do I book a service?",
      answer: "You can book a service by selecting your preferred category, choosing a time slot, and confirming the booking via the app."
    },
    {
      id: 2,
      question: "How do I track my service provider?",
      answer: "You can track your service provider in real-time through the tracking feature available in your active bookings section."
    },
    {
      id: 3,
      question: "What if I face an issue with the service?",
      answer: "If you face any issue with the service, you can report it through the app's support section or contact our customer service team directly."
    },
    {
      id: 4,
      question: "How do I rate and review a service?",
      answer: "After the service is completed, you will receive a notification to rate and review your experience. You can provide ratings and write your feedback."
    },
    {
      id: 5,
      question: "What services does this app provide?",
      answer: "Our app provides a wide range of services including home cleaning, repairs, beauty services, healthcare, and many more professional services."
    },
    {
      id: 6,
      question: "Is registration required to use the app?",
      answer: "Yes, registration is required to book services and track your orders. You can register using your email or phone number."
    },
    {
      id: 7,
      question: "How can I cancel or reschedule a service?",
      answer: "You can cancel or reschedule a service by going to your bookings section and selecting the modify or cancel option. Please note that cancellation policies may apply."
    },
    {
      id: 8,
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards, digital wallets, UPI, and cash on delivery for selected services."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Legal Policy</h1>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className={`rounded-xl transition-all duration-300 ${
              expandedIndex === index
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {/* Question Header */}
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-medium pr-4">{faq.question}</span>
              
              {/* Icon based on state */}
              {expandedIndex === index ? (
                <X className="w-5 h-5 flex-shrink-0 transition-transform" />
              ) : index >= 6 ? (
                <Plus className="w-5 h-5 flex-shrink-0 transition-transform" />
              ) : (
                <ChevronRight className="w-5 h-5 flex-shrink-0 transition-transform" />
              )}
            </button>

            {/* Answer Content - Expandable */}
            {expandedIndex === index && (
              <div className="px-6 pb-6 pt-0">
                <p className={`text-sm leading-relaxed ${
                  expandedIndex === index ? "text-gray-300" : "text-gray-600"
                }`}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
