import React from "react";
const Logo = () => {
  return (
    <div>
      <svg
        width="220"
        height="60"
        viewBox="0 0 220 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="30" cy="30" r="26" fill="#000000" />
        <path
          d="M14 32L30 18L46 32V44H36V34H24V44H14V32Z"
          stroke="#FF6A4A"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M30 16C30 14.343 31.343 13 33 13C34.657 13 36 14.343 36 16C36 17.657 34.657 19 33 19H30V23"
          stroke="gray"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="30" cy="25.5" r="2.3" fill="#FF6A4A" />
        <path
          d="M19 36C22 39 26 41 30 41C34 41 38 39 41 36"
          stroke="#FF6A4A"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2.5 3"
        />
        <text
          x="64"
          y="24"
          fill="currentColor"
          className="text-gray-800 dark:text-white"
          fontFamily="'Oswald', sans-serif"
          fontSize="24"
          fontWeight="700"
          letterSpacing="0.5"
        >
          Style
          <tspan fill="#FF6A4A">Decor</tspan>
        </text>
        <text
          x="64"
          y="38"
          fill="currentColor"
          className="text-gray-500 dark:text-gray-400"
          fontFamily="'Inter', sans-serif"
          fontSize="8"
          fontWeight="500"
          letterSpacing="1.2"
        >
          HOME • EVENT • INTERIOR
        </text>
      </svg>
    </div>
  );
};
export default Logo;