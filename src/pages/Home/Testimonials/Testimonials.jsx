import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Alice Johnson",
            role: "Homeowner",
            review: "StyleDecor transformed my living room completely! The team was professional and the result is stunning.",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Smith",
            role: "Business Owner",
            review: "I hired them for my office renovation. Highly recommended for their creativity and timely delivery.",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
            rating: 5
        },
        {
            id: 3,
            name: "Sophia Martinez",
            role: "Interior Enthusiast",
            review: "Great service and amazing designs. I love how they played with colors and lighting.",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
            rating: 4
        },
        {
            id: 4,
            name: "David Brown",
            role: "Start-up Founder",
            review: "Modern, sleek, and functional. Exactly what I needed for my studio apartment.",
            image: "https://randomuser.me/api/portraits/men/4.jpg",
            rating: 5
        },
        {
            id: 5,
            name: "Sarah Williams",
            role: "Penthouse Owner",
            review: "Exceptional attention to detail. They captured my vision perfectly and exceeded expectations.",
            image: "https://randomuser.me/api/portraits/women/5.jpg",
            rating: 5
        },
        {
            id: 6,
            name: "James Wilson",
            role: "Restaurant Manager",
            review: "The ambiance they created for our dining area is incredible. Customers love the new look!",
            image: "https://randomuser.me/api/portraits/men/6.jpg",
            rating: 5
        }
    ];
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden relative transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6a4a]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6a4a]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
            <div className="container mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white mb-4 tracking-tight leading-tight">
                    What Our Clients Say
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    We take pride in delivering exceptional service. Here is what some of our satisfied clients have to say.
                </p>
            </div>
            <div className="relative cursor-grab active:cursor-grabbing">
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    freeMode={true}
                    speed={8000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    slidesPerView="auto"
                    spaceBetween={32}
                    className="testimonials-swiper !overflow-visible flex items-center"
                >
                    {reviews.concat(reviews).map((review, index) => (
                        <SwiperSlide
                            key={`${review.id}-${index}`}
                            className="!w-[350px] sm:!w-[450px]"
                        >
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 h-full hover:border-[#ff6a4a]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff6a4a]/5 group">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="relative">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="w-16 h-16 rounded-2xl object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-[#ff6a4a] text-white p-1 rounded-lg shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-[#ff6a4a] transition-colors">{review.name}</h3>
                                        <p className="text-sm text-[#ff6a4a] font-bold uppercase tracking-widest">{review.role}</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -top-6 -left-2 text-7xl text-[#ff6a4a]/10 font-serif leading-none transition-colors group-hover:text-[#ff6a4a]/20">“</span>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed relative z-10 italic">
                                        {review.review}
                                    </p>
                                </div>
                                <div className="flex gap-1.5 mt-8">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <span key={i} className="text-amber-400 text-xl drop-shadow-sm">★</span>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="absolute top-0 left-0 w-32 md:w-48 h-full bg-linear-to-r from-gray-50 dark:from-gray-950 to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 w-32 md:w-48 h-full bg-linear-to-l from-gray-50 dark:from-gray-950 to-transparent pointer-events-none z-10"></div>
        </section>
    );
};
export default Testimonials;