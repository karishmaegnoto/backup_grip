"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import { constantTypes, defaultBarnOptions } from "@/utils/constants/constant";
import useToastContext from "@/hooks/useToastContext";
import { useRouter } from "next/navigation";
import LeadContext from "@/hooks/context/LeadContext";
import AuthContext from "@/hooks/context/AuthContext";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { useForm } from "react-hook-form";
import { addLeadApi, getStateByZipApi } from "@/hooks/ApisContainer/Lead";
import LeadDetails from "@/components/lead/add-leads/LeadDetails";
import AddressInformation from "@/components/lead/add-leads/AddressInformations";
import ProductInformation from "@/components/lead/add-leads/ProductInformation";
import BuildingInformation from "@/components/lead/add-leads/building/buildingInformation";
import { Eye, EyeOff } from "lucide-react";
import {
  addLeadRequestBarnPayload,
  addLeadRequestGaragePayload,
} from "@/helper/helper";
import Loader from "@/components/shared/Loader/Loader";
import LeadAttachment from "@/components/lead/add-leads/leadAttachment";
import { getLeadDataByIdApi } from "@/hooks/ApisContainer/Lead";

const AddLeadNew = () => {
  // ----------------Added new code for scrolling according to the section-------------------///

  const attachmentsSectionRef = React.useRef(null);

  const scrollToAttachments = () => {
    if (attachmentsSectionRef.current) {
      attachmentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const notification = useToastContext();
  const router = useRouter();
  let { organizationName, user } = useContext(AuthContext);
  let {
    leadAllList,
    allLeadDataLoader,
    leadSourceDetails,
    leadStatusDetails,
    leadManufacturerDetails,
    fetchUnreadLeadList,
    leadOwnerDetails,
  } = useContext(LeadContext);

  //****HOOK FORM******/
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    setError,
  } = useForm();

  const emailValue = watch("email");
  const mobileValue = watch("mobile");
  const buildingTypeValue = watch("biBuildingType");
  const biBarnStyleValue = watch("biBarnStyle");

  // ALL STATE
  const [addValues, setAddValues] = useState({
    leadOwner: "",
    leadAssistant: [],
    leadStatus: "",
    leadSource: "",
    leadManufacturer: "",
    dateAndTime: "",
  });
  const [addError, setAddError] = useState({
    leadOwnerError: "",
    leadAssistantError: "",
  });
  const [phone, setPhone] = useState("");
  const [visibleEmailPhoneError, setVisibleEmailPhoneError] = useState(false);
  const [stateByZipLoader, setStateByZipLoader] = useState(false);
  const [visibleAddress, setVisibleAddress] = useState(true);
  const [visibleProductInfo, setVisibleProductInfo] = useState(true);
  const [addLeadLoader, setAddLeadLoader] = useState(false);
  const [optionsArr, setOptionsArr] = useState({
    garageDoors: [
      {
        id: 1,
        sideEnd: "Left Side",
        size: "6x6",
        qty: 0,
        doorColor: "",
        certification: true,
        dutch: false,
        chainHoist: false,
        custom: false,
        notes: "",
      },
    ],
    garageWalkIns: [
      {
        id: 1,
        walkInDoor: "Right Side",
        size: "36x80",
        qty: 0,
        color: "With Window",
        notes: "",
        custom: false,
      },
    ],
    garageWindowOption: [
      {
        id: 1,
        window: "Right Side",
        size: "30x36",
        qty: 0,
        custom: false,
        notes: "",
      },
    ],
  });
  const [optionsBarnArr, setOptionsBarnArr] = useState(defaultBarnOptions);
  const [attachedFiles, setAttachedFiles] = useState([]);

  // Log attached files whenever they change
  useEffect(() => {
    console.log("Attached files updated:", attachedFiles);
  }, [attachedFiles]);

  const [visibleBuilding, setVisibleBuilding] = useState(true);
  const [show3DRefInput, setShow3DRefInput] = useState(false);

  // Add triggerEditEvent state to listen for attachment modal save events
  const [triggerEditEvent, setTriggerEditEvent] = useState(false);

  // Effect to update attachedFiles when triggerEditEvent changes
  useEffect(() => {
    // Optionally scroll to attachments section after update
    if (attachmentsSectionRef.current) {
      attachmentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [triggerEditEvent]);

  // useEffect(() => {
  //   if (
  //     leadSourceDetails?.length > 0 &&
  //     leadStatusDetails?.length > 0 &&
  //     leadManufacturerDetails?.length > 0
  //   ) {
  //     const leadSource =
  //       leadSourceDetails?.find((el) => el?.title === "Zendesk Chat") || "";
  //     const leadStatus =
  //       leadStatusDetails?.find((el) => el?.title === "New Lead") || "";
  //     const leadManufacturer =
  //       leadManufacturerDetails?.find(
  //         (el) => el?.title === "Carolina Carports, INC"
  //       ) || "";

  //     setAddValues((prevValues) => ({
  //       ...prevValues,
  //       leadStatus,
  //       leadSource,
  //       leadManufacturer,
  //     }));
  //   }
  // }, [leadSourceDetails, leadStatusDetails, leadManufacturerDetails]);

  useEffect(() => {
    if (
      leadSourceDetails?.length > 0 &&
      leadStatusDetails?.length > 0 &&
      leadManufacturerDetails?.length > 0
    ) {
      const leadSource =
        leadSourceDetails?.find(
          (el) => el?.title === "Zendesk Chat" || el?.title === "3D Estimator"
        ) || "";
      const leadStatus =
        leadStatusDetails?.find((el) => el?.title === "New Lead") || "";
      const leadManufacturer =
        leadManufacturerDetails?.find(
          (el) => el?.title === "Carolina Carports, INC"
        ) || "";

      setAddValues((prevValues) => ({
        ...prevValues,
        leadStatus,
        leadSource,
        leadManufacturer,
      }));

      setShow3DRefInput(leadSource?.title === "3D Estimator");
    }
  }, [leadSourceDetails, leadStatusDetails, leadManufacturerDetails]);

  // -------------Added useEffect to set default lead owner--------------
  useEffect(() => {
    if (
      user &&
      user._id &&
      leadOwnerDetails?.length &&
      leadSourceDetails &&
      leadStatusDetails &&
      leadManufacturerDetails
    ) {
      const matchingLeadOwner = leadOwnerDetails.find(
        (owner) =>
          String(owner.value) === String(user._id) ||
          String(owner.id) === String(user._id) ||
          owner.email === user.email
      );

      const defaultOwner = matchingLeadOwner || {
        value: user._id,
        label: user.userName || `${user.firstName} ${user.lastName}`,
        email: user.email,
      };

      setAddValues((prev) => ({
        ...prev,
        leadOwner: defaultOwner,
      }));
      setValue("leadOwner", defaultOwner);
    }
  }, [
    user,
    leadOwnerDetails,
    leadSourceDetails,
    leadStatusDetails,
    leadManufacturerDetails,
  ]);

  useEffect(() => {
    leadAllList(notification);
    setValue("biBuildingType", "garage");
    setValue("biBarnStyle", "carolinaBarn");
  }, []);

  // useEffect(() => {
  //   if (emailValue) {
  //     clearErrors("mobile");
  //   } else if (mobileValue) {
  //     clearErrors("email");
  //   }
  //   if (visibleEmailPhoneError) {
  //     if (!mobileValue && !emailValue) {
  //       setError("email", {
  //         type: "manual",
  //         message: ValidationMessage?.EMAIL_REQUIRED,
  //       });
  //       setError("mobile", {
  //         type: "manual",
  //         message: ValidationMessage?.MOBILE_NUMBER_REQUIRED,
  //       });
  //     }
  //     formValidation();
  //   }
  // }, [emailValue, mobileValue, addValues]);

  useEffect(() => {
    const hasEmail = !!emailValue?.trim();
    const hasMobile = !!mobileValue?.trim();

    if (hasEmail || hasMobile) {
      clearErrors(["email", "mobile"]);
    } else if (visibleEmailPhoneError) {
      setError("email", {
        type: "manual",
        message: ValidationMessage?.EMAIL_REQUIRED,
      });
      setError("mobile", {
        type: "manual",
        message: ValidationMessage?.MOBILE_NUMBER_REQUIRED,
      });
    }

    if (visibleEmailPhoneError) {
      formValidation();
    }
  }, [emailValue, mobileValue]);

  const handleChange = (field) => (value) => {
    setAddValues((prev) => ({ ...prev, [field]: value }));
  };

  // Add useEffect to validate and clear errors immediately on leadOwner or leadAssistant change
  useEffect(() => {
    formValidation();
  }, [addValues.leadOwner, addValues.leadAssistant]);

  const handleCancel = () => {
    router.push(`/${organizationName}/leads`);
  };

  const onSubmit = (data) => {
    setAddLeadLoader(true);

    const isValid = formValidation();

    if (isValid) {
      setAddLeadLoader(false);
      let formData = {};

      if (buildingTypeValue === "garage" || buildingTypeValue === "carport") {
        formData = addLeadRequestGaragePayload(
          data,
          addValues,
          optionsArr,
          attachedFiles
        );
      } else if (buildingTypeValue === "barn") {
        formData = addLeadRequestBarnPayload(
          data,
          addValues,
          optionsBarnArr,
          attachedFiles
        );
      }

      // addLeadApi(formData, notification, (loading, error) => {
      //   setAddLeadLoader(loading);
      //   if (!error) {
      //     fetchUnreadLeadList(notification);
      //     router.push(`/${organizationName}/leads`);
      //   }
      // });

      //--------------On submit, open the lead on edit-lead page using getLeadDataByIdApi----------------//
      addLeadApi(formData, notification, (loading, error, newLeadId) => {
        setAddLeadLoader(true);

        if (!error && newLeadId) {
          fetchUnreadLeadList(notification);
          // After adding lead, fetch lead data by ID and navigate to edit page
          getLeadDataByIdApi(newLeadId, notification, (error2) => {
            console.log("getLeadDataByIdApi newLeadId:", newLeadId);
            if (!error2) {
              router.push(`/${organizationName}/leads/edit-lead/${newLeadId}`);
            }
            // else {
            //   // fallback navigation if fetching lead data fails
            //   router.push(`/${organizationName}/leads`);
            // }
          });
        } else {
          setAddLeadLoader(false);
        }
      });
    }
  };

  //---Scroll to the first error field when an error occurs
  const onError = (errors) => {
    const firstFieldWithError = Object.keys(errors)[0];
    const errorElement = document.querySelector(
      `[name="${firstFieldWithError}"]`
    );

    if (errorElement?.scrollIntoView) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      errorElement.focus();
    }
  };

  const formValidation = () => {
    let leadOwnerErr = "";
    let leadAssistantErr = "";

    if (addValues?.leadOwner && addValues?.leadAssistant?.length > 0) {
      // Clear the errors if both fields are filled
      setAddError({
        leadOwnerError: "",
        leadAssistantError: "",
      });
      clearErrors(["leadOwner", "leadAssistant"]);
      return true;
    } else {
      if (!addValues?.leadOwner) {
        leadOwnerErr = ValidationMessage?.LEAD_OWNER_REQUIRED;
      }
      if (!addValues?.leadAssistant || addValues.leadAssistant.length === 0) {
        leadAssistantErr = ValidationMessage?.LEAD_ASSISTANT_REQUIRED;
      }
      setAddError({
        leadOwnerError: leadOwnerErr,
        leadAssistantError: leadAssistantErr,
      });
      return false;
    }
  };

  const handleChangeDate = (dates) => {
    setAddValues((prev) => ({ ...prev, dateAndTime: dates }));
  };

  const getStateByZipCode = () => {
    const requestPayload = { zipCode: watch("zipcode") };

    getStateByZipApi(requestPayload, notification, (loading, error, res) => {
      setStateByZipLoader(loading);
      if (!error) {
        if (res) {
          setValue("state", res?.name);
          setValue("biInstallationZipCode", watch("zipcode"));
        }
      }
    });
  };

  return (
    <div className={addLeadStyle.lead_main_div}>
      <form
        action=""
        className={addLeadStyle.lead_main_form}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className={addLeadStyle.common_div_top}>
          <button
            className={addLeadStyle.cancel_button}
            type="button"
            onClick={() => handleCancel()}
          >
            <img src="/svg/cancel.svg" alt="No_Cancel_Image" />
            <span>Cancel</span>
          </button>

          <button
            className={addLeadStyle.save_button}
            type="submit"
            onClick={() => {
              setVisibleAddress(true);
              setVisibleProductInfo(true);
              setVisibleEmailPhoneError(true);
              setAttachedFiles(attachedFiles);
              formValidation();
            }}
            disabled={stateByZipLoader}
            style={
              addLeadLoader || stateByZipLoader
                ? { cursor: "not-allowed" }
                : { cursor: "pointer" }
            }
          >
            {addLeadLoader ? (
              <Loader height="20px" width="20px" newLoader={true} />
            ) : (
              <img src="/svg/save.svg" alt="No_Save_Image" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className={addLeadStyle.lead_container}>
          <div className={addLeadStyle.lead_navigation}>
            <ul>
              {constantTypes?.leadSidebarItems
                .filter(
                  (el) =>
                    ![
                      "all_quotes",
                      "all_contracts",
                      "task_activities",
                      "all_emails",
                    ].includes(el.value)
                )
                .map((el, index) => {
                  return (
                    <li
                      className={
                        activeSection === index ? addLeadStyle.active : ""
                      }
                      key={el?.value}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const section = sectionRefs.current[index];
                          if (section) {
                            window.scrollTo({
                              top: section.offsetTop - 180,
                              behavior: "smooth",
                            });
                          }
                        }}
                        className={addLeadStyle.buttonReset}
                        aria-current={
                          activeSection === index ? "true" : undefined
                        }
                      >
                        {el?.title}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={addLeadStyle.Lead_field}>
            <div className={addLeadStyle.lead_section_div}>
              {/* <div className={addLeadStyle.lead_heading}> */}
              <div
                className={addLeadStyle.lead_heading}
                ref={(el) => (sectionRefs.current[0] = el)}
              >
                <h2>Lead Details</h2>
              </div>
              <LeadDetails
                handleChange={handleChange}
                addError={addError}
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                setPhone={setPhone}
                phone={phone}
                emailValue={emailValue}
                mobileValue={mobileValue}
                allLeadDataLoader={allLeadDataLoader}
                addValues={addValues}
                dateAndTimeValue={addValues?.dateAndTime}
                handleChangeDate={handleChangeDate}
                show3DRefInput={addValues?.leadSource?.title === "3D Estimator"}
              />

              {/* <div
                className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
              > */}

              <div
                className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
                ref={(el) => (sectionRefs.current[1] = el)}
              >
                <h2>Address Information</h2>
                {visibleAddress ? (
                  <EyeOff
                    onClick={() => setVisibleAddress(!visibleAddress)}
                    color="lightGray"
                    className="pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setVisibleAddress(!visibleAddress)}
                    color="lightGray"
                    className="pointer"
                  />
                )}
              </div>
              {visibleAddress && (
                <AddressInformation
                  register={register}
                  errors={errors}
                  getStateByZipCode={getStateByZipCode}
                  stateByZipLoader={stateByZipLoader}
                  biBarnStyleValue={biBarnStyleValue}
                />
              )}

              {/* <div
                className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
              > */}
              <div
                className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
                ref={(el) => (sectionRefs.current[2] = el)}
              >
                <h2>Product Information</h2>
                {visibleProductInfo ? (
                  <EyeOff
                    onClick={() => setVisibleProductInfo(!visibleProductInfo)}
                    color="lightGray"
                    className="pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setVisibleProductInfo(!visibleProductInfo)}
                    color="lightGray"
                    className="pointer"
                  />
                )}
              </div>
              {visibleProductInfo && (
                <ProductInformation register={register} maxLength={0} />
              )}

              {/* <div
                className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
              > */}
              <div
                className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
                ref={(el) => (sectionRefs.current[3] = el)}
              >
                <h2>Building Information</h2>
                {visibleBuilding ? (
                  <EyeOff
                    onClick={() => setVisibleBuilding(!visibleBuilding)}
                    color="lightGray"
                    className="pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setVisibleBuilding(!visibleBuilding)}
                    color="lightGray"
                    className="pointer"
                  />
                )}
              </div>

              <BuildingInformation
                register={register}
                errors={errors}
                buildingTypeValue={buildingTypeValue}
                optionsArr={optionsArr}
                setOptionsArr={setOptionsArr}
                optionsBarnArr={optionsBarnArr}
                setOptionsBarnArr={setOptionsBarnArr}
                // setAttachedFiles={setAttachedFiles}
                // attachedFiles={attachedFiles}
                setVisibleBuilding={setVisibleBuilding}
                visibleBuilding={visibleBuilding}
                // scrollToAttachments={scrollToAttachments}
                // attachmentsSectionRef={attachmentsSectionRef}
              />
            </div>
            {/* ---------------- Added Lead Attachment for navigation---------------- */}

            {/* <div
              // className={` flex w-full justify-between items-center`}
              ref={(el) => (sectionRefs.current[4] = el)}
            >
              <LeadAttachment
                attachedFiles={attachedFiles}
                setAttachedFiles={setAttachedFiles}
              />
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLeadNew;
