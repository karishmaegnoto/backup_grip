import React from "react";
import Lottie from "react-lottie";
import Loader from "@/assets/lottieFiles/pageLoaderSimple.json";
import NoData from "@/assets/lottieFiles/noDataFoundLoader.json";
import Link from "next/link";

// celebration
export default function LottieLoader({
  loader,
  height,
  width,
  message,
  previousMessage,
  linkTo,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <span className={loader ? "page-loading-new" : "w-100"}>
      <Lottie
        options={defaultOptions}
        height={height ?? 120}
        width={width ?? 120}
      />
    </span>
  );
}
