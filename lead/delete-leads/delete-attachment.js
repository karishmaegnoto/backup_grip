import ModalButton from "@/components/shared/buttons/modalButton";
import CustomModal from "@/components/shared/modal/customizedModal";
import React from "react";
import styles from "@/components/manufacturer/modal.module.scss";

const DeleteAttachment = ({
  show,
  onHide,
  handleDeleteAttachment,
  attachmentDeleteLoader,
}) => {
  return (
    <CustomModal
      showModal={show}
      handleClose={() => onHide()}
      size="m"
      footer={true}
      header={true}
    >
      <div className={styles.headerSection}>
        <div className={styles.share_lead_head}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.5 1.25H12.5V2.5H7.5V1.25ZM2.5 3.75V5H3.75V17.5C3.75 17.8315 3.8817 18.1495 4.11612 18.3839C4.35054 18.6183 4.66848 18.75 5 18.75H15C15.3315 18.75 15.6495 18.6183 15.8839 18.3839C16.1183 18.1495 16.25 17.8315 16.25 17.5V5H17.5V3.75H2.5ZM5 17.5V5H15V17.5H5ZM7.5 7.5H8.75V15H7.5V7.5ZM11.25 7.5H12.5V15H11.25V7.5Z"
              fill="#12182B"
            />
          </svg>
        </div>
        <h1 className={styles.modalTitle}>Delete This File</h1>
        <p className={styles.modalDescription}>
          Are you sure you want to delete this file.
        </p>
      </div>

      <div className={styles.buttonSection}>
        <ModalButton
          buttonType="cancel"
          buttonTitle="Cancel"
          type="button"
          onClick={() => onHide()}
        />

        <ModalButton
          buttonType="submit"
          buttonTitle="Delete"
          type="button"
          onClick={() => handleDeleteAttachment()}
          loader={attachmentDeleteLoader}
          disabled={attachmentDeleteLoader}
          className={
            attachmentDeleteLoader ? "pointer-not-allowed ml-2" : "ml-2"
          }
        />
      </div>
    </CustomModal>
  );
};

export default DeleteAttachment;
