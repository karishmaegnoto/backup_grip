import React from "react";

const FilterSvg = ({ fillColor = "#131416" }) => {
  return (
    <svg
      id="filter"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        id="Path_37963"
        data-name="Path 37963"
        d="M12.75,19h-2.5A1.25,1.25,0,0,1,9,17.75V13.006L4.369,8.375A1.25,1.25,0,0,1,4,7.494V5.25A1.25,1.25,0,0,1,5.25,4h12.5A1.25,1.25,0,0,1,19,5.25V7.494a1.25,1.25,0,0,1-.369.881L14,13.006V17.75A1.25,1.25,0,0,1,12.75,19ZM5.25,5.25V7.494l5,5V17.75h2.5V12.494l5-5V5.25Z"
        transform="translate(-1.5 -1.5)"
        fill="#fff"
      ></path>
      <rect
        id="_Transparent_Rectangle_"
        data-name="<Transparent Rectangle>"
        width="20"
        height="20"
        fill="none"
      ></rect>
    </svg>
  );
};

export default FilterSvg;
