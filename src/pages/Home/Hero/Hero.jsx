import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    image:
      "https://www.covethouse.eu/blog/wp-content/uploads/2023/05/fUpiWa3P.jpeg",
    quote: '"AESTHETICS THAT INSPIRE PRODUCTIVITY."',
    title: "Luxury Office Design",
    description:
      "Create workspaces that blend elegance with functionality. From executive suites to collaborative areas — elevate your professional environment.",
  },
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
      "Timeless designs that inspire innovation. Create professional spaces that reflect your brand&apos;s sophistication.",
  },
  {
    image:
      "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2023/08/wave-center-imperfectio-round-armchair_4_bl-1-1400x933.jpg",
    quote: '"INSPIRED LIVING SPACES."',
    title: "Luxury Living Rooms",
    description:
      "Craft living areas that captivate and comfort. From contemporary to classic — spaces that tell your story.",
  },
  {
    image:
      "https://www.decorilla.com/online-decorating/wp-content/uploads/2023/08/Modern-Mediterranean-interior-design-for-a-living-room.jpg",
    quote: '"SUNNY LUXURY VIBES."',
    title: "Mediterranean Modern",
    description:
      "Infuse warmth and elegance into your home. Blend modern design with timeless Mediterranean charm.",
  },
  {
    image:
      "https://interiordesign.net/wp-content/uploads/2023/02/Interior-Design-YOD-Group-Terra-Ukraine-idx230101_boy_Hotel_Dining01.jpg",
    quote: '"FLAVORFUL AMBIANCE."',
    title: "Restaurant Designs",
    description:
      "Create inviting spaces for culinary experiences. Perfect fusion of style and functionality for hospitality.",
  },
];

const Hero = () => {
  return (
    <section className="relative h-[70vh] md:h-[98vh] overflow-hidden bg-linear-to-br from-[#ff6a4a] via-[#ff8b6a] to-[#ffa98a] -mt-20">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        speed={1200}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-linear(rgba(0,0,0,0.65), rgba(0,0,0,0.8)), url(${slide.image})`,
              }}
            />

            {/* content */}
            <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <motion.p
                  className="text-lg md:text-2xl font-light text-gray-200 mb-6 tracking-[0.25em] uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {slide.quote}
                </motion.p>

                <motion.h1
                  className="text-4xl md:text-6xl font-extrabold text-white mt-6 mb-4 leading-tight"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  className="text-base md:text-lg text-gray-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    onClick={() => {
                      window.location.href = "/services";
                    }}
                    className="group relative inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-linear-to-r from-[#ff6a4a] to-[#ff8b6a] rounded-full shadow-2xl hover:shadow-[#ffa98a]/50 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 cursor-pointer">
                      Book This Design
                    </span>
                    <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#ff8b6a] to-[#ffa98a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* swiper arrows (default classes used by Swiper) */}
      <div className="swiper-button-prev text-white bg-black/30 w-8 h-8 md:w-12 md:h-12 rounded-full left-6 after:text-2xl hover:bg-[#ff6a4a]/70 transition-all" />
      <div className="swiper-button-next text-white bg-black/30 w-8 h-8 md:w-12 md:h-12 rounded-full right-6 after:text-2xl hover:bg-[#ff6a4a]/70 transition-all" />
    </section>
  );
};

export default Hero;
