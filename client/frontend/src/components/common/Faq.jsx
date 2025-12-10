import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
    {
        question:
            "1. Is it legally safe to buy farmland or farmhouse plots in NCR?",
        answer: "Yes. NCR Farms lists only verified, legally clear properties with proper documentation, approvals, and title checks. We ensure safe, transparent transactions.",
    },
    {
        question: "2. Can NRIs buy agricultural land or farmhouses in India?",
        answer: "NRIs cannot directly buy agricultural land, but they can invest through legal structures, partnerships, or farmhouse properties. Our team guides NRIs step-by-step.",
    },
    {
        question:
            "3. What types of properties does NCR Farms offer? Do you help with documentation?",
        answer: "We offer farmland, farmhouse plots, ready-built farmhouses, and agricultural investment properties across Delhi NCR’s high-growth zones.",
    },
    {
        question:
            "4. What is the starting investment for buying farmland or a farmhouse plot?",
        answer: "Entry prices vary across locations, but we offer affordable farmland options, premium plots, and luxury farmhouses depending on your goals and budget.",
    },
    {
        question:
            "5. Do you help with property documentation and registration?",
        answer: "Yes. We provide end-to-end support, including due diligence, documentation, registration, mutation, and post-purchase assistance.",
    },

    {
        question:
            "6. How do I know which property is the best investment for me?",
        answer: "After a quick consultation, our advisors evaluate your budget, goals, appreciation expectations, and lifestyle preferences to recommend the best property.",
    },
    {
        question: "7. Can I build a farmhouse on farmland I purchase?",
        answer: "In most locations, yes-but building permissions depend on local zoning, land-use guidelines, and plot size. We clarify all rules before you invest.",
    },
    {
        question: "8. Do you arrange site visits?",
        answer: "Absolutely. We schedule guided site visits, where our team walks you through the land, boundaries, approvals, and potential development scope.",
    },
    {
        question:
            "9. Are the properties suitable for weekend homes or organic farming?",
        answer: "Yes. Many of our plots are ideal for weekend villas, kitchen gardens, organic farming, and nature-connected living.",
    },
    {
        question:
            "10. What makes NCR Farms different from other real estate companies?",
        answer: "We offer verified properties, transparent pricing, expert guidance, and a focus on sustainable, nature-driven living — ensuring both lifestyle and investment value.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-4 mt-10 mb-10 lato">
            {" "}
            {/* centered + less width */}
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
                            <ChevronUp className="text-[#3D7F6C]" />
                        ) : (
                            <ChevronDown className="text-[#3D7F6C]" />
                        )}
                    </button>

                    {/* Answer */}
                    {openIndex === index && (
                        <div className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed pl-6">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;
