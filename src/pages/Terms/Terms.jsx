import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Scale } from "lucide-react";
const Terms = () => {
  useEffect(() => {
    document.title = "Style Decor | Terms of Service";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-[#ff6a4a]/10 rounded-2xl text-[#ff6a4a]">
              <Scale size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white tracking-tight">
              Terms of <span className="text-[#ff6a4a]">Service</span>
            </h1>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-[#ff6a4a]" size={24} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Agreement to Terms</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                By accessing or using StyleDecor, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
              </p>
            </section>
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-[#ff6a4a]" size={24} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">User Obligations</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must provide accurate and complete information when creating an account.
              </p>
            </section>
            <section className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Core Policies</h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400">
                <li><strong>Service Availability:</strong> We strive for 99.9% uptime but do not guarantee uninterrupted service.</li>
                <li><strong>Payment:</strong> All service fees are non-refundable unless stated otherwise in our cancellation policy.</li>
                <li><strong>Intellectual Property:</strong> All designs and content are property of StyleDecor.</li>
                <li><strong>Termination:</strong> We reserve the right to terminate accounts for violations of these terms.</li>
              </ul>
            </section>
            <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    StyleDecor shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
            </section>
            <p className="text-sm text-gray-400 dark:text-gray-500 italic text-center pt-8 border-t border-gray-100 dark:border-gray-800">
              Last updated: January 10, 2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Terms;