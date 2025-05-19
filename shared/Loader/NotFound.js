import React from "react";
import Lottie from "react-lottie";
import noPageFound from "@/assets/lottieFiles/noPageFound.json";

export default function NotFound({
  height,
  width,
  message,
  firstMessage = "4O4",
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noPageFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={height ?? 120}
        width={width ?? 120}
      />
      <div>
        {firstMessage && (
          <p
            style={{
              color: "#000000",
              fontWeight: "600",
              textAlign: "center",
              // marginTop: "20px",
              fontSize: "20px",
            }}
          >
            {firstMessage ?? ""}
          </p>
        )}
        {message && (
          <p
            style={{
              color: "#000000",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "50px",
              fontSize: "20px",
            }}
          >
            {message ?? ""}
          </p>
        )}
      </div>
    </div>
  );
}
