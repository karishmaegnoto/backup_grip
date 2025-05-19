import React from "react";

const EmailSvg = React.memo(({ pathFill = "#12182B" }) => {
  return (
    <svg
      id="email--new"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        id="Path_37932"
        data-name="Path 37932"
        d="M12.625,17.25H3.25l0-9.434,7.146,4.948a.625.625,0,0,0,.712,0L18.25,7.818V13.5H19.5V7.25A1.252,1.252,0,0,0,18.25,6h-15A1.251,1.251,0,0,0,2,7.25v10A1.252,1.252,0,0,0,3.25,18.5h9.375Zm4.249-10L10.75,11.49,4.626,7.25Z"
        transform="translate(-0.75 -2.25)"
        fill="#131416"
      ></path>
      <circle
        id="Ellipse_4"
        data-name="Ellipse 4"
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="translate(13.75 12.5)"
        fill="#131416"
      ></circle>
      <rect
        id="_Transparent_Rectangle_"
        data-name="<Transparent Rectangle>"
        width="20"
        height="20"
        fill="none"
      ></rect>
    </svg>
  );
});

EmailSvg.displayName = "EmailSvg";

export default EmailSvg;
