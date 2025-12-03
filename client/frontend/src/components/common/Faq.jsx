import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "Is the farmland legally verified?",
    answer:
      "Yes. Every farmland and farmhouse plot we offer undergoes complete legal due diligence including title check, registry validation, and owner verification.",
  },
  {
    question: "Can I visit the property before purchasing?",
    answer:
      "Absolutely. We arrange site visits, explain the location potential, and ensure transparency before you make any decision.",
  },
  {
    question: "Do you help with documentation?",
    answer:
      "Yes. We provide end-to-end support including agreement, registry, mutation, and transfer process.",
  },
  {
    question: "Is financing or EMI available?",
    answer:
      "For certain projects, structured payment plans are available. Our team will guide you based on your budget.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 mt-10 mb-10 lato"> {/* centered + less width */}
      {faqData.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-300 bg-[#EAE0D2] shadow-sm hover:shadow-md transition-all p-3"
        >
          {/* Question */}
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left"
          >
            <span className="text-base md:text-lg font-semibold text-[#3D7F6C]">
              {item.question}
            </span>
            {openIndex === index ? (
              <ChevronUp className="text-gray-600" />
            ) : (
              <ChevronDown className="text-gray-600" />
            )}
          </button>

          {/* Answer */}
          {openIndex === index && (
            <div className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
