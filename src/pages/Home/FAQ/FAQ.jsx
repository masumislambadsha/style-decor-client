import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What services does StyleDecor offer?",
            answer: "We offer a wide range of interior decoration services including residential design, commercial spaces, event decoration, consultation services, and complete home makeovers."
        },
        {
            question: "How do I book a decorator?",
            answer: "Simply browse our services, select the one you need, choose your preferred date and time, and complete the booking. Our team will confirm your appointment within 24 hours."
        },
        {
            question: "What are your payment options?",
            answer: "We accept all major credit cards, debit cards, and online payment methods through our secure payment gateway. You can also pay in installments for larger projects."
        },
        {
            question: "Can I cancel or reschedule my booking?",
            answer: "Yes, you can cancel or reschedule up to 48 hours before your appointment without any charges. Cancellations within 48 hours may incur a small fee."
        },
        {
            question: "Do you provide free consultations?",
            answer: "Yes! We offer a free initial consultation where our experts will discuss your requirements, budget, and vision for your space."
        },
        {
            question: "How long does a typical project take?",
            answer: "Project duration varies based on scope and complexity. A single room makeover typically takes 1-2 weeks, while complete home renovations can take 4-8 weeks."
        },
        {
            question: "Are your decorators certified?",
            answer: "Absolutely! All our decorators are certified professionals with years of experience and a proven track record of successful projects."
        },
        {
            question: "What areas do you serve?",
            answer: "We currently serve major cities across the country. Check our Service Coverage page to see if we operate in your area."
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-base-content mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Got questions? We've got answers. Find everything you need to know about our services.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-base-300 transition-colors duration-200"
                            >
                                <span className="text-lg font-semibold text-base-content pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-6 h-6 text-[#ff6a4a] flex-shrink-0 transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? "max-h-96" : "max-h-0"
                                }`}
                            >
                                <div className="px-6 pb-5 text-base-content/70 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
