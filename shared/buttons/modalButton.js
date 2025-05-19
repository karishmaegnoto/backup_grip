import React from "react";
import styles from "./buttons.module.scss";
import Loader from "../Loader/Loader";
import devStyle from "@/styles/devStyle.module.scss";

const ModalButton = ({
  buttonType = "submit",
  buttonTitle = "Add",
  className = "",
  type = "submit",
  loader,
  ...rest
}) => {
  let buttonClass = "";

  if (buttonType === "submit") {
    buttonClass = styles?.saveButton;
  } else if (buttonType === "cancel") {
    buttonClass = styles?.cancelButton;
  }

  return (
    <button type={type} className={`${buttonClass} ${className}`} {...rest}>
      <span className="flex">
        {buttonTitle && <span>{buttonTitle}</span>}
        {loader && (
          <span style={{ marginLeft: "15px" }}>
            <Loader
              height="20px"
              width="20px"
              newLoader={true}
              newLoaderSubmit={
                buttonType == "submit"
                  ? devStyle.loader_save_new
                  : devStyle?.loader_new
              }
            />
          </span>
        )}
      </span>
    </button>
  );
};

export default ModalButton;
