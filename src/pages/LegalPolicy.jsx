/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { ChevronRight, X, Plus } from "lucide-react";
import { getLegalPolicies } from "../api";

export default function LegalPolicy() {
  const [expandedIndex, setExpandedIndex] = useState(null); // No item expanded by default
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch FAQs from backend
  useEffect(() => {
    const fetchLegalPolicies = async () => {
      try {
        setLoading(true);
        const response = await getLegalPolicies();
        if (response.data.success) {
          // Transform the data to match the existing structure
          const transformedFaqs = response.data.legalPolicies.map((policy, index) => ({
            id: policy._id,
            question: policy.question,
            answer: policy.answer
          }));
          setFaqs(transformedFaqs);
        } else {
          setError("Failed to fetch legal policies");
        }
      } catch (err) {
        console.error("Error fetching legal policies:", err);
        setError("Failed to fetch legal policies");
      } finally {
        setLoading(false);
      }
    };

    fetchLegalPolicies();
  }, []);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

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