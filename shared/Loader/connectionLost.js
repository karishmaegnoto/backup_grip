import React from "react";
import Lottie from "react-lottie";
import noInternetConnection from "@/assets/lottieFiles/noInternetConnectionLotti.json";

export default function ConnectionLost({ height, width }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noInternetConnection,
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
