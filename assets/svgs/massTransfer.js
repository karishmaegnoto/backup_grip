import React from "react";

const MassTransfer = React.memo(({ pathFill = "black" }) => {
  return (
    <svg
      id="migrate--alt"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        id="Path_38026"
        data-name="Path 38026"
        d="M18.25,4h-15A1.25,1.25,0,0,0,2,5.25v12.5A1.25,1.25,0,0,0,3.25,19h15a1.25,1.25,0,0,0,1.25-1.25V5.25A1.25,1.25,0,0,0,18.25,4Zm0,13.75h-10V14H7v3.75H3.25V12.125H13.357l-2.241,2.241L12,15.25l3.75-3.75L12,7.75l-.884.884,2.241,2.241H3.25V5.25H7V9H8.25V5.25h10Z"
        transform="translate(-0.75 -1.5)"
        fill="#131416"
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
});

MassTransfer.displayName = "OrdersSvg";

export default MassTransfer;
