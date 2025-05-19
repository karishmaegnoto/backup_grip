import React from "react";
import Lottie from "react-lottie";
import celebrationSuccess from "@/assets/lottieFiles/celibrationLotti.json";

export default function CelebrationSuccess({ height, width }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: celebrationSuccess,
    //animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <span>
      <Lottie
        options={defaultOptions}
        height={height ?? 120}
        width={width ?? 120}
      />
    </span>
  );
}
