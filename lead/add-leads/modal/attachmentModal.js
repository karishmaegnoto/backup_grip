/*eslint-disable @next/next/no-img-element*/
import CustomModal from "@/components/shared/modal/customizedModal";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import styles from "@/components/lead/lead-comp.module.scss";
import { useDropzone } from "react-dropzone";
import useToastContext from "@/hooks/useToastContext";
import { FileText } from "lucide-react";
import Image from "next/image";
import AppButtons from "@/components/shared/buttons/appButtons";
import CrossImageSvg from "@/assets/svgs/crossImageSvg";
import dummyImage from "@/assets/images/dummyFile.png";

const AttachmentModal = ({
  show,
  onHide,
  attachedFiles,
  setAttachedFiles,
  setTriggerEditEvent,
  triggerEditEvent,
  moduleType,
  handleAddTimeline,
  setAttachmentType,
  setAttachmentLoader,
  leadId,
}) => {
  const notification = useToastContext();
  const [files, setFiles] = useState([]);

  //------------sync attachedFiles prop to local files state-------------------
  useEffect(() => {
    if (attachedFiles?.length > 0) {
      // Filter out default placeholder URLs and dummy files by name
      const dummyFileNames = ["dummy-file1.png", "dummy-file2.jpg"];
      const filteredFiles = attachedFiles.filter((file) => {
        if (typeof file === "string") {
          return !file.includes("no_image.png");
        } else if (file?.name) {
          return !dummyFileNames.includes(file.name);
        }
        return true;
      });
      setFiles(filteredFiles);
    } else {
      setFiles([]);
    }
  }, [attachedFiles]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      const maxSizeInBytes = 4 * 1024 * 1024; // 4 MB
      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > maxSizeInBytes
      );

      if (oversizedFiles.length > 0) {
        notification.error("File size must not exceed 4MB.");
      } else if (rejectedFiles.length > 0) {
        notification.error(
          "Only jpeg, jpg, png, pdf, xlsx, csv, doc, docx, txt, and xls files are allowed."
        );
      } else {
        setFiles((prevFiles) => {
          // Filter out duplicates by file name
          const existingFileNames = new Set(prevFiles.map((file) => file.name));
          const filteredNewFiles = acceptedFiles.filter(
            (file) => !existingFileNames.has(file.name)
          );
          const newFiles = [...prevFiles, ...filteredNewFiles];
          if (setAttachedFiles) {
            setAttachedFiles(newFiles);
          }
          return newFiles;
        });
      }
    },
    [notification, setAttachedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
      "text/csv": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "text/plain": [],
    },
  });

  const formatSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  const handleDelete = (index) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, fileIndex) => fileIndex !== index);
      if (setAttachedFiles) {
        setAttachedFiles(newFiles);
      }
      return newFiles;
    });
  };

  const isDummyImage = (file) => {
    const fileType = file?.type;
    return (
      fileType === "application/pdf" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel" ||
      fileType === "text/csv" ||
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "text/plain"
    );
  };

  //-----Added handle Submit-----------//
  const handleSubmit = async () => {
    if (!moduleType) {
      onHide();
      return;
    }
    if (!leadId) {
      notification.error("Lead ID is missing. Cannot upload attachments.");
      return;
    }
    setAttachmentType("hit-attachment");
    setAttachmentLoader(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("attachment", file);
      });

      //------------- Call editLeadApi from hooks/ApisContainer/Lead------------
      const { editLeadApi } = await import("hooks/ApisContainer/Lead");
      await new Promise((resolve, reject) => {
        editLeadApi(formData, leadId, notification, (loading, error) => {
          if (loading) return;
          if (error) {
            reject(new Error("Failed to upload attachments"));
          } else {
            resolve();
          }
        });
      });

      handleAddTimeline("attachment", "Files updated");
      setTriggerEditEvent(!triggerEditEvent);

      // setAttachedFiles((prev) => [...prev, ...files]);

      setFiles([]);
      if (setAttachedFiles) {
        setAttachedFiles([]);
      }
      onHide();
    } catch (error) {
      notification.error(error.message || "Error uploading attachments");
    } finally {
      setAttachmentLoader(false);
    }
  };

  return (
    <CustomModal
      showModal={show}
      handleClose={() => onHide()}
      size="lg"
      handleSubmit={handleSubmit}
      submitTitle="Save"
      title="Attachments"
    >
      <div {...getRootProps()} className={styles?.drop_down_Container}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>Drag & drop some files here, or click to select files</p>
          </>
        )}

        <div className={styles.thumbnail_grid}>
          {files &&
            files?.length > 0 &&
            files?.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item?.name && (
                    <div
                      className={styles.thumbnail_image}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span
                        className={styles?.cross_btns}
                        onClick={() => handleDelete(index)}
                      >
                        <CrossImageSvg className={styles.cros_icn} />
                      </span>
                      {isDummyImage(item) ? (
                        <Image
                          src={dummyImage}
                          alt="No_Uploaded_Image"
                          width={200}
                          height={200}
                          placeholder="blur"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(item)}
                          alt="thumbnail_image"
                        />
                      )}
                      <div className={styles.thumbnail_dtl}>
                        <span>{formatSize(item?.size)}</span>
                        <h4>{item?.name}</h4>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
        </div>
      </div>

      <div className={styles.footer}>
        Select file in jpeg,jpg,png,pdf,xlsx,csv,doc,docx,txt,xls formats (Max
        file size 4MB)
      </div>
    </CustomModal>
  );
};

export default AttachmentModal;
