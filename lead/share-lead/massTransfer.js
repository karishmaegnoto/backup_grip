import ModalButton from "@/components/shared/buttons/modalButton";
import CustomModal from "@/components/shared/modal/customizedModal";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/modal.module.scss";
import LeadContext from "@/hooks/context/LeadContext";
import ErrorMessage from "@/components/shared/FormFields/ErrorMessage";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import useToastContext from "@/hooks/useToastContext";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import { massTransferMultiLeadApi } from "@/hooks/ApisContainer/Lead";

const MassTransferComp = ({
  show,
  onHide,
  fetchLeadList,
  checkboxValue,
  setCheckboxValue,
}) => {
  const notification = useToastContext();

  let { leadOwnerDetails } = useContext(LeadContext);
  // ALL STATE
  const [shareValues, setShareValues] = useState({
    leadOwner: [],
  });
  const [shareError, setShareError] = useState({
    leadOwnerError: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (field) => (value) => {
    setShareValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (shareValues?.leadOwner?.length > 0) {
      formValidation();
    }
  }, [shareValues]);

  const formValidation = () => {
    let leadOwnerErr = "";

    if (shareValues?.leadOwner?.length === 0) {
      leadOwnerErr = ValidationMessage?.LEAD_OWNER_REQUIRED;
    }

    if (leadOwnerErr) {
      setShareError({
        leadOwnerError: leadOwnerErr,
      });
      return false;
    } else {
      setShareError({ leadOwnerError: "" });
      return true;
    }
  };

  const handleShare = () => {
    const isValid = formValidation();
    if (isValid) {
      const requestPayload = {
        leadIds: checkboxValue,
        leadOwner: shareValues?.leadOwner?.id,
      };

      massTransferMultiLeadApi(
        requestPayload,
        notification,
        (loading, error) => {
          setLoader(loading);
          if (!error) {
            onHide();
            setCheckboxValue([]);
            fetchLeadList();
          }
        }
      );
    }
  };

  return (
    <CustomModal
      showModal={show}
      handleClose={() => onHide()}
      size="m"
      footer={true}
      header={true}
    >
      <div className={`${styles.headerSection} ${styles.share_model_header}`}>
        <div className={styles.share_lead_head}>
          <svg
            id="migrate--alt"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              id="Path_38026"
              data-name="Path 38026"
              d="M18.25,4h-15A1.25,1.25,0,0,0,2,5.25v12.5A1.25,1.25,0,0,0,3.25,19h15a1.25,1.25,0,0,0,1.25-1.25V5.25A1.25,1.25,0,0,0,18.25,4Zm0,13.75h-10V14H7v3.75H3.25V12.125H13.357l-2.241,2.241L12,15.25l3.75-3.75L12,7.75l-.884.884,2.241,2.241H3.25V5.25H7V9H8.25V5.25h10Z"
              transform="translate(-0.75 -1.5)"
              fill="#131416"
            ></path>
            <rect
              id="_Transparent_Rectangle_"
              data-name="<Transparent Rectangle>"
              width="20"
              height="20"
              fill="none"
            ></rect>
          </svg>
        </div>
        <h4 className={styles.modalTitle}>Mass Transfer</h4>
        <p className={styles.modalDescription}>
          Select the lead owner to mass transfer.
        </p>

        <div className={`${ProfileStyle.form_floating} mt-4`}>
          <SingleSelect
            options={leadOwnerDetails}
            label={"Lead Owner"}
            onSelectionChange={handleChange("leadOwner")}
            value={shareValues.leadOwner}
          />
          {shareError?.leadOwnerError && (
            <ErrorMessage message={shareError?.leadOwnerError} />
          )}
        </div>
      </div>

      <div className={styles.buttonSection}>
        <ModalButton
          buttonType="cancel"
          buttonTitle="Cancel"
          type="button"
          className="custom_cancel_btn"
          onClick={() => onHide()}
        />
        <ModalButton
          buttonType="submit"
          buttonTitle="Mass Transfer"
          type="button"
          onClick={() => {
            handleShare();
          }}
          loader={loader}
          disabled={loader}
          className={
            loader
              ? "pointer-not-allowed ml-2 custom_submit_btn"
              : "ml-2 custom_submit_btn"
          }
        />
      </div>
    </CustomModal>
  );
};

export default MassTransferComp;
