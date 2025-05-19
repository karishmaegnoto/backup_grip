"use client";
import React from "react";
import LottieLoader from "./lottieLoader";
import styles from "./loaders.module.scss";

const RenderPageLoader = () => {
  return (
    <div className={`${styles.container} invisible`} id="page-loader">
      <div className={styles.content}>
        <LottieLoader height={250} width={250} loader={true} />
      </div>
    </div>
  );
};

export default RenderPageLoader;
