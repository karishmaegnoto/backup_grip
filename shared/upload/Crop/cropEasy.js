import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import styles from "./crop.module.scss";

const CropEasy = ({
  photoURL,
  setOpenCrop,
  setPhotoURL,
  setFile,
  handleOnChange,
  originalFile,
  uploadFileTarget,
}) => {
  // State Management
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation,
        { horizontal: false, vertical: false },
        ...originalFile
      );
      setPhotoURL(url);
      setFile(file);
      handleOnChange(file);
      setOpenCrop(false);
    } catch (error) {
      console.error(error || "Error while cropping the image");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Update Profile Photo</h2>
        <p className={styles.modalSubtitle}>
          Adjust and crop your profile photo
        </p>

        {/* Cropper Container */}
        <div className={styles.cropperContainer}>
          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.sliderContainer}>
            <label htmlFor="zoom">Zoom</label>
            <input
              type="range"
              id="zoom"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{
                background: `linear-gradient(
                  to right,
                  #007bff ${((zoom - 1) / 2) * 100}%,
                  #ddd ${((zoom - 1) / 2) * 100}%
                )`,
              }}
            />
          </div>
          {/* <div className={styles.sliderContainer}>
            <label htmlFor="rotate">Rotate</label>
            <input
              type="range"
              id="rotate"
              min={0}
              max={360}
              value={rotation}
              onChange={(e) => setRotation(e.target.value)}
            />
          </div> */}
        </div>

        {/* Actions */}
        <div className={styles.modalActions}>
          <div>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setOpenCrop(false)}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              type="button"
              className={styles.replaceButton}
              onClick={() => uploadFileTarget()}
            >
              Replace Image
            </button>

            <button
              type="button"
              className={styles.saveButton}
              onClick={() => cropImage()}
            >
              Save Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
