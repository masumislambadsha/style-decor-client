import React, { useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import { blogPosts } from "../../constants/blogData.jsx";
const BlogDetails = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  useEffect(() => {
    window.scrollTo(0, 0);
    if(post) {
      document.title = `Style Decor | ${post.title}`;
    }
  }, [post]);
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-[#ff6a4a] hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-10 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ff6a4a] transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <span className="px-4 py-2 bg-[#ff6a4a]/10 text-[#ff6a4a] text-xs font-bold rounded-full uppercase tracking-widest mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 dark:text-white mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-800 pb-8 mb-10">
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#ff6a4a]" />
                By {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#ff6a4a]" />
                {post.date}
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-[#ff6a4a] transition-colors">
                <Share2 size={16} className="text-[#ff6a4a]" />
                Share Post
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-gray-100 dark:border-white/5">
            <img
              src={post.image}
              className="w-full h-full object-cover"
              alt={post.title}
            />
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
             <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-lg">
                {post.content}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default BlogDetails;