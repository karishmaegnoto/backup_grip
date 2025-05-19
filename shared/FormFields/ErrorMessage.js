import React from "react";

const ErrorMessage = ({ message, style }) => {
  if (message) {
    return (
      <div className="error_msg" style={style}>
        {message}
      </div>
    );
  }
};

export default ErrorMessage;
