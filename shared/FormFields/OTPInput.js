// components/OTPInput.jsx
import React, { useState, useRef, useEffect } from "react";

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));

      if (value && index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, length - otp.join("").length);
    const newOtp = [...otp];
    pastedData.split("").forEach((char, idx) => {
      if (index + idx < length) {
        newOtp[index + idx] = char;
        if (idx === pastedData.length - 1) {
          inputs.current[index + idx].focus();
        }
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  return (
    <div className="flex space-x-2">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength="1"
          className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none"
          ref={(el) => (inputs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
