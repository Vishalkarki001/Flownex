import React from "react";
import Lottie from "lottie-react";
import register from "@/animation/register.json"

const RegisterAnimation = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie animationData={register} loop={true} />
    </div>
  );
};

export default RegisterAnimation;
