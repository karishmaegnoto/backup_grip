import React from "react";
import devStyle from "@/styles/devStyle.module.scss";

const Loader = ({
  height = "20px",
  width = "20px",
  className,
  newLoader = false,
  newLoaderSubmit = devStyle.loader_new,
}) => {
  return (
    <div
      className={
        className
          ? `${newLoader ? newLoaderSubmit : devStyle.loader} ${className}`
          : `${newLoader ? newLoaderSubmit : devStyle.loader}`
      }
      style={{
        height: height,
        width: width,
        //  margin: 'auto'
      }}
    ></div>
  );
};

export default Loader;
