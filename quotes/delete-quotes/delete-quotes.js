import ModalButton from "@/components/shared/buttons/modalButton";
import CustomModal from "@/components/shared/modal/customizedModal";
import React from "react";
import styles from "@/components/manufacturer/modal.module.scss";
import DeleteSvg from "@/assets/svgs/deleteSvg";

const DeleteQuotes = ({
  onHide,
  visibleDeleteModal,
  deleteLoader,
  handleDelete,
}) => {
  return (
    <CustomModal
      showModal={visibleDeleteModal}
      handleClose={() => onHide()}
      size="m"
      footer={true}
      header={true}
    >
      <div className={styles.headerSection}>
        <div className={styles.share_lead_head}>
          <DeleteSvg />
        </div>
        <h4 className={styles.modalTitle}>Delete This Quote</h4>
        <p className={styles.modalDescription}>
          Are you sure you want to delete this Quote.
        </p>
      </div>

      <div className={styles.buttonSection}>
        <ModalButton
          buttonType="cancel"
          buttonTitle="Cancel"
          className="custom_cancel_btn"
          type="button"
          onClick={() => onHide()}
        />

        <ModalButton
          buttonType="submit"
          buttonTitle="Delete"
          type="button"
          onClick={() => handleDelete()}
          loader={deleteLoader}
          disabled={deleteLoader}
          className={
            deleteLoader
              ? "pointer-not-allowed ml-2 custom_submit_btn custom_submit_btn"
              : "ml-2 custom_submit_btn"
          }
        />
      </div>
    </CustomModal>
  );
};

export default DeleteQuotes;
