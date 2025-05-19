import React from "react";
import styles from "./buttons.module.scss";
import devStyle from "@/styles/devStyle.module.scss";
import Loader from "../Loader/Loader";

const AppButtons = ({
  buttonType = "black",
  buttonSvg = "/svg/add.svg",
  buttonTitle = "Add",
  buttonCustomSvg,
  className = "",
  buttonSvgAlt = "No_IMAGE",
  type = "submit",
  buttonCategory,
  loader,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${
        buttonType === "black" ? styles?.appButton : ""
      } ${className}`}
      {...rest}
    >
      {buttonCustomSvg ? (
        buttonCustomSvg
      ) : (
        <img src={buttonSvg} alt={buttonSvgAlt} />
      )}
      {buttonTitle && (
        <span className={buttonCategory == "submit" ? "mr-2" : ""}>
          {buttonTitle}
        </span>
      )}
      {loader && buttonCategory == "submit" && (
        <Loader
          height="20px"
          width="20px"
          newLoader={true}
          newLoaderSubmit={
            buttonCategory == "submit"
              ? devStyle.loader_save_new
              : devStyle?.loader_new
          }
        />
      )}
    </button>
  );
};

export default AppButtons;
