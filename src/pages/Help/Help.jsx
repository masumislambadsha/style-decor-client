import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Phone, FileText } from "lucide-react";

const Help = () => {
  useEffect(() => {
    document.title = "Style Decor | Help & Support";
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "How do I book a decoration service?",
      a: "Simply browse our categories, select a service, and follow the checkout process. Our decorators will be assigned to your project immediately after payment.",
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, you can cancel your booking up to 48 hours before the scheduled time for a full refund. Cancellations within 48 hours may be subject to a fee.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We currently accept all major credit/debit cards, bKash, and Rocket via our secure payment gateway.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl shadow-[#ff6a4a]/5 border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="bg-[#ff6a4a] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">
              How can we <span className="text-black">help?</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto relative z-10">
              Find answers to commonly asked questions or reach out to our support team for personalized assistance.
            </p>
          </div>

          <div className="p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                { icon: <HelpCircle className="w-8 h-8" />, title: "FAQs", desc: "Common questions" },
                { icon: <MessageCircle className="w-8 h-8" />, title: "Live Chat", desc: "Talk to us now" },
                { icon: <Phone className="w-8 h-8" />, title: "Call Us", desc: "+880 123 456 789" },
                { icon: <FileText className="w-8 h-8" />, title: "Guides", desc: "Design resources" },
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl text-center border border-gray-100 dark:border-gray-700 hover:border-[#ff6a4a]/30 transition-all group">
                  <div className="inline-block p-4 bg-white dark:bg-gray-700 rounded-2xl text-[#ff6a4a] mb-4 shadow-sm transform group-hover:rotate-12 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{faq.q}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
