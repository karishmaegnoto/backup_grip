/*eslint-disable @next/next/no-img-element*/

import React, { useCallback, useRef } from "react";
import styles from "@/components/users/styles/addUser.module.scss";
import useToastContext from "@/hooks/useToastContext";

const UploadFileButton = ({ handleOnChange }) => {
  const notification = useToastContext();

  const fileInput = useRef();

  const uploadFileTarget = () => {
    fileInput.current.click();
  };

  const handleChange = useCallback(
    (event) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];

        if (file.size > 200 * 1024 * 1024) {
          // 200 MB
          notification.error("File size should not exceed 200 MB.");
          return;
        }

        // Check file type (only accept Excel, PDF, and images)
        const acceptedFormats = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];

        if (!acceptedFormats.includes(file.type)) {
          notification.error(
            "Only PDF, Excel files, and image formats are allowed."
          );
          return;
        }

        // Pass the selected file(s) to the callback function
        handleOnChange(Array.from(files));
      }
    },
    [handleOnChange]
  );

  return (
    <div
      className={`${styles.fileUpload} cursor-pointer`}
      onClick={() => uploadFileTarget()}
    >
      <input
        type="file"
        name="fileUpload"
        accept=".pdf, .xls, .xlsx, image/*"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleChange}
        onClick={(e) => (e.target.value = null)} // Reset file input value to allow the same file upload again
      />
      <div className="flex items-center cursor-pointer">
        <img src="/svg/upload.svg" alt="Upload Icon" className="mr-2" />
        <span>Update Profile Photo</span>
      </div>
      <button type="button" className={styles.browseButton}>
        Browse
      </button>
    </div>
  );
};

export default UploadFileButton;
