import ModalButton from "@/components/shared/buttons/modalButton";
import CustomModal from "@/components/shared/modal/customizedModal";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/modal.module.scss";
import LeadContext from "@/hooks/context/LeadContext";
import MultiSelect from "@/components/shared/FormFields/multiSelect";
import ErrorMessage from "@/components/shared/FormFields/ErrorMessage";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import useToastContext from "@/hooks/useToastContext";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import {
  getLeadApi,
  shareLeadWithLeadOwnersApi,
} from "@/hooks/ApisContainer/Lead";

const SharedLead = ({
  show,
  onHide,
  activeShareLead,
  fetchLeadList,
  type,
  checkboxValue,
  setCheckboxValue,
}) => {
  const notification = useToastContext();

  let { leadOwnerDetails } = useContext(LeadContext);

  // ALL STATE
  const [shareValues, setShareValues] = useState({
    leadOwner: [],
    leadId: [],
  });
  const [shareError, setShareError] = useState({
    leadOwnerError: "",
    leadIdError: "",
  });
  const [loader, setLoader] = useState(false);
  const [leadListData, setLeadListData] = useState([]);
  const [allLeadLoader, setAllLeadLoader] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);

  useEffect(() => {
    if (activeShareLead) {
      const shareWith = activeShareLead?.sharedWith?.map((el) => ({
        id: el?.id,
        value: el?.id,
        title: el?.name,
      }));

      setShareValues((prevOptions) => ({
        ...prevOptions,
        leadOwner: shareWith || [],
      }));
    }
  }, []);

  const handleChange = (field) => (value) => {
    setShareValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShare = () => {
    const isValid = formValidation();
    if (isValid) {
      // const resultArray = [];
      const shareWithLeadOwner = shareValues?.leadOwner?.map((el) => {
        return { id: el?.id, name: el?.title };
      });
      const requestPayload = {
        leadId: activeShareLead?._id,
        shareWithLeadOwner: shareWithLeadOwner,
      };

      shareLeadWithLeadOwnersApi(
        requestPayload,
        notification,
        "single",
        (loading, error) => {
          setLoader(loading);
          if (!error) {
            onHide();
            fetchLeadList();
          }
        }
      );
    }
  };

  useEffect(() => {
    if (type == "all") {
      fetchLeadListAllData();
    }
  }, []);

  useEffect(() => {
    if (shareValues?.leadOwner?.length > 0) {
      formValidation();
    }
  }, [shareValues]);

  const formValidation = () => {
    let leadOwnerErr = "";
    let leadIdError = "";

    if (shareValues?.leadOwner?.length === 0) {
      leadOwnerErr = ValidationMessage?.LEAD_OWNER_REQUIRED;
    }
    if (type == "all") {
      if (shareValues?.leadId?.length === 0) {
        leadIdError = ValidationMessage?.Lead_Name_REQUIRED;
      }
    }

    if (leadOwnerErr || leadIdError) {
      setShareError({
        leadOwnerError: leadOwnerErr,
        leadIdError: type === "all" ? leadIdError : "",
      });
      return false;
    } else {
      setShareError({ leadOwnerError: "", leadIdError: "" });
      return true;
    }
  };

  const fetchLeadListAllData = (data) => {
    getLeadApi({}, notification, (loading, error, res) => {
      setAllLeadLoader(loading);
      if (!error && res?.docs?.length > 0) {
        // const selected = [...checkboxValue];
        const optionsArr = res?.docs.map((el) => {
          return {
            id: el?._id,
            value: el?._id,
            title: `${el?.firstName} ${el?.lastName}`,
          };
        });
        // setSelectedLeads(selected);
        setLeadListData(optionsArr ? optionsArr : []);
      }
    });
  };

  useEffect(() => {
    if (type == "all" && leadListData?.length > 0) {
      handleCheckedValues();
    }
  }, [leadListData]);

  const handleCheckedValues = () => {
    const selectedChecked = [];

    leadListData?.map((item) => {
      if (checkboxValue.includes(item?.id)) {
        selectedChecked.push(item);
      }
    });
    setShareValues((prev) => ({ ...prev, leadId: selectedChecked }));
  };

  const handleSubmitShareALL = () => {
    const isValid = formValidation();
    if (isValid) {
      const shareWithLeadOwner = shareValues?.leadOwner?.map((el) => {
        return { id: el?.id, name: el?.title };
      });
      const leadIdsDate = shareValues?.leadId?.map((el) => el?.id);
      const requestPayload = {
        leadIds: leadIdsDate,
        shareWithLeadOwner: shareWithLeadOwner,
      };
      shareLeadWithLeadOwnersApi(
        requestPayload,
        notification,
        "all",
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
            id="share"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              id="Path_38019"
              data-name="Path 38019"
              d="M15.116,13.238a3.125,3.125,0,0,0-2.431,1.181L8.116,11.563a2.788,2.788,0,0,0,0-1.65l4.569-2.856a3.125,3.125,0,1,0-.694-1.944,2.994,2.994,0,0,0,.125.825L7.547,8.794a3.125,3.125,0,1,0,0,3.888l4.569,2.856a2.994,2.994,0,0,0-.125.825,3.125,3.125,0,1,0,3.125-3.125Zm0-10a1.875,1.875,0,1,1-1.875,1.875A1.875,1.875,0,0,1,15.116,3.238Zm-10,9.375a1.875,1.875,0,1,1,1.875-1.875,1.875,1.875,0,0,1-1.875,1.875Zm10,5.625a1.875,1.875,0,1,1,1.875-1.875,1.875,1.875,0,0,1-1.875,1.875Z"
              transform="translate(-0.74 -0.738)"
              fill="#131416"
            ></path>
            <rect
              id="_Transparent_Rectangle_"
              data-name="<Transparent Rectangle>"
              width="20"
              height="20"
              transform="translate(0 20) rotate(-90)"
              fill="none"
            ></rect>
          </svg>
        </div>
        <h4 className={styles.modalTitle}>Share Lead</h4>
        <p className={styles.modalDescription}>
          Select the lead owners you want to share for
          {type == "all" ? " these" : " this"} lead with.
        </p>
        <p className={styles.modalDescription_sub}>
          (You can select multiple lead owner).
        </p>
        {type == "all" && (
          <div className={`${ProfileStyle.form_floating} ${styles.lead_ids}`}>
            <MultiSelect
              options={leadListData}
              label={"Lead Name"}
              onSelectionChange={handleChange("leadIds")}
              value={shareValues.leadId}
              loader={allLeadLoader}
            />
            {shareError?.leadIdError && (
              <ErrorMessage message={shareError?.leadIdError} />
            )}
          </div>
        )}
        <div className={ProfileStyle.form_floating}>
          <MultiSelect
            options={leadOwnerDetails}
            label={"Lead Owner"}
            onSelectionChange={handleChange("leadOwner")}
            value={shareValues.leadOwner}
            maxLimit={3}
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
          buttonTitle="Share"
          type="button"
          onClick={() => {
            if (type == "all") {
              handleSubmitShareALL();
            } else {
              handleShare();
            }
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

export default SharedLead;
