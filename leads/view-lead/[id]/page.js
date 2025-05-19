"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import styles from "@/app/[slug]/leads/edit-lead/[id]/editLead.module.scss";
import { constantTypes, defaultBarnOptions } from "@/utils/constants/constant";
import useToastContext from "@/hooks/useToastContext";
import { useRouter } from "next/navigation";
import LeadContext from "@/hooks/context/LeadContext";
import AuthContext from "@/hooks/context/AuthContext";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  addLeadApi,
  addLeadTimeLineApi,
  deleteLeadApi,
  deleteLeadAttachmentApi,
  editLeadApi,
  editLeadRenderApi,
  getLeadDataByIdApi,
  getStateByZipApi,
} from "@/hooks/ApisContainer/Lead";
import LeadDetails from "@/components/lead/add-leads/LeadDetails";
import AddressInformation from "@/components/lead/add-leads/AddressInformations";
import ProductInformation from "@/components/lead/add-leads/ProductInformation";
import BuildingInformation from "@/components/lead/add-leads/building/buildingInformation";
import { Eye, EyeOff, MoreVertical } from "lucide-react";
import {
  addLeadRequestBarnPayload,
  addLeadRequestGaragePayload,
  createIdMappedArray,
  editLeadRequestBarnPayload,
  editLeadRequestGaragePayload,
  mapWallOptions,
  setValuesForHookInEditLead,
} from "@/helper/helper";
import Loader from "@/components/shared/Loader/Loader";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import MergedLeads from "@/components/lead/edit-leads/mergedLeads";
import EditHighlightedTop from "@/components/lead/edit-leads/editHighlightedTop";
import DeleteLead from "@/components/lead/delete-leads/page";
import DeleteAttachment from "@/components/lead/delete-leads/delete-attachment";
import InternalNotes from "@/components/lead/edit-leads/internalNotes";
import SharedLead from "@/components/lead/share-lead/page";
import StatusChangeWarnModal from "@/components/lead/edit-leads/statusChangeWarnModal";
import MergeLeadModel from "@/components/lead/mergeLeadModel";
import QuoteWithLead from "@/assets/svgs/quoteWithLead";
import QuoteSvg from "@/assets/svgs/quoteSvg";
import { Dropdown } from "react-bootstrap";
import SkeletonButton from "@/components/shared/skeleton/buttonSkeleton";
import LeadAttachment from "@/components/lead/add-leads/leadAttachment";

const ViewLead = ({ params }) => {
  //--------------Added Scrolling according to the index------------------------

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
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //--------------Added Scrolling according to the index------------------------

  const notification = useToastContext();
  const router = useRouter();
  let { organizationName } = useContext(AuthContext);
  let {
    leadAllList,
    allLeadDataLoader,
    leadManufacturerDetails,
    fetchUnreadLeadList,
    activeTab,
    setActiveTab,
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

  const { id: leadId } = params;
  const internalNotesInputRef = useRef();
  const watchedValues = watch();
  const emailValue = watch("email");
  const mobileValue = watch("mobile");
  const countryCode = watch("countryCode");
  const buildingTypeValue = watch("biBuildingType");
  const biBarnStyleValue = watch("biBarnStyle");
  const internalNotes = watch("internalNotes");

  const moduleType = "view";

  // ALL STATE
  const [addValues, setAddValues] = useState({
    leadOwner: "",
    leadAssistant: [],
    leadStatus: "",
    leadSource: "",
    leadManufacturer: "",
    dateAndTime: "",
    shareWith: [],
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
  const [editLoader, setEditLoader] = useState(false);
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
  const [loader, setLoader] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [emailFieldDisabled, setEmailFieldDisabled] = useState(false);
  const [mobileFieldDisabled, setMobileFieldDisabled] = useState(false);
  const [buildingTypeFieldDisabled, setBuildingTypeFieldDisabled] =
    useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [editLeadData, setEditLeadData] = useState({});
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [activeDeleteLeads, setActiveDeleteLeads] = useState({});
  const [hitMerge, setHitMerge] = useState(false);
  const [visibleAttachmentModal, setVisibleAttachmentModal] = useState(false);
  const [activeAttachmentIndex, setActiveAttachmentIndex] = useState("");
  const [attachmentDeleteLoader, setAttachmentDeleteLoader] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeShareLead, setActiveShareLead] = useState({});
  const [initialRender, setInitialRender] = useState(false);
  const [rerenderEditLoader, setRerenderEditLoader] = useState(false);
  const [triggerEditEvent, setTriggerEditEvent] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [activeInternalNotes, setActiveInternalNotes] = useState(false);
  const [manufacturerField, setManufacturerField] = useState("");
  const [manufactureLoader, setManufacturerLoader] = useState(false);
  const [visibleBuilding, setVisibleBuilding] = useState(true);
  const [showMergeModel, setShowMergeModel] = useState(false);
  const [quoteDropdownVisible, setQuoteDropdownVisible] = useState(false);
  const [attachmentType, setAttachmentType] = useState("");
  const [attachmentLoader, setAttachmentLoader] = useState(false);
  const [mergeLeadListDetails, setMergeLeadListDetails] = useState([]);
  const [visibleQuoteSkeleton, setVisibleQuoteSkeleton] = useState(false);

  //-------------------State for Quick Quote Form testing ------------------------
  const [showQuickQuote, setShowQuickQuote] = useState(false);

  useEffect(() => {
    if (showQuickQuote) {
      window.open("/dummy.pdf", "_blank");
      setShowQuickQuote(false);
    }
  }, [showQuickQuote]);

  // _______________________________________________________________________

  useEffect(() => {
    if (leadId) {
      fetchLeadDataByLeadId();
    }
  }, [leadId]);

  const fetchLeadDataByLeadId = (type) => {
    getLeadDataByIdApi(leadId, notification, (loading, error, res) => {
      !type && setLoader(true);
      if (!error) {
        if (res) {
          setEditLeadData(res);
          setManufacturerField("");
          setAttachmentType("");
          setAttachmentLoader(false);
          fetchUnreadLeadList(notification);
          setManufacturerLoader(false);
        }
      }
    });
  };

  useEffect(() => {
    if (Object.keys(editLeadData).length > 0) {
      setLoader(false);
      reFillData(editLeadData);

      // Set 3D Reference Number in form state if present
      if (editLeadData?.threeDRefNum) {
        setValue("threeDRef", editLeadData.threeDRefNum);
      }
    }
  }, [editLeadData]);

  const reFillData = (data) => {
    setInitialRender(true);
    const leadAssist = data?.leadOwnerAssist?.map((el) => ({
      id: el?._id,
      value: el?._id,
      title: `${el?.firstName} ${el?.lastName}`,
    }));
    const shareWith = data?.sharedWith?.map((el) => ({
      id: el?.id,
      value: el?.id,
      title: el?.name,
    }));

    if (data?.email) {
      setEmailFieldDisabled(true);
    } else {
      setEmailFieldDisabled(false);
    }
    if (data?.mobile) {
      setMobileFieldDisabled(true);
    } else {
      setMobileFieldDisabled(false);
    }
    if (data?.buildingInformation?.buildType) {
      setBuildingTypeFieldDisabled(true);
    } else {
      setBuildingTypeFieldDisabled(false);
    }

    let buildingInfo = data?.buildingInformation;
    setBuildingId(data?.buildingInformation?._id);

    if (data?.buildingInformation?.buildType == "barn") {
      const customLeanToArr = createIdMappedArray(buildingInfo?.customLeanTo);
      const barnOptions = (key) =>
        createIdMappedArray(buildingInfo?.walkInDoorOptionForBarn?.[0]?.[key]);
      const barnDoorOptions = (key) =>
        createIdMappedArray(buildingInfo?.barnDoorOption?.[0]?.[key]);
      const barnWindowOptions = (key) =>
        createIdMappedArray(buildingInfo?.windowOptionForBarn?.[0]?.[key]);

      setOptionsBarnArr((prevOptions) => ({
        ...prevOptions,
        customLeanTo: customLeanToArr,
        ...mapWallOptions(buildingInfo),
        walkInOptionCentralBuilding: barnOptions("centralBuilding"),
        walkInOptionLeftLeanTo: barnOptions("leftLeanTo"),
        walkInOptionRightLeanTo: barnOptions("rightLeanTo"),
        walkInOptionAdditionalLeanTo: barnOptions("additionalLeanTo"),
        doorOptionCentralBuilding: barnDoorOptions("centralBuilding"),
        doorOptionLeftLeanTo: barnDoorOptions("leftLeanTo"),
        doorOptionRightLeanTo: barnDoorOptions("rightLeanTo"),
        doorOptionAdditionalLeanTo: barnDoorOptions("additionalLeanTo"),
        windowCentralBuilding: barnWindowOptions("centralBuilding"),
        windowLeftLeanTo: barnWindowOptions("leftLeanTo"),
        windowRightLeanTo: barnWindowOptions("rightLeanTo"),
        windowAdditionalLeanTo: barnWindowOptions("additionalLeanTo"),
      }));
    } else {
      const garageDoorsArr = createIdMappedArray(buildingInfo?.garbageOption);
      const walkInDoorOptionArr = createIdMappedArray(
        buildingInfo?.walkInDoorOption
      );
      const garageWindowOptionArr = createIdMappedArray(
        buildingInfo?.windowOption
      );
      setOptionsArr((prevOptions) => ({
        ...prevOptions,
        garageDoors: garageDoorsArr,
        garageWalkIns: walkInDoorOptionArr,
        garageWindowOption: garageWindowOptionArr,
      }));
    }

    setAddValues({
      leadOwner: {
        id: data?.leadOwner?._id,
        value: data?.leadOwner?._id,
        title: `${data?.leadOwner?.firstName} ${data?.leadOwner?.lastName}`,
      },
      leadAssistant: leadAssist || [],
      leadStatus: {
        id: data?.leadStatus?._id,
        value: data?.leadStatus?._id,
        title: data?.leadStatus?.name,
      },
      leadSource: {
        id: data?.leadSource?._id,
        value: data?.leadSource?._id,
        title: data?.leadSource?.name,
      },
      leadManufacturer: {
        id: data?.manufacture?._id,
        value: data?.manufacture?._id,
        title: data?.manufacture?.fullName,
        phone: data?.manufacture?.phone,
        countryCode: data?.manufacture?.countryCode,
      },
      dateAndTime: data?.contractDateAndTime
        ? [new Date(data?.contractDateAndTime)]
        : "",
      shareWith: shareWith || [],
    });

    setValuesForHookInEditLead(setValue, setPhone, data);

    setAttachedFiles(data?.attachment || []);
  };

  useEffect(() => {
    leadAllList(notification);
  }, []);

  useEffect(() => {
    if (emailValue) {
      clearErrors("mobile");
    } else if (mobileValue) {
      clearErrors("email");
    }
    if (visibleEmailPhoneError) {
      if (!mobileValue && !emailValue) {
        setError("email", {
          type: "manual",
          message: ValidationMessage?.EMAIL_REQUIRED,
        });
        setError("mobile", {
          type: "manual",
          message: ValidationMessage?.MOBILE_NUMBER_REQUIRED,
        });
      }
      formValidation();
    }
  }, [emailValue, mobileValue, addValues]);

  const handleChange = (field) => (value) => {
    setAddValues((prev) => ({ ...prev, [field]: value }));
    if (field == "leadManufacturer") {
      setManufacturerField(field);
    }
    if (field !== "leadStatus") {
      setTriggerEditEvent(!triggerEditEvent);
    } else {
      toggleChangeStatusModal();
    }
  };

  const onSubmit = (data) => {
    const isValid = formValidation();
    if (isValid) {
      let formData = {};
      if (buildingTypeValue === "garage" || buildingTypeValue === "carport") {
        formData = editLeadRequestGaragePayload(
          data,
          addValues,
          optionsArr,
          attachedFiles,
          buildingId
        );
      } else if (buildingTypeValue === "barn") {
        formData = editLeadRequestBarnPayload(
          data,
          addValues,
          optionsBarnArr,
          attachedFiles,
          buildingId
        );
      }

      editLeadApi(formData, leadId, notification, (loading, error) => {
        setEditLoader(loading);
        if (!error) {
          fetchLeadDataByLeadId("edit");
        }
      });
    }
  };

  const formValidation = () => {
    let leadOwnerErr = "";
    let leadAssistantErr = "";

    if (!addValues?.leadOwner) {
      leadOwnerErr = ValidationMessage?.LEAD_OWNER_REQUIRED;
    }
    if (addValues?.leadAssistant?.length === 0) {
      leadAssistantErr = ValidationMessage?.LEAD_ASSISTANT_REQUIRED;
    }

    if (leadOwnerErr || leadAssistantErr) {
      setAddError({
        leadOwnerError: leadOwnerErr,
        leadAssistantError: leadAssistantErr,
      });
      return false;
    } else {
      setAddError({ leadOwnerError: "" });
      return true;
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

  const toggleVisibleDeleteModal = (data) => {
    setActiveDeleteLeads(data);
    setVisibleDeleteModal(!visibleDeleteModal);
  };

  const handleDeleteSingleLead = () => {
    const resultId =
      Object.keys(activeDeleteLeads)?.length > 0
        ? activeDeleteLeads?._id
        : leadId;
    console.log("resultId", resultId);

    deleteLeadApi(resultId, notification, (loading, error) => {
      setDeleteLoader(loading);
      if (!error) {
        setVisibleDeleteModal(false);
        if (Object.keys(activeDeleteLeads)?.length > 0) {
          setHitMerge(!hitMerge);
        } else {
          router.push(`/${organizationName}/leads`);
        }
      }
    });
  };

  const toggleDeleteAttachmentModal = (index) => {
    setActiveAttachmentIndex(index);
    setVisibleAttachmentModal(!visibleAttachmentModal);
  };

  const handleDeleteAttachment = () => {
    deleteLeadAttachmentApi(
      leadId,
      activeAttachmentIndex,
      notification,
      (loading, error) => {
        setAttachmentDeleteLoader(loading);
        if (!error) {
          setVisibleAttachmentModal(false);
          fetchLeadDataByLeadId();
        }
      }
    );
  };

  const toggleShareOption = (data) => {
    setActiveShareLead(data);
    setShowShareModal(!showShareModal);
  };

  useEffect(() => {
    if (initialRender && !loader && !rerenderEditLoader) {
      const delayDebounceFn = setTimeout(() => {
        handleFocusAllFields();
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [triggerEditEvent]);

  const handleFocusAllFields = () => {
    handelEditApi(watchedValues);
  };

  const handelEditApi = (data, type) => {
    const isValid = formValidation();
    if (isValid) {
      let formData = {};
      if (buildingTypeValue === "garage" || buildingTypeValue === "carport") {
        formData = editLeadRequestGaragePayload(
          data,
          addValues,
          optionsArr,
          attachedFiles,
          buildingId
        );
      } else if (buildingTypeValue === "barn") {
        formData = editLeadRequestBarnPayload(
          data,
          addValues,
          optionsBarnArr,
          attachedFiles,
          buildingId
        );
      }

      editLeadRenderApi(formData, leadId, notification, (loading, error) => {
        setRerenderEditLoader(loading);
        manufacturerField == "leadManufacturer" && setManufacturerLoader(true);
        if (!error) {
          if (manufacturerField == "leadManufacturer") {
            fetchLeadDataByLeadId("leadManufacturer");
          }
          attachmentType == "hit-attachment" &&
            fetchLeadDataByLeadId("editData");
          type == "internal-Notes" ? setHitMerge(!hitMerge) : null;
        }
      });
    }
  };

  const toggleChangeStatusModal = () => {
    setShowChangeStatusModal(!showChangeStatusModal);
  };

  const clearInternalNotes = () => {
    internalNotesInputRef?.current?.blur();
    const leadSource = {
      id: editLeadData?.leadSource?._id,
      value: editLeadData?.leadSource?._id,
      title: editLeadData?.leadSource?.name,
    };
    clearErrors("internalNotes");
    setAddValues((prev) => ({ ...prev, ["leadStatus"]: leadSource }));
    setActiveInternalNotes(false);
  };

  const handleAddTimeline = (key, value) => {
    const requestPayload = {
      timeLineId: leadId,
      // leadId: leadId,
      key: key,
      value: value,
      action: "edit lead",
    };
    addLeadTimeLineApi(
      requestPayload,
      notification,
      (loading, error, res) => {}
    );
  };

  const toggleMergeModel = () => {
    if (mergeLeadListDetails.length > 1) {
      setShowMergeModel(!showMergeModel);
      setQuoteDropdownVisible(false);
    } else {
      router.push(
        `/${organizationName}/quotes/add-quotes?leadId=${leadId}`,
        undefined,
        { shallow: true }
      );
    }
  };

  const handleCheckTimeline = (type) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timeline-active-page", type);
    }
  };

  return (
    <div className={addLeadStyle.lead_main_div}>
      {loader ? (
        <div className={styles.main_loader}>
          <LottieLoader height={250} width={250} loader={true} />
        </div>
      ) : (
        <form
          action=""
          className={addLeadStyle.lead_main_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={addLeadStyle.lead_container}>
            <div className={addLeadStyle.lead_navigation}>
              <ul>
                {constantTypes?.leadSidebarItems.map((el, index) => {
                  return (
                    // <li
                    //   className={index == 0 ? addLeadStyle.active : ""}
                    //   key={el?.value}
                    // >
                    //   {el?.title}
                    // </li>
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
                              top: section.offsetTop - 100,
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

            <div
              className={
                moduleType == "view"
                  ? `${addLeadStyle.Lead_field} ${styles.edit_page}`
                  : `${addLeadStyle.Lead_field}`
              }
            >
              <div className={styles.edit_action}>
                <div className={styles.pull_left}>
                  <ul>
                    <li className={activeTab == "outline" ? styles.active : ""}>
                      <Link
                        href={`/${organizationName}/leads/view-lead/${editLeadData?._id}`}
                        onClick={() => {
                          handleCheckTimeline("view-lead");
                          setActiveTab("outline");
                        }}
                        prefetch={true}
                      >
                        Overview
                      </Link>
                    </li>
                    <li
                      className={activeTab == "timeline" ? styles.active : ""}
                    >
                      <Link
                        href={`/${organizationName}/leads/timeline/${editLeadData?._id}`}
                        onClick={() => {
                          handleCheckTimeline("view-lead");
                          setActiveTab("timeline");
                        }}
                        prefetch={true}
                      >
                        Timeline
                      </Link>
                    </li>
                  </ul>
                </div>
                <button
                  className={styles.save_button}
                  type="button"
                  onClick={() => toggleShareOption(editLeadData)}
                >
                  <img src="/svg/share-icon.svg" alt="No_Save_Image" />
                  <span>Share</span>
                </button>
                <button
                  className={styles.save_button}
                  type="submit"
                  onClick={() => {
                    setVisibleAddress(true);
                    setVisibleProductInfo(true);
                    setVisibleEmailPhoneError(true);
                    formValidation();
                  }}
                  disabled={editLoader || stateByZipLoader}
                  style={
                    editLoader || stateByZipLoader
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                >
                  {editLoader ? (
                    <Loader height="20px" width="20px" newLoader={true} />
                  ) : (
                    <img src="/svg/save.svg" alt="No_Save_Image" />
                  )}
                  <span>Save</span>
                </button>
                <button
                  className={styles.save_button}
                  type="button"
                  onClick={() => toggleVisibleDeleteModal({})}
                >
                  <img src="/svg/delete-icon.svg" alt="No_Save_Image" />
                  <span>Delete</span>
                </button>

                <div className={styles.dropdown_div}>
                  <Dropdown>
                    <Dropdown.Toggle
                      className={styles.actionButton}
                      as="button"
                      bsPrefix="custom-dropdown-toggle"
                      type="button"
                      disabled={visibleQuoteSkeleton}
                    >
                      <div
                        type="button"
                        className={styles.save_button}
                        onClick={() => {
                          if (!visibleQuoteSkeleton) {
                            setQuoteDropdownVisible(!quoteDropdownVisible);
                          }
                        }}
                      >
                        {visibleQuoteSkeleton ? (
                          <>
                            <SkeletonButton height={20} width={17} />
                            <SkeletonButton height={20} width={80} />
                          </>
                        ) : (
                          <>
                            <img src="/svg/contract.svg" alt="No_Save_Image" />
                            <span>Create Quote</span>
                          </>
                        )}
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles?.dropdown_custom}>
                      <Dropdown.Item className={styles?.dropdown_items}>
                        <div
                          className={styles.drop_btn_popup}
                          // onClick={() => alert("Coming Soon!!")}
                          onClick={() => setShowQuickQuote(true)}
                          type="button"
                        >
                          <QuoteSvg />
                          Quick Quote
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item className={styles?.dropdown_items}>
                        <div
                          type="button"
                          className={styles.drop_btn_popup}
                          onClick={() => {
                            toggleMergeModel();
                          }}
                        >
                          <QuoteWithLead />
                          Quote with Lead
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <button
                  className={styles.save_button}
                  type="button"
                  onClick={() => alert("Coming Soon!!")}
                >
                  <img src="/svg/contract.svg" alt="No_Save_Image" />
                  <span>Create Contract</span>
                </button>
              </div>
              <div className={styles.edit_page_main}>
                <div
                  className={
                    moduleType == "view"
                      ? `${addLeadStyle.lead_section_div} ${styles.edit_page_section}`
                      : `${addLeadStyle.lead_section_div}`
                  }
                >
                  <div className={styles.stage_lead_top}>
                    <ul>
                      <li className={styles.active}>
                        <div className={styles.stage_lead_box}>New Lead</div>
                      </li>
                      <li>
                        <div className={styles.stage_lead_box}>Quote Sent</div>
                      </li>
                      <li>
                        <div className={styles.stage_lead_box}>Quoted</div>
                      </li>
                      <li>
                        <div className={styles.stage_lead_box}>
                          Contract Sent
                        </div>
                      </li>
                      <li>
                        <div className={styles.stage_lead_box}>
                          Contract Signed
                        </div>
                      </li>
                      <li>
                        <div className={styles.stage_lead_box}>
                          Customer Won
                        </div>
                      </li>
                    </ul>
                  </div>
                  {addValues?.leadOwner?.title && (
                    <EditHighlightedTop
                      editLeadData={editLeadData}
                      emailValue={emailValue}
                      mobileValue={mobileValue}
                      countryCode={countryCode}
                      addValues={addValues}
                      leadManufacturerDetails={leadManufacturerDetails}
                      manufactureLoader={manufactureLoader}
                    />
                  )}
                  {/* <div className={addLeadStyle.lead_heading}>
                    <h2>Lead Details</h2>
                  </div> */}

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
                    emailFieldDisabled={emailFieldDisabled}
                    mobileFieldDisabled={mobileFieldDisabled}
                    moduleType={moduleType}
                    editLeadData={editLeadData}
                    handelEditApi={handelEditApi}
                    watchedValues={watchedValues}
                    handleAddTimeline={handleAddTimeline}
                    show3DRefInput={
                      addValues?.leadSource?.title === "3D Estimator"
                    }
                  />

                  <InternalNotes
                    activeInternalNotes={activeInternalNotes}
                    ref={internalNotesInputRef}
                    clearInternalNotes={clearInternalNotes}
                    register={register}
                    errors={errors}
                    notification={notification}
                    leadId={leadId}
                    internalNotes={internalNotes}
                    setActiveInternalNotes={setActiveInternalNotes}
                    setValue={setValue}
                    handelEditApi={handelEditApi}
                    watchedValues={watchedValues}
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
                      handelEditApi={handelEditApi}
                      watchedValues={watchedValues}
                      moduleType={moduleType}
                      handleAddTimeline={handleAddTimeline}
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
                        onClick={() =>
                          setVisibleProductInfo(!visibleProductInfo)
                        }
                        color="lightGray"
                        className="pointer"
                      />
                    ) : (
                      <Eye
                        onClick={() =>
                          setVisibleProductInfo(!visibleProductInfo)
                        }
                        color="lightGray"
                        className="pointer"
                      />
                    )}
                  </div>
                  {visibleProductInfo && (
                    <ProductInformation
                      register={register}
                      watchedValues={watchedValues}
                      moduleType={moduleType}
                      handelEditApi={handelEditApi}
                      handleAddTimeline={handleAddTimeline}
                    />
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

                  {/* <BuildingInformation
                    register={register}
                    errors={errors}
                    buildingTypeValue={buildingTypeValue}
                    optionsArr={optionsArr}
                    setOptionsArr={setOptionsArr}
                    optionsBarnArr={optionsBarnArr}
                    setOptionsBarnArr={setOptionsBarnArr}
                    setAttachedFiles={setAttachedFiles}
                    attachedFiles={attachedFiles}
                    buildingTypeFieldDisabled={buildingTypeFieldDisabled}
                    toggleDeleteAttachmentModal={toggleDeleteAttachmentModal}
                    moduleType={moduleType}
                    watchedValues={watchedValues}
                    handelEditApi={handelEditApi}
                    setTriggerEditEvent={setTriggerEditEvent}
                    triggerEditEvent={triggerEditEvent}
                    setVisibleBuilding={setVisibleBuilding}
                    visibleBuilding={visibleBuilding}
                    handleAddTimeline={handleAddTimeline}
                    setAttachmentType={setAttachmentType}
                    attachmentLoader={attachmentLoader}
                    setAttachmentLoader={setAttachmentLoader}
                    scrollToAttachments={scrollToAttachments}
                    attachmentsSectionRef={attachmentsSectionRef}
                  /> */}

                  <BuildingInformation
                    register={register}
                    errors={errors}
                    buildingTypeValue={buildingTypeValue}
                    optionsArr={optionsArr}
                    setOptionsArr={setOptionsArr}
                    optionsBarnArr={optionsBarnArr}
                    setOptionsBarnArr={setOptionsBarnArr}
                    buildingTypeFieldDisabled={buildingTypeFieldDisabled}
                    moduleType={moduleType}
                    watchedValues={watchedValues}
                    handelEditApi={handelEditApi}
                    setTriggerEditEvent={setTriggerEditEvent}
                    triggerEditEvent={triggerEditEvent}
                    setVisibleBuilding={setVisibleBuilding}
                    visibleBuilding={visibleBuilding}
                  />

                  {/* ---Added all quotes, contracts, task/activities, attachments, emails-- */}
                  <div
                    className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
                    ref={(el) => {
                      sectionRefs.current[4] = el;
                    }}
                  >
                    <h2>All Quotes</h2>
                  </div>
                  <div
                    className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
                    ref={(el) => {
                      sectionRefs.current[5] = el;
                    }}
                  >
                    <h2>All Contracts</h2>
                  </div>
                  <div
                    className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
                    ref={(el) => {
                      sectionRefs.current[6] = el;
                    }}
                  >
                    <h2>Task/Activities</h2>
                  </div>

                  {/* -------Added attachment component directly-------- */}
                  <div
                    className={`flex w-full justify-between items-center`}
                    ref={(el) => {
                      sectionRefs.current[7] = el;
                      // attachmentsSectionRef.current = el;
                    }}
                  >
                    <LeadAttachment
                      attachedFiles={attachedFiles}
                      setAttachedFiles={setAttachedFiles}
                      toggleDeleteAttachmentModal={toggleDeleteAttachmentModal}
                      moduleType={moduleType}
                      setTriggerEditEvent={setTriggerEditEvent}
                      triggerEditEvent={triggerEditEvent}
                      handleAddTimeline={handleAddTimeline}
                      setAttachmentType={setAttachmentType}
                      attachmentLoader={attachmentLoader}
                      setAttachmentLoader={setAttachmentLoader}
                      leadId={leadId}
                    />
                  </div>

                  <div
                    className={`${addLeadStyle.lead_heading} flex w-full justify-between items-center`}
                    ref={(el) => {
                      sectionRefs.current[8] = el;
                    }}
                  >
                    <h2>All Emails</h2>
                  </div>
                </div>

                <MergedLeads
                  editLeadData={editLeadData}
                  leadId={leadId}
                  toggleVisibleDeleteModal={toggleVisibleDeleteModal}
                  hitMerge={hitMerge}
                  setMergeLeadListDetails={setMergeLeadListDetails}
                  setVisibleQuoteSkeleton={setVisibleQuoteSkeleton}
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {visibleDeleteModal && (
        <DeleteLead
          visibleDeleteModal={visibleDeleteModal}
          onHide={toggleVisibleDeleteModal}
          handleDeleteSingleLead={handleDeleteSingleLead}
          deleteLoader={deleteLoader}
        />
      )}
      {visibleAttachmentModal && (
        <DeleteAttachment
          show={visibleAttachmentModal}
          onHide={toggleDeleteAttachmentModal}
          handleDeleteAttachment={handleDeleteAttachment}
          attachmentDeleteLoader={attachmentDeleteLoader}
        />
      )}

      {showShareModal && (
        <SharedLead
          show={showShareModal}
          onHide={toggleShareOption}
          activeShareLead={activeShareLead}
          fetchLeadList={fetchLeadDataByLeadId}
        />
      )}
      {showChangeStatusModal && (
        <StatusChangeWarnModal
          show={showChangeStatusModal}
          onHide={toggleChangeStatusModal}
          editLeadData={editLeadData}
          setAddValues={setAddValues}
          setActiveInternalNotes={setActiveInternalNotes}
          internalNotesInputRef={internalNotesInputRef}
        />
      )}
      {showMergeModel && (
        <MergeLeadModel
          show={showMergeModel}
          onHide={toggleMergeModel}
          leadId={leadId}
        />
      )}
    </div>
  );
};

export default ViewLead;
