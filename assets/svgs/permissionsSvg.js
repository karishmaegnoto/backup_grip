import React from "react";

const PermissionsSvg = React.memo(({ pathFill = "black" }) => {
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
        d="M15 1.25C15.6875 1.25 16.25 1.8125 16.25 2.5V7.5H15V2.5H2.5V10.625C2.5 12.6875 3.625 14.625 5.5 15.5625L8.125 17V18.4375L4.875 16.6875C2.625 15.5 1.25 13.1875 1.25 10.625V2.5C1.25 1.8125 1.8125 1.25 2.5 1.25H15ZM12.5 6.25H5V7.5H12.5V6.25ZM17.5 11.875V13.75C18.1875 13.75 18.75 14.3125 18.75 15V18.125C18.75 18.8125 18.1875 19.375 17.5 19.375H12.5C11.8125 19.375 11.25 18.8125 11.25 18.125V15C11.25 14.3125 11.8125 13.75 12.5 13.75V11.875C12.5 10.5 13.625 9.375 15 9.375C16.375 9.375 17.5 10.5 17.5 11.875ZM15 10.625C14.3125 10.625 13.75 11.1875 13.75 11.875V13.75H16.25V11.875C16.25 11.1875 15.6875 10.625 15 10.625ZM12.5 15V18.125H17.5V15H12.5ZM5 10H8.75V11.25H5V10Z"
        fill={pathFill}
      />
    </svg>
  );
});

PermissionsSvg.displayName = "PermissionsSvg";

export default PermissionsSvg;
