import { useEffect, useRef, useState } from "react";

export const useTimer = (secCount = 0, callback = () => {}) => {
  const [seconds, setSeconds] = useState(secCount || 5);
  const [start, setStart] = useState(false);

  const timerIdRef = useRef();

  const reset = () => {
    setSeconds(secCount);
    setStart(false);
  };

  //

  useEffect(() => {
    if (start && seconds > 0) {
      timerIdRef.current = setTimeout(() => {
        setSeconds((prev) => {
          const newSeconds = prev - 1;
          if (newSeconds === 0) {
            callback();
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, [start, seconds, callback]);

  const startTimer = () => {
    setStart(true);
  };

  return [seconds, startTimer, reset];
};
