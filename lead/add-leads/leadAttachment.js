/*eslint-disable @next/next/no-img-element*/
import React, { useState } from "react";
import styles from "@/components/lead/add-leads/addLead-comp.module.scss";
import stylesComp from "@/components/lead/lead-comp.module.scss";
import AppButtons from "@/components/shared/buttons/appButtons";
import AttachmentModal from "./modal/attachmentModal";
import SkeletonButton from "@/components/shared/skeleton/buttonSkeleton";

const LeadAttachment = ({
  attachedFiles,
  setAttachedFiles,
  toggleDeleteAttachmentModal,
  moduleType,
  setTriggerEditEvent,
  triggerEditEvent,
  handleAddTimeline,
  setAttachmentType,
  attachmentLoader,
  setAttachmentLoader,
  leadId,
}) => {
  // ALL STATE
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  const toggleAttachmentModal = () => {
    setShowAttachmentModal(!showAttachmentModal);
  };

  const handleDelete = (index, file) => {
    if (file.name) {
      setAttachedFiles((prevFiles) =>
        prevFiles.filter((_, fileIndex) => fileIndex !== index)
      );
    }

    if (moduleType && !file.name) {
      toggleDeleteAttachmentModal(file);
    }
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

  const filteredAttachedFiles =
    attachedFiles?.filter(
      (file) => typeof file !== "string" || !file.includes("no_image.png")
    ) || [];

  return (
    <div className={styles?.attachment_container}>
      <div className={styles.lead_attachment_heading}>
        <h2>Attachments</h2>
        {filteredAttachedFiles.length > 0 && (
          <AppButtons
            buttonType="black"
            buttonSvg="/svg/attachment.svg"
            buttonSvgAlt="No_Attachment_Image"
            buttonTitle="Add new"
            type="button"
            onClick={() => toggleAttachmentModal()}
          />
        )}
      </div>
      {attachmentLoader ? (
        <div className={`${stylesComp.fileList} mb-2`}>
          {Array(3)
            .fill("")
            .map((_, ind) => {
              return (
                <SkeletonButton
                  width={100}
                  height={35}
                  percent={true}
                  key={ind}
                />
              );
            })}
        </div>
      ) : (
        <>
          {filteredAttachedFiles.length > 0 ? (
            <div className={stylesComp.fileList}>
              {filteredAttachedFiles.map((file, index) => {
                const fileName = !file?.name ? file?.split("/")?.pop() : null;
                const fileExtension = fileName
                  ? fileName.split(".").pop()
                  : null;
                return (
                  <div key={index} className={stylesComp.fileItem}>
                    <span className={stylesComp.fileIcon}>
                      {isDummyImage(file) ? <span>📄</span> : <span> 🖼️</span>}
                    </span>
                    <span className={stylesComp.fileName}>
                      {file?.name
                        ? file.name
                        : `dummy-file${index + 1}.${fileExtension}`}
                    </span>
                    <button
                      className={stylesComp.deleteButton}
                      type="button"
                      onClick={() => handleDelete(index, file)}
                    >
                      <span className={stylesComp.delete_icons_rep}>
                        <svg
                          id="trash-can"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <rect
                            id="Rectangle_6526"
                            data-name="Rectangle 6526"
                            width="1.25"
                            height="7.5"
                            transform="translate(7.5 7.5)"
                            fill="#131416"
                          ></rect>
                          <rect
                            id="Rectangle_6527"
                            data-name="Rectangle 6527"
                            width="1.25"
                            height="7.5"
                            transform="translate(11.25 7.5)"
                            fill="#131416"
                          ></rect>
                          <path
                            id="Path_37888"
                            data-name="Path 37888"
                            d="M4,6V7.25H5.25v12.5A1.25,1.25,0,0,0,6.5,21h10a1.25,1.25,0,0,0,1.25-1.25V7.25H19V6ZM6.5,19.75V7.25h10v12.5Z"
                            transform="translate(-1.5 -2.25)"
                            fill="#131416"
                          ></path>
                          <rect
                            id="Rectangle_6528"
                            data-name="Rectangle 6528"
                            width="5"
                            height="1.25"
                            transform="translate(7.5 1.25)"
                            fill="#131416"
                          ></rect>
                          <rect
                            id="_Transparent_Rectangle_"
                            data-name="<Transparent Rectangle>"
                            width="20"
                            height="20"
                            fill="none"
                          ></rect>
                        </svg>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.file_input_div}>
              <AppButtons
                buttonType="black"
                buttonSvg="/svg/attachment.svg"
                buttonSvgAlt="No_Attachment_Image"
                buttonTitle="Attachment"
                type="button"
                onClick={() => toggleAttachmentModal()}
              />
            </div>
          )}
        </>
      )}
      {showAttachmentModal && (
        <AttachmentModal
          show={showAttachmentModal}
          onHide={toggleAttachmentModal}
          attachedFiles={filteredAttachedFiles}
          setAttachedFiles={setAttachedFiles}
          setTriggerEditEvent={setTriggerEditEvent}
          triggerEditEvent={triggerEditEvent}
          moduleType={moduleType}
          handleAddTimeline={handleAddTimeline}
          setAttachmentType={setAttachmentType}
          setAttachmentLoader={setAttachmentLoader}
          leadId={leadId}
        />
      )}
    </div>
  );
};

export default LeadAttachment;
