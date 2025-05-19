import React from "react";
import Lottie from "react-lottie";
// import noDataFound from "@/assets/lottieFiles/noDataFoundLoader.json";
import noDataFound from "@/assets/lottieFiles/content-not-found.json";

export default function NoDataFound({
  height,
  width,
  message,
  firstMessage,
  className,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noDataFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={className ?? ""}>
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
              marginLeft: "50px",
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
              marginLeft: "50px",
            }}
          >
            {message ?? ""}
          </p>
        )}
      </div>
    </div>
  );
}
