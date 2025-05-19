import React from "react";

const MobileSvg = React.memo(({ pathFill = "#12182B" }) => {
  return (
    <svg
      id="phone"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path
        id="Path_37853"
        data-name="Path 37853"
        d="M17.371,19.25h-.106C4.984,18.544,3.24,8.181,3,5.019A1.875,1.875,0,0,1,4.721,3H8.165a1.25,1.25,0,0,1,1.162.788l.95,2.338A1.25,1.25,0,0,1,10,7.475L8.671,8.819a5.856,5.856,0,0,0,4.738,4.75l1.356-1.344a1.25,1.25,0,0,1,1.356-.256l2.356.944a1.25,1.25,0,0,1,.769,1.162v3.3A1.875,1.875,0,0,1,17.371,19.25Zm-12.5-15a.625.625,0,0,0-.625.625v.05C4.534,8.625,6.378,17.375,17.334,18A.625.625,0,0,0,18,17.413V14.075l-2.356-.944-1.794,1.781-.3-.038C8.109,14.194,7.371,8.756,7.371,8.7l-.038-.3L9.109,6.606,8.171,4.25Z"
        transform="translate(-1.121 -1.125)"
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

MobileSvg.displayName = "MobileSvg";

export default MobileSvg;
