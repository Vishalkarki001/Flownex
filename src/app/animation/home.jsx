import React from "react";
import Lottie from "lottie-react";
import home from "@/animation/flownexhome.json"

const HomeAnimation = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie animationData={home} loop={true} />
    </div>
  );
};

export default HomeAnimation;
