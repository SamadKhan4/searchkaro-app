/* eslint-disable no-unused-vars */
import React from "react";

export default function Reports() {
  // Static report sections from the image
  const reportSections = [
    {
      id: 1,
      title: "Company Overview",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 2,
      title: "Market Position and Competitors",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 3,
      title: "Challenges and Risks",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Reports</h1>

      {/* Report Sections */}
      <div className="space-y-8">
        {reportSections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
