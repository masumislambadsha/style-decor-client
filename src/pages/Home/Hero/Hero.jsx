import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://www.interiordesignmagazines.eu/wp-content/uploads/2025/11/RS.jpg",
    quote: '"MODERN LUXURY AT HOME."',
    title: "Home Office Excellence",
    description:
      "Design your perfect home workspace. Combine comfort, style, and efficiency for maximum productivity in a luxurious setting.",
  },
  {
    image:
      "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2023/09/50-Luxury-Dining-Rooms-A-Feast-For-The-Senses-1400x933.jpg",
    quote: '"DINING IN OPULENCE."',
    title: "Elegant Dining Spaces",
    description:
      "Transform your dining area into a feast for the senses. Perfect balance of luxury and comfort for memorable gatherings.",
  },
  {
    image:
      "https://thearchitectsdiary.com/wp-content/uploads/2024/11/corporate-interior-design-1-1024x682.jpg",
    quote: '"MODERN CORPORATE ELEGANCE."',
    title: "Corporate Interiors",
    description:
      "Timeless designs that inspire innovation. Create professional spaces that reflect your brand's sophistication.",
  },
  {
    image:
      "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2023/08/wave-center-imperfectio-round-armchair_4_bl-1-1400x933.jpg",
    quote: '"INSPIRED LIVING SPACES."',
    title: "Luxury Living Rooms",
    description:
      "Craft living areas that captivate and comfort. From contemporary to classic — spaces that tell your story.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[70vh] md:h-screen overflow-hidden -mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center text-white max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-lg md:text-2xl font-light tracking-[0.25em] uppercase mb-6 text-gray-200">
                {slides[current].quote}
              </p>

              <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                {slides[current].title}
              </h1>

              <p className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
                {slides[current].description}
              </p>

              <button
                onClick={() => (window.location.href = "/services")}
                className="group inline-flex items-center gap-3 bg-[#ff6a4a] hover:bg-white text-white hover:text-black font-bold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-300"
              >
                Book This Design
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#ff6a4a] text-white w-12 h-12 rounded-full flex items-center justify-center transition"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#ff6a4a] text-white w-12 h-12 rounded-full flex items-center justify-center transition"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-[#ff6a4a] w-10" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
