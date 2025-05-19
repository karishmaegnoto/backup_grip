import React from "react";
import global from "@/styles/global.module.css";

const StarLabel = ({ labelText, startLabel, className }) => {
  return (
    <div className={`${global.customLabelComponent}`}>
      <label className={`${global.authlabel} ${className} mb-0`}>
        {labelText}
      </label>
      {startLabel && <p className="text-danger mb-0 ml-1">*</p>}
    </div>
  );
};

export default StarLabel;
