import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";

const Privacy = () => {
  useEffect(() => {
    document.title = "Style Decor | Privacy Policy";
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
              <Shield size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white tracking-tight">
              Privacy <span className="text-[#ff6a4a]">Policy</span>
            </h1>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-[#ff6a4a]" size={24} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Data Collection</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or communicate with us. This may include your name, email address, phone number, and address.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-[#ff6a4a]" size={24} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Information Security</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-[#ff6a4a]" size={24} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Your Rights</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You have the right to access, collect, and correct your personal data. You can also request that we delete your personal information, subject to certain legal obligations.
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

export default Privacy;
