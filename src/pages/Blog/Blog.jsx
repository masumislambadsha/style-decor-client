import React, { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { blogPosts } from "../../constants/blogData.jsx";
const Blog = () => {
  useEffect(() => {
    document.title = "Style Decor | Blog";
    window.scrollTo(0, 0);
  }, []);
  const posts = blogPosts;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black text-gray-800 dark:text-white mb-6 tracking-tight">
            StyleDecor <span className="text-[#ff6a4a]">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Insights, inspiration, and expert advice for creating the space of your dreams.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-[#ff6a4a]/5 transition-all duration-500 group"
            >
              <Link to={`/blog/${post.id}`} className="block h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-[#ff6a4a] text-white text-xs font-bold rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-3 font-medium">
                    {post.date}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 leading-tight group-hover:text-[#ff6a4a] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="text-[#ff6a4a] font-bold flex items-center gap-2 group/btn">
                    Read More
                    <span className="transform translate-x-0 group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Blog;