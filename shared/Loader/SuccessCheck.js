import React from "react";
import Lottie from "react-lottie";
// import SuccessCheckMark from "@/assets/lottieFiles/simpleSuccess.json";
import SuccessCheckMark from "@/assets/lottieFiles/successComplexLotti.json";

export default function SuccessCheck({ height, width, message }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: SuccessCheckMark,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Lottie
        options={defaultOptions}
        height={height ?? 120}
        width={width ?? 120}
      />
      {message && (
        <p
          style={{
            color: "#5c6873",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "20px",
            fontSize: "20px",
          }}
        >
          {message ?? ""}
        </p>
      )}
    </>
  );
}
