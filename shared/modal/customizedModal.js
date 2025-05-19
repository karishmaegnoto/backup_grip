import { Modal, Button } from "react-bootstrap";
import ModalButton from "../buttons/modalButton";
import { X } from "lucide-react";

const CustomModal = ({
  showModal,
  handleClose,
  handleSubmit,
  loader,
  submitTitle = "Save",
  title,
  children,
  footer,
  size = "sm",
  header,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => false}
      size={size}
      centered
      className="custom_modal"
    >
      {header ? (
        header
      ) : (
        <Modal.Header>
          <span className="flex justify-between w-full item-center">
            <Modal.Title>{title}</Modal.Title>
            <button type="button" onClick={() => handleClose()}>
              <X color="lightGray" size={22} />
            </button>
          </span>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
      {footer ? (
        footer
      ) : (
        <Modal.Footer>
          <ModalButton
            buttonType="cancel"
            buttonTitle="Cancel"
            type="button"
            className="custom_cancel_btn"
            onClick={() => handleClose()}
          />

          <ModalButton
            buttonType="submit"
            buttonTitle={submitTitle}
            type="button"
            onClick={() => handleSubmit()}
            loader={loader}
            disabled={loader}
            className={
              loader
                ? "pointer-not-allowed ml-2 custom_submit_btn"
                : "ml-2 custom_submit_btn"
            }
          />
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
