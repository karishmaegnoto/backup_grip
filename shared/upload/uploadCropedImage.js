/*eslint-disable @next/next/no-img-element*/
import styles from "@/components/users/styles/addUser.module.scss";
import useToastContext from "@/hooks/useToastContext";
import { useCallback, useEffect, useRef, useState } from "react";
import CropEasy from "./Crop/cropEasy";

const UploadCropedImage = ({ handleOnChange, previewImage }) => {
  const notification = useToastContext();
  const fileInput = useRef();

  // ALL STATE
  const [openCrop, setOpenCrop] = useState(false);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(previewImage);

  const uploadFileTarget = () => {
    fileInput.current.click();
  };

  const handleChange = useCallback(
    (event) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];

        if (file.size > 200 * 1024 * 1024) {
          notification.error("File size should not exceed 200 MB.");
          return;
        }

        const acceptedFormats = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];

        if (!acceptedFormats.includes(file.type)) {
          notification.error("Only image formats are allowed.");
          return;
        }
        setFile(Array.from(files));
        setPhotoURL(URL.createObjectURL(file));
        setOpenCrop(true);
      }
    },
    [handleOnChange]
  );

  return (
    <div>
      <div
        onClick={() => uploadFileTarget()}
        className={`${styles.fileUpload} cursor-pointer`}
      >
        <input
          type="file"
          name="fileUpload"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleChange}
          onClick={(e) => (e.target.value = null)} // Reset file input value to allow the same file upload again
        />
        <div className="flex items-center cursor-pointer">
          <img src="/svg/upload.svg" alt="Upload Icon" className="mr-2" />
          <span>Update Profile Photo</span>
        </div>
        <button
          type="button"
          className={styles.browseButton}
          onClick={() => uploadFileTarget()}
        >
          Browse
        </button>
      </div>
      {openCrop && (
        <CropEasy
          photoURL={photoURL}
          setOpenCrop={setOpenCrop}
          setPhotoURL={setPhotoURL}
          setFile={setFile}
          handleOnChange={handleOnChange}
          originalFile={file}
          uploadFileTarget={uploadFileTarget}
        />
      )}
    </div>
  );
};

export default UploadCropedImage;
