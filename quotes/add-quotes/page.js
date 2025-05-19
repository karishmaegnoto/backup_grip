"use client";
/*eslint-disable @next/next/no-img-element*/
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./add-quotes.module.scss";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import ODateTimePicker from "@/components/shared/datePicker/ODateTimePicker";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { addQuoteApi } from "@/hooks/ApisContainer/Quotes";
import QuoteAddLeadDetails from "@/components/quotes/add-quotes/quoteAddLeadDetails";
import LeadContext from "@/hooks/context/LeadContext";
import useToastContext from "@/hooks/useToastContext";
import { useForm } from "react-hook-form";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import {
  editLeadApi,
  getLeadDataByIdApi,
  getStateByZipApi,
} from "@/hooks/ApisContainer/Lead";
import { setValuesForHookInEditLead } from "@/helper/helper";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import QuoteLeadDetails from "@/components/quotes/add-quotes/quoteLeadDetails";
import BuildingSpecialistInformation from "@/components/quotes/add-quotes/buildingSpecialistInformation";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import QuoteAddressDetails from "@/components/quotes/add-quotes/quoteAddressDetails";
import QuotesProductInformation from "@/components/quotes/add-quotes/quotesProductInformation";
import QuoteBuildingInformation from "@/components/quotes/add-quotes/building/quoteBuildingInformation";
import { Eye, EyeOff } from "lucide-react";
import QuoteColorInformation from "@/components/quotes/add-quotes/building/quoteColorInformation";
import { Dropdown } from "react-bootstrap";
import Loader from "@/components/shared/Loader/Loader";
import AuthContext from "@/hooks/context/AuthContext";
import { getQuoteDataByIdApi } from "@/hooks/ApisContainer/Quotes";
import { addQuoteRequestGaragePayload } from "@/helper/helper";
import LeadAttachment from "@/components/lead/add-leads/leadAttachment";

const AddQuotes = () => {
  const [attachmentType, setAttachmentType] = useState("");
  const [attachmentLoader, setAttachmentLoader] = useState(false);
  const [triggerEditEvent, setTriggerEditEvent] = useState(false);
  const notification = useToastContext();
  const searchParams = useSearchParams();
  const params = useParams();
  const paramsLeadId = searchParams.get("leadId");
  const leadId = paramsLeadId;
  // Get quoteId from searchParams or from route params
  const quoteIdFromSearch = searchParams.get("quoteId");
  const quoteIdFromParams = params?.quoteId;
  const quoteId = quoteIdFromSearch || quoteIdFromParams || null;
  console.log("AddQuotes page leadId from URL param:", leadId);
  console.log("AddQuotes page quoteId from URL param:", quoteId);

  const router = useRouter();

  // ----------------Added new code for scrolling according to the section-------------------///

  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  // Added state for quoteLeadDetails
  const [quoteLeadDetails, setQuoteLeadDetails] = useState({});
  const [recentQuotes, setRecentQuotes] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

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

  let { organizationName } = useContext(AuthContext);

  const buildingTypeValue = watch("biBuildingType");

  let { allLeadDataLoader, leadAllList } = useContext(LeadContext);

  // ALL STATE
  const [addValues, setAddValues] = useState({
    leadOwner: "",
    leadAssistant: [],
    leadStatus: "",
    leadSource: "",
    leadManufacturer: "",
    dateAndTime: "",
    quoteDateAndTime: "",
  });
  const [addError, setAddError] = useState({
    leadOwnerError: "",
    leadAssistantError: "",
  });
  const [phone, setPhone] = useState("");
  const [mobileFieldDisabled, setMobileFieldDisabled] = useState(false);
  const [loader, setLoader] = useState(true);
  const [LeadDetails, setLeadDetails] = useState({});
  const [emailFieldDisabled, setEmailFieldDisabled] = useState(false);
  const [buildingTypeFieldDisabled, setBuildingTypeFieldDisabled] =
    useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [stateByZipLoader, setStateByZipLoader] = useState(false);
  const [visibleBuilding, setVisibleBuilding] = useState(true);
  const [visibleAddress, setVisibleAddress] = useState(true);
  const [visibleProductInfo, setVisibleProductInfo] = useState(true);
  const [visibleQuoteData, setVisibleQuoteData] = useState(true);

  // const [addLeadLoader, setAddLeadLoader] = useState(false);
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
  // const [optionsBarnArr, setOptionsBarnArr] = useState(defaultBarnOptions);
  const [attachedFiles, setAttachedFiles] = useState([]);

  //-------------Building Price Calculations-----------------------------------
  const [buildingPrice, setBuildingPrice] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [depositType, setDepositType] = useState("%");
  const [depositVal, setDepositVal] = useState("");
  const [extraLabor, setExtraLabor] = useState("");
  const [permitFees, setPermitFees] = useState("");
  const [calcsPlans, setCalcsPlans] = useState("");
  const [surcharge, setSurcharge] = useState("");
  const [subtotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);
  const [addQuoteLoader, setAddQuoteLoader] = useState(false);
  const [quoteType, setQuoteType] = useState("quoteWithLead");

  const toggleDeleteAttachmentModal = (index) => {
    setActiveAttachmentIndex(index);
    setVisibleAttachmentModal(!visibleAttachmentModal);
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

  const moduleType = "view";

  // -------Added deposit type according to the selection------------
  const handleSelect = (eventKey) => {
    setDepositType(eventKey);
  };

  //-----Converts strings into float----------------
  const parse = (val) => parseFloat(val || "0");

  //---Formats a number into a USD currency string (e.g., 1234.5 → $1,234.50)----
  const formatUSD = (num) =>
    num
      ? Number(num).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$0.00";

  const calculateValues = () => {
    const price = parse(buildingPrice);
    const tax = (price * parse(taxPercent)) / 100;
    // const subtotal = price + tax;
    // const inputTax = (subtotalprice * input_tax) / 100;

    const totalBeforeDeposit = price + tax;

    let deposit = 0;
    if (depositType === "%") {
      deposit = (price * parse(depositVal)) / 100;
    } else if (depositType === "$") {
      deposit = parse(depositVal);
    }

    const totalAfterDeposit = totalBeforeDeposit - deposit;

    const surchargeAmt = (price * parse(surcharge)) / 100;

    const balance =
      totalAfterDeposit +
      parse(extraLabor) +
      parse(permitFees) +
      parse(calcsPlans) +
      surchargeAmt;

    //------Code for Tax Calculations-------

    // const price = parseFloat(buildingPrice) || 0;
    // const taxRate = parseFloat(taxPercent) || 0;

    // const tax = (price * taxRate) / 100;
    const updatedSubtotal = price + tax;
    setTaxAmount(tax);
    setTaxPercent(taxPercent);
    setSubTotal(updatedSubtotal);

    // setTaxAmount(tax);
    setDepositAmount(deposit);
    setTotal(totalAfterDeposit);
    setBalanceDue(balance);
  };

  useEffect(() => {
    calculateValues();
  }, [
    buildingPrice,
    taxPercent,
    depositType,
    depositVal,
    extraLabor,
    permitFees,
    calcsPlans,
    surcharge,
  ]);

  // ------------------------------------------------------------------

  useEffect(() => {
    leadAllList(notification);
  }, []);

  useEffect(() => {
    if (leadId) {
      fetchLeadDataByLeadId();
    }
  }, [leadId]);

  //---added useEffect to fetch lead & quote data--------------

  useEffect(() => {
    let isMounted = true;
    if (leadId) {
      console.log("Fetching quote data for leadId:", leadId);
      getQuoteDataByIdApi(leadId, notification, (loading, error, res) => {
        if (
          !error &&
          res &&
          Array.isArray(res) &&
          res.length > 0 &&
          isMounted
        ) {
          if (quoteId) {
            const quoteData = res.find((quote) => quote._id === quoteId);
            if (quoteData) {
              console.log("Quote data found:", quoteData);
              setLoader(true);
              setQuoteLeadDetails(quoteData);
              reFillData(quoteData);
              fetchLeadDataByLeadId("edit");
            }
          } else {
            // Sort quotes by quoteDate or createdAt descending to get the latest quote
            const sortedQuotes = res.sort((a, b) => {
              const dateA = new Date(a.quoteDate || a.createdAt || 0);
              const dateB = new Date(b.quoteDate || b.createdAt || 0);
              return dateB - dateA;
            });
            setRecentQuotes(sortedQuotes);
            const latestQuote = sortedQuotes[0];
            console.log("Latest quote found:", latestQuote);
            setQuoteLeadDetails(latestQuote);
            reFillData(latestQuote);
          }
        } else {
          console.error("No quotes found for the given leadId.");
          setLoader(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [leadId, quoteId]);

  const fetchLeadDataByLeadId = (type) => {
    getLeadDataByIdApi(leadId, notification, (loading, error, res) => {
      !type && setLoader(true);
      if (!error) {
        if (res) {
          setLeadDetails(res);
          console.log("response from leadId API:", res);
          // setManufacturerField("");
          // setAttachmentType("");
          // setAttachmentLoader(false);
          // setAttachmentDeleteLoader(false);
          // fetchUnreadLeadList(notification);
          // setManufacturerLoader(false);
        }
      }
    });
  };

  //-------Debugging: fetching quote data on edit-lead page-------
  const fetchQuoteDataByQuoteId = (quoteId) => {
    console.log("fetchQuoteDataByQuoteId called with quoteId:", quoteId);
    getQuoteDataByIdApi(quoteId, notification, (loading, error, res) => {
      setLoader(true);

      if (!error) {
        if (res) {
          console.log("quoteLeadDetails", res);
          const leadIdFromQuote =
            Array.isArray(res) && res.length > 0 ? res[0].leadId : res?.leadId;
          console.log("leadIdFromQuote", leadIdFromQuote);
          // setLeadDetails(res);
          setQuoteLeadDetails(res);
          setLoader(false);
          if (leadIdFromQuote) {
            console.log(
              `/${organizationName}/leads/edit-lead/${leadIdFromQuote}`
            );
            router.push(
              `/${organizationName}/leads/edit-lead/${leadIdFromQuote}`
            );
          }
        }
      } else {
        setLoader(false);
      }
    });
  };

  useEffect(() => {
    if (
      Object.keys(LeadDetails).length > 0 ||
      (quoteLeadDetails && Object.keys(quoteLeadDetails).length > 0)
    ) {
      setLoader(false);
      //------- Merge LeadDetails and quoteLeadDetails--------------
      const mergedData = {
        ...LeadDetails,
        ...quoteLeadDetails,
        buildingInformation: {
          ...LeadDetails.buildingInformation,
          ...quoteLeadDetails.buildingInformation,
        },
        leadOwnerAssist:
          quoteLeadDetails.leadOwnerAssist || LeadDetails.leadOwnerAssist,
        sharedWith: quoteLeadDetails.sharedWith || LeadDetails.sharedWith,
        buildingSpecInfo: {
          ...LeadDetails.buildingSpecInfo,
          ...quoteLeadDetails.buildingSpecInfo,
        },
      };
      reFillData(mergedData);
    }
  }, [LeadDetails, quoteLeadDetails]);

  // useEffect(() => {
  //   // Fallback timeout to stop loader after 10 seconds to avoid infinite loading
  //   const timeoutId = setTimeout(() => {
  //     if (loader) {
  //       console.warn("Loader timeout reached, setting loader to false");
  //       setLoader(false);
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [loader]);

  const reFillData = async (data) => {
    // setInitialRender(true);
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

    setBuildingPrice(data?.buildingPrice || "");
    setExtraLabor(data?.extraLabor || "");
    setPermitFees(data?.permitFees || "");
    setCalcsPlans(data?.calcsAndPlans || "");
    setSurcharge(data?.surCharge || "");
    setTaxPercent(data?.taxPercent || 0);
    setDepositType(data?.depositType || "%");
    setDepositVal(data?.deposit || "");
    setSubTotal(data?.subtotal || 0);
    setTaxAmount(data?.tax || 0);
    // setDepositAmount(data?.depositAmount || 0);
    setTotal(data?.grandTotal || 0);
    setBalanceDue(data?.balanceDueInstallation || 0);

    let buildingInfo = data?.buildingInformation;
    setBuildingId(data?.buildingInformation?._id);

    //----Set buildingSpecInfo fields------
    setValue(
      "buildingSpecInfo.quoteName",
      data?.buildingSpecInfo?.quoteName || ""
    );
    setValue(
      "buildingSpecInfo.directLine",
      data?.buildingSpecInfo?.directLine || ""
    );

    setValue(
      "buildingSpecInfo.quoteDate",
      data?.buildingSpecInfo?.quoteDate
        ? new Date(data.buildingSpecInfo.quoteDate)
        : null
    );

    // Set 3D Reference Number in form state if present
    setValue("threeDRef", data?.threeDRefNum || "");

    // console.log("refilled data from quote section:", data);

    // // Fetch detailed quote data for each quote id in data.quotes
    // let detailedQuotes = [];
    // if (Array.isArray(data?.quotes) && data.quotes.length > 0) {
    //   detailedQuotes = await Promise.all(
    //     data.quotes.map(async (quoteRef) => {
    //       if (quoteRef?.id) {
    //         return new Promise((resolve) => {
    //           getQuoteDataByIdApi(
    //             quoteRef.id,
    //             notification,
    //             (loading, error, res) => {
    //               if (!error && res) {
    //                 resolve(res);
    //               } else {
    //                 resolve(null);
    //               }
    //             }
    //           );
    //         });
    //       } else {
    //         return null;
    //       }
    //     })
    //   );
    //   detailedQuotes = detailedQuotes.filter((q) => q !== null);
    // }

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
      quoteDate: data?.buildingSpecInfo?.quoteDate
        ? new Date(data.buildingSpecInfo.quoteDate)
        : null,
      shareWith: shareWith || [],
      // quotes: quoteData,
    });

    // Set Certification and Gauge values in form state
    if (buildingInfo?.buildingData) {
      setValue(
        "biCertification",
        buildingInfo.buildingData.certification || ""
      );
      setValue("biGauge", buildingInfo.buildingData.gauge || "");
    }

    setValuesForHookInEditLead(setValue, setPhone, data);

    setAttachedFiles(data?.attachment || []);
    // console.log("Attachments:", data?.attachment);

    // Parse JSON strings to arrays
    const garageDoors = buildingInfo?.garbageOption
      ? typeof buildingInfo.garbageOption === "string"
        ? JSON.parse(buildingInfo.garbageOption)
        : buildingInfo.garbageOption
      : [];
    const garageWalkIns = buildingInfo?.walkInDoorOption
      ? typeof buildingInfo.walkInDoorOption === "string"
        ? JSON.parse(buildingInfo.walkInDoorOption)
        : buildingInfo.walkInDoorOption
      : [];
    const garageWindowOption = buildingInfo?.windowOption
      ? typeof buildingInfo.windowOption === "string"
        ? JSON.parse(buildingInfo.windowOption)
        : buildingInfo.windowOption
      : [];

    // Set optionsArr state with saved garage and carport options from backend data
    if (buildingInfo) {
      setOptionsArr({
        garageDoors,
        garageWalkIns,
        garageWindowOption,
      });
    }
  };

  const handleChange = (field) => (value) => {
    setAddValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeDate = (dates) => {
    setAddValues((prev) => ({ ...prev, dateAndTime: dates }));
  };
  const handleChangeQuoteDate = (dates) => {
    setAddValues((prev) => ({ ...prev, quoteDateAndTime: dates }));
  };

  const onSubmit = async (data) => {
    const isValid = formValidation();

    if (!leadId) {
      notification.error("Lead ID is missing. Cannot submit the quote.");
      return;
    }

    //---------updated 08-05-2025 (changes needed)-------------------
    // if (isValid) {
    //   let formData = {};

    //   if (buildingTypeValue === "garage" || buildingTypeValue === "carport") {
    //     formData = addQuoteRequestGaragePayload(
    //       data,
    //       addValues,
    //       optionsArr,
    //       attachedFiles
    //     );
    //   }

    //   // Append leadId to formData to satisfy backend validation
    //   if (formData instanceof FormData) {
    //     formData.append("leadId", leadId);
    //   }

    //   addQuoteApi(
    //     formData,
    //     notification,
    //     async ({ loading, error, newQuoteId }) => {
    //       if (!error) {
    //         notification.success("Quote added successfully.........");
    //         console.log("addQuoteApi callback newQuoteId:", newQuoteId);
    //         if (newQuoteId) {
    //           //----- newQuoteId is quoteId, fetching quote data by quoteId--
    //           getQuoteDataByIdApi(
    //             newQuoteId,
    //             notification,
    //             (loading, error, res) => {
    //               console.log("Quote id is:", newQuoteId);
    //               if (!error && res) {
    //                 const quoteData = Array.isArray(res) ? res[0] : res;
    //                 setQuoteLeadDetails(quoteData);
    //                 // console.log(
    //                 //   "Quote data being passed to reFillData:",
    //                 //   res
    //                 // );

    //                 reFillData(quoteData);
    //                 // console.log("lastest quote is :", quoteData);
    //               }
    //             }
    //           );
    //           const quoteLeadId = leadId || paramsLeadId;
    //           const quoteIdParam = newQuoteId ? `&quoteId=${newQuoteId}` : "";
    //           console.log(
    //             `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true${quoteIdParam}`
    //           );
    //           router.push(
    //             `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true${quoteIdParam}`
    //           );
    //         }
    //       }
    //     }
    //   );
    // }

    if (isValid) {
      try {
        const formData = new FormData();
        const leadBuildingInfo = {
          quoteName: data.buildingSpecInfo?.quoteName || "",
          directLine: data.buildingSpecInfo?.directLine || "",
          quoteDate: data.buildingSpecInfo?.quoteDate || "",
        };
        const leadData = {
          leadOwner: addValues.leadOwner?.id || "",
          leadAssistant:
            addValues.leadAssistant?.map((assist) => assist.id) || [],
          leadStatus: addValues.leadStatus?.id || "",
          leadSource: addValues.leadSource?.id || "",
          leadManufacturer: addValues.leadManufacturer?.id || "",
          phone: phone || "",
          email: data.email || "",
        };
        const buildingData = {
          buildingPrice: buildingPrice || "",
          taxPercent: taxPercent || "",
          depositType: depositType || "%",
          depositVal: depositVal || "",
          extraLabor: extraLabor || "",
          permitFees: permitFees || "",
          calcsPlans: calcsPlans || "",
          surcharge: surcharge || "",
          subtotal: subtotal || 0,
          taxAmount: taxAmount || 0,
          depositAmount: depositAmount || 0,
          total: total || 0,
          balanceDue: balanceDue || 0,
          buildingType: buildingTypeValue || "",
          buildingId: buildingId || "",
        };
        // Appending form data
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
          }
        }
        const countryCode = Array.isArray(formData.countryCode)
          ? formData.countryCode[0]
          : formData.countryCode;
        formData.append("buildingData", JSON.stringify(buildingData));
        formData.append("installationZipCode", data.installationZipCode);
        formData.append("roofColor", data.roofColor || "");
        formData.append("wallColor", data.wallColor || "");
        formData.append("trimColor", data.trimColor || "");
        formData.append("garbageDoorColor", data.garbageDoorColor || "");
        formData.append("wainsCoat", data.wainsCoat || "");
        formData.append("gaugePanel", data.gaugePanel || "");
        formData.append("jTrim", data.jTrim || "");
        formData.append("extraAnchors", data.extraAnchors || "");
        formData.append("twoTone", data.twoTone || "");
        formData.append("extraBraces", data.extraBraces || "");
        formData.append("extraBow", data.extraBow || "");
        formData.append("trussUpgraded", data.trussUpgraded || "");
        formData.append("coloredScrews", data.coloredScrews || "");
        formData.append("leadData", JSON.stringify(leadData));
        formData.append("buildingData", JSON.stringify(buildingData));
        formData.append("leadBuildingInfo", JSON.stringify(leadBuildingInfo));
        // if (buildingPrice !== undefined && buildingPrice !== null) {
        //   formData.append("buildingPrice", buildingPrice.toString().trim());
        // }
        formData.set("buildingPrice", String(buildingPrice));
        formData.append("subtotal", subtotal?.toString() || "0");
        formData.append("taxPercent", taxPercent.toString().trim());
        formData.append("tax", taxAmount?.toString() || "0");
        formData.append("depositType", depositType?.trim() || "");
        formData.append("deposit", depositVal?.toString() || "0");
        formData.append("grandTotal", total?.toString() || "0");
        formData.append("extraLabor", extraLabor?.toString() || "0");
        formData.append("permitFees", permitFees?.toString() || "0");
        formData.append("calcsAndPlans", calcsPlans?.toString() || "0");
        formData.append("surCharge", surcharge?.toString() || "0");
        formData.append(
          "balanceDueInstallation",
          balanceDue?.toString() || "0"
        );
        formData.append("type", quoteType);
        //---buildingSpecInformation-----
        formData.append(
          "buildingSpecInfo[quoteName]",
          data.buildingSpecInfo.quoteName
        );
        formData.append(
          "buildingSpecInfo[directLine]",
          data.buildingSpecInfo.directLine
        );
        formData.append(
          "buildingSpecInfo[quoteDate]",
          new Date().toISOString()
        );
        formData.append("leadId", leadId);
        console.log("Lead ID:", leadId);

        formData.append("threeDRef", data?.threeDRef?.trim() || "");

        // Debugging----checking form data with detailed logging
        const formDataObj = {};
        for (let pair of formData.entries()) {
          console.log(`[FormData] Key: ${pair[0]}, Value:`, pair[1]);
          formDataObj[pair[0]] = pair[1];
        }

        // Append attachedFiles to formData
        if (
          attachedFiles &&
          Array.isArray(attachedFiles) &&
          attachedFiles.length > 0
        ) {
          console.log("Attached files being appended:", attachedFiles);
          attachedFiles.forEach((file, index) => {
            // Append only File objects to formData
            if (file instanceof File) {
              formData.append("attachments", file);
            }
          });
        }

        await addQuoteApi(
          formData,
          notification,
          async ({ loading, error, newQuoteId }) => {
            if (!error) {
              notification.success("Quote added successfully.........");
              console.log("addQuoteApi callback newQuoteId:", newQuoteId);
              if (newQuoteId) {
                //----- newQuoteId is quoteId, fetching quote data by quoteId--
                getQuoteDataByIdApi(
                  newQuoteId,
                  notification,
                  (loading, error, res) => {
                    console.log("Quote id is:", newQuoteId);
                    if (!error && res) {
                      const quoteData = Array.isArray(res) ? res[0] : res;
                      setQuoteLeadDetails(quoteData);
                      // console.log(
                      //   "Quote data being passed to reFillData:",
                      //   res
                      // );
                      reFillData(quoteData);
                      // console.log("lastest quote is :", quoteData);
                    }
                  }
                );
                const quoteLeadId = leadId || paramsLeadId;
                const quoteIdParam = newQuoteId ? `&quoteId=${newQuoteId}` : "";
                console.log(
                  `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true${quoteIdParam}`
                );
                router.push(
                  `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true${quoteIdParam}`
                );
              }
            }
          }
        );
        //   // await addQuoteApi(
        //   //   formData,
        //   //   notification,
        //   //   async ({ loading, error, newQuoteId }) => {
        //   //     if (!error) {
        //   //       notification.success("Quote added successfully.........");
        //   //       console.log("addQuoteApi callback leadId:", newQuoteId);
        //   //       const quoteLeadId = leadId || paramsLeadId;
        //   //       if (quoteLeadId) {
        //   //         console.log(
        //   //           `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true`
        //   //         );
        //   //         router.push(
        //   //           `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true`
        //   //         );
        //   //       } else {
        //   //         console.error(
        //   //           "leadId is missing in addQuoteApi callback and URL param"
        //   //         );
        //   //         notification.error("Lead ID missing after adding quote.");
        //   //       }
        //   //     }
        //   //   }
        //   // );
      } catch (error) {
        console.error("Error during submission:", error);
      }
    }
  };

  const formValidation = () => {
    let leadOwnerErr = "";
    let leadAssistantErr = "";
    let mobileErr = "";

    if (!addValues?.leadOwner) {
      leadOwnerErr = ValidationMessage?.LEAD_OWNER_REQUIRED;
    }
    if (addValues?.leadAssistant?.length === 0) {
      leadAssistantErr = ValidationMessage?.LEAD_ASSISTANT_REQUIRED;
    }
    if (!phone || phone.trim() === "") {
      mobileErr =
        ValidationMessage?.MOBILE_NUMBER_REQUIRED ||
        "Mobile number is required";
    }

    if (leadOwnerErr || leadAssistantErr || mobileErr) {
      setAddError({
        leadOwnerError: leadOwnerErr,
        leadAssistantError: leadAssistantErr,
        mobileError: mobileErr,
      });
      return false;
    } else {
      setAddError({ leadOwnerError: "", mobileError: "" });
      return true;
    }
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
    <div className={styles.main_div}>
      {loader ? (
        <div className={styles.main_loader}>
          <LottieLoader height={250} width={250} loader={true} />
        </div>
      ) : (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.quote_sec}>
            <div className={styles.quote_navigation}>
              <ul>
                {[
                  "Add Quote",
                  "Lead Details",
                  "Building Specialist Information",
                  "Address Information",
                  "Product Information",
                  "Building Information",
                  "All Quotes",
                  "All Contracts",
                  "Attachments",
                ].map((section, index) => (
                  <li
                    key={section}
                    className={index === activeSection ? styles.active : ""}
                    onClick={() => {
                      if (sectionRefs.current[index]) {
                        sectionRefs.current[index].scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {section}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.quote_right}>
              <div className={styles.quote_form_action}>
                <button className={styles.cancel_button} type="button">
                  <img src="/svg/cancel.svg" alt="No_Cancel_Image" />
                  <span>Cancel</span>
                </button>
                <button
                  className={styles.save_button}
                  type="submit"
                  disabled={addQuoteLoader || stateByZipLoader}
                  style={
                    addQuoteLoader || stateByZipLoader
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                >
                  {addQuoteLoader ? (
                    <Loader height="20px" width="20px" newLoader={true} />
                  ) : (
                    <img src="/svg/save.svg" alt="No_Save_Image" />
                  )}
                  <span>Save</span>
                </button>
              </div>
              <div className={styles.quote_box}>
                <div className={styles.quote_box_input}>
                  <div className={styles.quote_heading}>
                    <h2 ref={(el) => (sectionRefs.current[0] = el)}>
                      Add Quote
                    </h2>
                  </div>

                  <QuoteAddLeadDetails
                    handleChange={handleChange}
                    addValues={addValues}
                    paramsLeadId={paramsLeadId}
                    allLeadDataLoader={allLeadDataLoader}
                    addError={addError}
                    setValue={setValue}
                    watch={watch}
                    register={register}
                    errors={errors}
                    setPhone={setPhone}
                    phone={phone}
                    mobileFieldDisabled={mobileFieldDisabled}
                    LeadDetails={LeadDetails}
                    ProfileStyle={ProfileStyle}
                  />

                  <div
                    className={styles.quote_heading}
                    ref={(el) => (sectionRefs.current[1] = el)}
                  >
                    <h2>Lead Details</h2>
                  </div>

                  <QuoteLeadDetails
                    handleChange={handleChange}
                    addValues={addValues}
                    register={register}
                    errors={errors}
                    emailFieldDisabled={emailFieldDisabled}
                    handleChangeDate={handleChangeDate}
                    ProfileStyle={ProfileStyle}
                    show3DRefInput={
                      addValues?.leadSource?.title === "3D Estimator"
                    }
                  />

                  <div
                    className={styles.quote_heading}
                    ref={(el) => (sectionRefs.current[2] = el)}
                  >
                    <h2>Building Specialist Information</h2>
                  </div>

                  <BuildingSpecialistInformation
                    addValues={addValues}
                    register={register}
                    errors={errors}
                    handleChangeQuoteDate={handleChangeQuoteDate}
                    ProfileStyle={ProfileStyle}
                  />

                  <div
                    className={`${styles.quote_heading} flex w-full justify-between items-center`}
                    ref={(el) => (sectionRefs.current[3] = el)}
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
                    <QuoteAddressDetails
                      setValue={setValue}
                      watch={watch}
                      register={register}
                      errors={errors}
                      stateByZipLoader={stateByZipLoader}
                      getStateByZipCode={getStateByZipCode}
                      ProfileStyle={ProfileStyle}
                    />
                  )}

                  <div
                    className={`${styles.quote_heading} flex w-full justify-between items-center`}
                    ref={(el) => (sectionRefs.current[4] = el)}
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
                    <QuotesProductInformation
                      ProfileStyle={ProfileStyle}
                      setValue={setValue}
                      watch={watch}
                      register={register}
                      errors={errors}
                      watchedValues={watch()}
                    />
                  )}

                  <div
                    className={`${styles.quote_heading} flex w-full justify-between items-center`}
                    ref={(el) => (sectionRefs.current[5] = el)}
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
                  <QuoteBuildingInformation
                    setValue={setValue}
                    watch={watch}
                    register={register}
                    errors={errors}
                    ProfileStyle={ProfileStyle}
                    buildingTypeValue={buildingTypeValue}
                    buildingTypeFieldDisabled={buildingTypeFieldDisabled}
                    visibleBuilding={visibleBuilding}
                    optionsArr={optionsArr}
                    setOptionsArr={setOptionsArr}
                  />
                  <QuoteColorInformation
                    setValue={setValue}
                    watch={watch}
                    register={register}
                    errors={errors}
                  />

                  <div
                    className={`${styles.quote_heading} flex w-full justify-between items-center`}
                    ref={(el) => (sectionRefs.current[6] = el)}
                  >
                    <h2>All Quotes</h2>
                  </div>
                  <div
                    className={`${styles.quote_heading} flex w-full justify-between items-center`}
                    ref={(el) => (sectionRefs.current[7] = el)}
                  >
                    <h2>All Contracts</h2>
                  </div>

                  <div
                    className={` flex w-full justify-between items-center`}
                    ref={(el) => (sectionRefs.current[8] = el)}
                  >
                    {/* <h2>Attachments</h2> */}
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
                </div>
                {/* -------Added updated code for building price calculation------------ */}

                <div className={styles.quote_box_amount}>
                  <div className={styles.form_floating}>
                    <input
                      type="text"
                      id="lead"
                      value={buildingPrice}
                      onChange={(e) => setBuildingPrice(e.target.value)}
                      placeholder="lead*"
                    />
                    <label htmlFor="lead">Building Price*</label>
                  </div>

                  <div className={styles.quote_table}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={styles.bg_white}>
                          <td colSpan="2">Subtotal</td>
                          <td className={styles.price_quote}>
                            {formatUSD(subtotal)}
                          </td>
                        </tr>

                        <tr className={styles.bg_white}>
                          <td>Tax</td>
                          <td>
                            <div className={styles.tag_css}>
                              <div className={styles.percentage_icon}>%</div>
                              <input
                                type="text"
                                value={taxPercent}
                                onChange={(e) => setTaxPercent(e.target.value)}
                              />
                            </div>
                          </td>
                          <td className={styles.price_quote}>
                            {formatUSD(taxAmount)}
                          </td>
                        </tr>

                        <tr className={styles.bg_white}>
                          <td>Deposit</td>
                          <td width="10%">
                            <div className={styles.tag_css}>
                              <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle variant="light" size="sm">
                                  {depositType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item eventKey="%">%</Dropdown.Item>
                                  <Dropdown.Item eventKey="$">$</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <input
                                type="text"
                                value={depositVal}
                                onChange={(e) => setDepositVal(e.target.value)}
                              />
                            </div>
                          </td>
                          <td className={styles.price_quote}>
                            {formatUSD(depositAmount)}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="2">Total</td>
                          <td className={styles.price_quote}>
                            {formatUSD(total)}
                          </td>
                        </tr>

                        <tr className={styles.bg_white}>
                          <td>Extra Labor</td>
                          <td>
                            <div className={styles.tag_css}>
                              <div className={styles.percentage_icon}>$</div>
                              <input
                                type="text"
                                value={extraLabor}
                                onChange={(e) => setExtraLabor(e.target.value)}
                              />
                            </div>
                          </td>
                          <td className={styles.price_quote}>
                            {formatUSD(extraLabor)}
                          </td>
                        </tr>

                        <tr className={styles.bg_white}>
                          <td>Permit Fees</td>
                          <td>
                            <div className={styles.tag_css}>
                              <div className={styles.percentage_icon}>$</div>
                              <input
                                type="text"
                                value={permitFees}
                                onChange={(e) => setPermitFees(e.target.value)}
                              />
                            </div>
                          </td>
                          <td className={styles.price_quote}>
                            {formatUSD(permitFees)}
                          </td>
                        </tr>

                        <tr className={styles.bg_white}>
                          <td>Calcs & Plans</td>
                          <td>
                            <div className={styles.tag_css}>
                              <div className={styles.percentage_icon}>$</div>
                              <input
                                type="text"
                                value={calcsPlans}
                                onChange={(e) => setCalcsPlans(e.target.value)}
                              />
                            </div>
                          </td>
                          <td className={styles.price_quote}>
                            {formatUSD(calcsPlans)}
                          </td>
                        </tr>

                        <tr className={styles.bg_white}>
                          <td>Sur-Charge</td>
                          <td>
                            <div className={styles.tag_css}>
                              <div className={styles.percentage_icon}>%</div>
                              <input
                                type="text"
                                value={surcharge}
                                onChange={(e) => setSurcharge(e.target.value)}
                              />
                            </div>
                          </td>
                          <td className={styles.price_quote}>
                            {formatUSD(
                              (parse(buildingPrice) * parse(surcharge)) / 100
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="2">Balance Due</td>
                          <td className={styles.price_quote}>
                            {formatUSD(balanceDue)}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="2">Deposit</td>
                          <td className={styles.price_quote}>
                            {formatUSD(depositAmount)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ------------------- */}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddQuotes;
