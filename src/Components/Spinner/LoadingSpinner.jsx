import React from "react";
import { BallTriangle } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="container min-h-screen flex items-center justify-center mx-auto">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="##caeb66"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperclassName=""
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
