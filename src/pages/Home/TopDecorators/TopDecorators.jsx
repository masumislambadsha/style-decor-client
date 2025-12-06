import React from "react";
import useDecorators from "../../../Hooks/useDecorators";
import LoadingSpinner from "../../../Components/Spinner/LoadingSpinner";

const TopDecorators = () => {
  const { decorators, loading } = useDecorators();

  if (loading) return <LoadingSpinner />;

  const topSix = decorators.slice(0, 6);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
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
        <span className="ml-2 font-bold text-gray-900 text-lg">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Meet Our Top Decorators
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {topSix.map((decorator) => (
            <div key={decorator._id} className="text-center group">
              <div className="relative mx-auto w-32 h-32 mb-5">
                <div className="relative overflow-hidden rounded-full mx-auto w-32 h-32 mb-4">
                  <img
                    src={
                      decorator.photo || "https://i.ibb.co.com/5Y0X5gY/user.png"
                    }
                    alt={decorator.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <h3 className="font-bold text-lg text-gray-900 leading-tight">
                {decorator.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                {decorator.specialty}
              </p>

              <div className="flex justify-center">
                {renderStars(decorator.rating || 4.8)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDecorators;
