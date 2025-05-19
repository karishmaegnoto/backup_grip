import React, { useState, createContext, useEffect, useCallback } from "react";
import styles from "@/styles/devStyle.module.scss";

const ToastContext = createContext();

export default ToastContext;
export const ToastContextProvider = ({ children }) => {
  const [hasToast, setToasts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let timer;
    if (hasToast.length > 0) {
      timer = setTimeout(() => {
        setToasts((hasToastTemp) => hasToastTemp.slice(1));
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      return () => clearTimeout(timer);
    }
  }, [hasToast]);

  const success = useCallback(
    function (msg) {
      const toast = { msg };
      toast.className = "green";
      setToasts([toast]);
    },
    [setToasts]
  );

  const error = useCallback(
    function (msg) {
      const toast = { msg };
      toast.className = "red";
      setToasts([toast]);
    },
    [setToasts]
  );

  const warning = useCallback(
    function (msg) {
      const toast = { msg };
      toast.className = "orange";
      setToasts([toast]);
    },
    [setToasts]
  );

  const info = useCallback(
    function (msg) {
      const toast = { msg };
      toast.className = "blue";
      setToasts([toast]);
    },
    [setToasts]
  );

  const notification = {
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={notification}>
      {children}
      {hasToast.map((toast, index) => (
        <div className={styles.toastContainer} key={index}>
          <div className={`${styles.toast} ${styles[toast.className]}`}>
            <div className={`${styles.icon} ${styles[toast.className]}`}>
              {toast.className == "green" ? (
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <style>
                      {`
                      .c { fill: currentColor; }
                      .d { fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; }
                    `}
                    </style>
                  </defs>
                  <g id="a">
                    <path
                      className="c"
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </g>
                  <g id="b">
                    <circle className="d" cx="10" cy="10" r="9.5" />
                  </g>
                </svg>
              ) : toast.className == "red" ? (
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <style>
                      {`
        .c { fill: #000000; }
        .d { fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; }
      `}
                    </style>
                  </defs>
                  <g id="a">
                    <circle className="c" cx="24" cy="34.7477" r=".75" />
                    <line
                      className="d"
                      x1="23.9751"
                      y1="30.2752"
                      x2="23.9751"
                      y2="12.5023"
                    />
                  </g>
                  <g id="b">
                    <circle className="d" cx="24" cy="24" r="21.5" />
                  </g>
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 1.25c-4.93 0-8.75 3.82-8.75 8.75S5.07 18.75 10 18.75 18.75 14.93 18.75 10 14.93 1.25 10 1.25zm.25 14a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm-.25-3.5a1.25 1.25 0 00-1.25-1.25h-.25a1.25 1.25 0 00-1.25 1.25v-5a1.25 1.25 0 011.25-1.25h.25a1.25 1.25 0 011.25 1.25v5z" />
                </svg>
              )}
            </div>
            <div className="ml-3 text-sm font-normal text-justify mr-2.5">
              {toast.msg}
            </div>
            {/* <div>
              <button
                type="button"
                onClick={() => setToasts([])}
                className="relative p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                style={{ width: "21px" }}
              >
                <span>X</span>
              </button>
            </div> */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setToasts([])}
                className="flex justify-center items-center"
                style={{
                  width: "20px",
                  background: "#f9f6f6",
                  border: "1px solid #d3cfcf",
                  borderRadius: "5px",
                  marginLeft: "10px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sm font-bold"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </ToastContext.Provider>
  );
};
