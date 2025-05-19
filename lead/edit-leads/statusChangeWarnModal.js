import ModalButton from "@/components/shared/buttons/modalButton";
import CustomModal from "@/components/shared/modal/customizedModal";
import React from "react";
import styles from "@/components/manufacturer/modal.module.scss";

const StatusChangeWarnModal = ({
  show,
  onHide,
  editLeadData,
  setAddValues,
  setActiveInternalNotes,
  internalNotesInputRef,
}) => {
  const handleCancel = () => {
    const leadSource = {
      id: editLeadData?.leadSource?._id,
      value: editLeadData?.leadSource?._id,
      title: editLeadData?.leadSource?.name,
    };
    setAddValues((prev) => ({ ...prev, ["leadStatus"]: leadSource }));
    setActiveInternalNotes(false);
    onHide();
  };

  const handleSubmit = () => {
    internalNotesInputRef?.current?.focus();
    setActiveInternalNotes(true);
    onHide();
  };

  return (
    <CustomModal
      showModal={show}
      handleClose={() => onHide()}
      size="m"
      footer={true}
      header={true}
    >
      <div className={styles.headerSection}>
        <h4 className={styles.modalTitle}>Change lead status</h4>
        <p className={styles.modalDescription}>
          Please fill in the internal notes before changing the lead status.
        </p>
      </div>

      <div className={styles.buttonSection}>
        <ModalButton
          buttonType="cancel"
          buttonTitle="Cancel"
          className="custom_cancel_btn"
          type="button"
          onClick={() => handleCancel()}
        />

        <ModalButton
          buttonType="submit"
          buttonTitle="Submit"
          type="button"
          onClick={() => handleSubmit()}
          className="custom_submit_btn"
        />
      </div>
    </CustomModal>
  );
};

export default StatusChangeWarnModal;
