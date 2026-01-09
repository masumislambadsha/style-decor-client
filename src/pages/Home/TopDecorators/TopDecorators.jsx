import React from "react";
import useDecorators from "../../../Hooks/useDecorators";
import DecoratorCardSkeleton from "../../../Components/Skeletons/DecoratorCardSkeleton";

const TopDecorators = () => {
  const { decorators, loading } = useDecorators();

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-10 sm:mb-16 text-base-content">
            Meet Our Top Decorators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-10">
            {[...Array(6)].map((_, i) => (
              <DecoratorCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const topSix = decorators.slice(0, 6);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 sm:w-5 h-4 sm:h-5 ${
              i < full
                ? "text-[#ff6a4a] fill-[#ff6a4a]"
                : i === full && hasHalf
                ? "text-[#ff6a4a] fill-[#ff6a4a]"
                : "text-gray-300 fill-none"
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {i < full ? (
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            ) : i === full && hasHalf ? (
              <>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"
                  fill="currentColor"
                  opacity="0.4"
                />
                <path
                  d="M12 2l-3.09 6.26L2 9.27l5 4.87-1.18 6.88L12 17.77l6.18 3.25L17 14.14l5-4.87-6.91-1.01L12 2z"
                  stroke="currentColor"
                  fill="none"
                />
              </>
            ) : (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="none"
              />
            )}
          </svg>
        ))}
        <span className="ml-1 sm:ml-2 font-bold text-base-content text-sm sm:text-lg">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-10 sm:mb-16 text-base-content">
          Meet Our Top Decorators
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-10 md:space-y-0 space-y-5">
          {topSix.map((decorator) => {
            const imgSrc = decorator.photoURL || decorator.photo;
            return (
              <div key={decorator._id} className="text-center group h-[200px] md:h-auto">
                <div className="relative mx-auto w-24 sm:w-32 h-24 sm:h-32 mb-4">
                  <div className="relative overflow-hidden rounded-full mx-auto w-24 sm:w-32 h-24 sm:h-32 mb-3">
                    <img
                      src={imgSrc}
                      alt={decorator.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-base-content leading-tight">
                  {decorator.name}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/60 mt-1 mb-3">
                  {decorator.specialty}
                </p>

                <div className="flex justify-center">
                  {renderStars(decorator.rating || 4.8)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopDecorators;
