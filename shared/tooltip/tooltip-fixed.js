// components/Tooltip.jsx
import React from "react";
import styles from "./tooltip-fixed.module.scss";
import PropTypes from "prop-types";

const TooltipFixed = ({ content, position = "top", children }) => {
  return (
    <div className={content ? styles.tooltipContainer : ""}>
      {children}
      <div className={`${styles.tooltip} ${styles[position]}`}>{content}</div>
    </div>
  );
};

TooltipFixed.propTypes = {
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  children: PropTypes.node.isRequired,
};

export default TooltipFixed;
