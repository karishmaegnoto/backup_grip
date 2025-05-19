import React from "react";

const InvoicesSvg = React.memo(({ pathFill = "black" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 1.25H16.25C16.5815 1.25 16.8995 1.3817 17.1339 1.61612C17.3683 1.85054 17.5 2.16848 17.5 2.5V17.5C17.5 17.8315 17.3683 18.1495 17.1339 18.3839C16.8995 18.6183 16.5815 18.75 16.25 18.75H5C4.66848 18.75 4.35054 18.6183 4.11612 18.3839C3.8817 18.1495 3.75 17.8315 3.75 17.5V15H2.5V13.75H3.75V10.625H2.5V9.375H3.75V6.25H2.5V5H3.75V2.5C3.75 2.16848 3.8817 1.85054 4.11612 1.61612C4.35054 1.3817 4.66848 1.25 5 1.25ZM5 17.5H16.25V2.5H5V5H6.25V6.25H5V9.375H6.25V10.625H5V13.75H6.25V15H5V17.5ZM8.75 5H13.75V6.25H8.75V5ZM13.75 9.375H8.75V10.625H13.75V9.375ZM8.75 13.75H13.75V15H8.75V13.75Z"
        fill={pathFill}
      />
    </svg>
  );
});

InvoicesSvg.displayName = "InvoicesSvg";

export default InvoicesSvg;
