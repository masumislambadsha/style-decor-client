import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            toast.success("Thank you for subscribing!");
            setEmail("");
            setLoading(false);
        }, 1000);
    };
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff6a4a]/5 dark:bg-[#ff6a4a]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ff6a4a]/5 dark:bg-[#ff6a4a]/10 rounded-full blur-3xl"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-[#ff6a4a]/5 p-8 md:p-16 border border-gray-100 dark:border-gray-800">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-block p-4 bg-[#ff6a4a]/10 rounded-full mb-6">
                            <Mail className="w-10 h-10 text-[#ff6a4a]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white mb-4 tracking-tight leading-tight">
                            Stay Updated with StyleDecor
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                            Subscribe to our newsletter and get the latest design trends, exclusive offers, and expert tips delivered to your inbox.
                        </p>
                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#ff6a4a]/50 transition-all">
                                <div className="relative flex-1 w-full">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-800 dark:text-white focus:outline-none text-base"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn bg-[#ff6a4a] hover:bg-black dark:hover:bg-white dark:hover:text-black border-none text-white font-bold px-8 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 h-auto min-h-0 w-full sm:w-auto transition-all active:scale-95"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <>
                                            Join Now
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-6 font-medium">
                            We respect your privacy. No spam, just inspiration.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Newsletter;