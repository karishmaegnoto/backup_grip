"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
// import styles from "./view-quotes.module.scss";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import { Eye, EyeOff } from "lucide-react";
import QuoteAddLeadDetails from "@/components/quotes/add-quotes/quoteAddLeadDetails";
import LeadContext from "@/hooks/context/LeadContext";
import AuthContext from "@/hooks/context/AuthContext";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { useForm } from "react-hook-form";
import { useSearchParams, useParams } from "next/navigation";
import Loader from "@/components/shared/Loader/Loader";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import QuoteLeadDetails from "@/components/quotes/add-quotes/quoteLeadDetails";
import BuildingSpecialistInformation from "@/components/quotes/add-quotes/buildingSpecialistInformation";
import QuoteAddressDetails from "@/components/quotes/add-quotes/quoteAddressDetails";
import {
  editLeadApi,
  getLeadDataByIdApi,
  getStateByZipApi,
} from "@/hooks/ApisContainer/Lead";
import useToastContext from "@/hooks/useToastContext";
import QuotesProductInformation from "@/components/quotes/add-quotes/quotesProductInformation";
import QuoteBuildingInformation from "@/components/quotes/add-quotes/building/quoteBuildingInformation";
import QuoteColorInformation from "@/components/quotes/add-quotes/building/quoteColorInformation";
import { Dropdown } from "react-bootstrap";
import { getQuoteDataByQuoteIdApi } from "@/hooks/ApisContainer/Quotes";
import { setValuesForHookInEditLead } from "@/helper/helper";
import LeadAttachment from "@/components/lead/add-leads/leadAttachment";

const ViewQuotes = () => {
  const [visibleBuilding, setVisibleBuilding] = useState(true);
  const [visibleAddress, setVisibleAddress] = useState(true);
  const [visibleProductInfo, setVisibleProductInfo] = useState(true);
  const [phone, setPhone] = useState("");
  const [mobileFieldDisabled, setMobileFieldDisabled] = useState(false);
  const [LeadDetails, setLeadDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [emailFieldDisabled, setEmailFieldDisabled] = useState(false);
  const [stateByZipLoader, setStateByZipLoader] = useState(false);
  const [buildingTypeFieldDisabled, setBuildingTypeFieldDisabled] =
    useState(false);
  const [quoteData, setQuoteData] = useState({});
  const [leadId, setLeadId] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachmentType, setAttachmentType] = useState("");
  const [attachmentLoader, setAttachmentLoader] = useState(false);
  const [triggerEditEvent, setTriggerEditEvent] = useState(false);
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

  // ALL STATE
  const [addValues, setAddValues] = useState({
    leadOwner: "",
    leadAssistant: [],
    leadStatus: "",
    leadSource: "",
    leadManufacturer: "",
    dateAndTime: "",
    quoteDateAndTime: "",
    contractDateAndTime: "",
  });
  const [addError, setAddError] = useState({
    leadOwnerError: "",
    leadAssistantError: "",
  });
  const [quoteLeadDetails, setQuoteLeadDetails] = useState({});

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

  const params = useParams();

  //----to get decode url params
  const rawId = decodeURIComponent(params.id || "");
  const quoteId = rawId.split("=")[1] || "";
  console.log("quoteId is:", quoteId);

  const searchParams = useSearchParams();
  const paramsLeadId = searchParams.get("leadId");
  const notification = useToastContext();
  const buildingTypeValue = watch("biBuildingType");
  const { leadAllList, allLeadDataLoader } = useContext(LeadContext);
  const { organizationName } = useContext(AuthContext);

  // let { allLeadDataLoader, leadAllList } = useContext(LeadContext);

  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

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

  const handleChange = (field) => (value) => {
    setAddValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeDate = (dates) => {
    setAddValues((prev) => ({ ...prev, dateAndTime: dates }));
  };

  const handleChangeQuoteDate = (dates) => {
    setAddValues((prev) => ({ ...prev, quoteDateAndTime: dates }));
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

  useEffect(() => {
    leadAllList(notification);
  }, []);

  useEffect(() => {
    if (quoteId) {
      getQuoteDataByQuoteIdApi(quoteId, notification, (loading, error, res) => {
        if (!error) {
          console.log("Fetched quote data:", res);

          setLeadId(res.leadId._id);
          setQuoteData(res);
          reFillData(res, setValue, setOptionsArr, {
            setBuildingPrice,
            setExtraLabor,
            setPermitFees,
            setCalcsPlans,
            setSurcharge,
            setTaxPercent,
            setDepositType,
            setDepositVal,
            setSubTotal,
            setTaxAmount,
            setDepositAmount,
            setTotal,
            setBalanceDue,
            setAddValues,
          });
          // ----reset to populate form with fetched data--------
          reset({
            ...res.leadData,
            buildingSpecInfo: res.buildingSpecInfo || {},
            biInstallationZipCode:
              res.leadData?.buildingData?.installationZipCode || "",
            biSurface: res.leadData?.buildingData?.surface || "",
            biBuildingType: res.leadData?.buildingData?.buildType || "",
            biWidth: res.leadData?.buildingData?.width || "",
            biHeight: res.leadData?.buildingData?.height || "",
            biLength: res.leadData?.buildingData?.length || "",
            biFoundationType: res.leadData?.buildingData?.foundationType || "",
            biCertification: res.leadData?.buildingData?.certification || "",
            biGauge: res.leadData?.buildingData?.gauge || "",
            biRoofStyle: res.leadData?.buildingData?.roofStyle || "",
            biWallSiding: res.leadData?.buildingData?.wallSiding || "",
            biFrontEnd: res.leadData?.buildingData?.frontend || "",
            biBackEnd: res.leadData?.buildingData?.backend || "",
            biLeftEnd: res.leadData?.buildingData?.leftSide || "",
            biRightSide: res.leadData?.buildingData?.rightSide || "",
            mobile: res.leadData?.mobile || res.leadId?.mobile || "",
            threeDRef: res?.leadId?.threeDRefNum || "",
            countryCode: res.leadData?.countryCode || "",
          });
          setPhone(
            (res.leadData?.countryCode || "") + (res.leadData?.mobile || "")
          );
          setAddValues({
            leadOwner: res.leadId?.leadOwner
              ? {
                  value:
                    typeof res.leadId.leadOwner === "object"
                      ? res.leadId.leadOwner._id || ""
                      : res.leadId.leadOwner,
                }
              : { value: "" },
            leadAssistant: Array.isArray(res.leadId?.leadOwnerAssist)
              ? res.leadId.leadOwnerAssist.map((assist) => {
                  const id =
                    typeof assist === "object" ? assist._id || "" : assist;
                  return { value: id };
                })
              : [],
            leadSource: res.leadId?.leadSource
              ? {
                  value:
                    typeof res.leadId.leadSource === "object"
                      ? res.leadId.leadSource._id || ""
                      : res.leadId.leadSource,
                  title:
                    typeof res.leadId.leadSource === "object"
                      ? res.leadId.leadSource.name || ""
                      : "",
                }
              : { value: "" },
            leadStatus: res.leadId?.leadStatus
              ? {
                  value:
                    typeof res.leadId.leadStatus === "object"
                      ? res.leadId.leadStatus._id || ""
                      : res.leadId.leadStatus,
                }
              : { value: "" },
            mobile: res.leadData?.mobile || res.leadId?.mobile || "",
            countryCode: res.leadData?.countryCode || "",
            contractDateAndTime: res.leadData?.contractDateAndTime || "",
            quoteDate: res.buildingSpecInfo?.quoteDate
              ? new Date(res.buildingSpecInfo.quoteDate)
              : null,
          });
        }
      });
    }
  }, [quoteId, notification]);

  useEffect(() => {
    console.log("optionsArr state updated:", optionsArr);
  }, [optionsArr]);

  const reFillData = (data, setValue, setOptionsArr) => {
    if (!data || !setValue) return;

    //  buildingSpecInfo fields
    if (data.buildingSpecInfo) {
      setValue(
        "buildingSpecInfo.quoteName",
        data.buildingSpecInfo.quoteName || ""
      );
      setValue(
        "buildingSpecInfo.directLine",
        data.buildingSpecInfo.directLine || ""
      );
      setValue(
        "buildingSpecInfo.quoteDate",
        data?.buildingSpecInfo?.quoteDate
          ? new Date(data.buildingSpecInfo.quoteDate)
          : null
      );
    }

    // Set building data arrays in optionsArr state
    if (data.leadData?.buildingData) {
      const buildingData = data.leadData.buildingData;

      setOptionsArr({
        garageDoors: buildingData.garbageOption || [],
        garageWalkIns: buildingData.walkInDoorOption || [],
        garageWindowOption: buildingData.windowOption || [],
      });

      // Set individual building fields
      setValue("biInstallationZipCode", buildingData.installationZipCode || "");
      setValue("biSurface", buildingData.surface || "");
      setValue("biBuildingType", buildingData.buildType || "");
      setValue("biWidth", buildingData.width || "");
      setValue("biLength", buildingData.length || "");
      setValue("biHeight", buildingData.height || "");
      setValue("biFoundationType", buildingData.foundationType || "");
      setValue("biCertification", buildingData.certification || "");
      setValue("biGauge", buildingData.gauge || "");
      setValue("biRoofStyle", buildingData.roofStyle || "");
      setValue("biWallSiding", buildingData.wallSiding || "");
      setValue("biFrontEnd", buildingData.frontend || "");
      setValue("biBackEnd", buildingData.backend || "");
      setValue("biLeftEnd", buildingData.leftSide || "");
      setValue("biRightSide", buildingData.rightSide || "");
    }

    // Set 3D Reference Number in form state if present
    setValue("threeDRef", data?.leadId?.threeDRefNum || "");

    // Set countryCode in form state
    setValue("countryCode", data.leadData?.countryCode || "");

    setBuildingPrice(data?.buildingPrice || "");
    setExtraLabor(data?.extraLabor || "");
    setPermitFees(data?.permitFees || "");
    setCalcsPlans(data?.calcsAndPlans || "");
    setSurcharge(data?.surCharge || "");
    setTaxPercent(data?.tax || 0);
    setDepositType(data?.depositType || "%");
    setDepositVal(data?.deposit || "");
    setSubTotal(data?.subtotal || 0);
    setTotal(data?.grandTotal || 0);
    setBalanceDue(data?.balanceDueInstallation || 0);

    //-------fetching leadData-----------
    const leadData = {
      ...data.leadData,
      leadOwner: data.leadId.leadOwner?._id || data.leadData.leadOwner || "",
      leadOwnerAssist:
        data.leadId.leadOwnerAssist?._id ||
        data.leadData.leadOwnerAssist?._id ||
        [],
      leadStatus: data.leadId.leadStatus?._id || data.leadData.leadStatus || "",
      leadSource: data.leadId.leadSource?._id || data.leadData.leadSource || "",
      leadManufacturer: addValues.leadManufacturer?.id || "",
      phone: data.leadId.phone || data.leadData.phone || "",
      email: data.leadId.email || "",
      mobile: data.leadId.mobile || data.leadData.mobile || "",
      countryCode: data.leadId.countryCode || data.leadData.countryCode || "",
      address: data.leadId.address || data.leadData.address || {},
      productInformation:
        data.leadId.productInformation ||
        data.leadData.productInformation ||
        {},
    };

    setValuesForHookInEditLead(setValue, () => {}, leadData, data);

    setAttachedFiles(data?.leadData?.attachment || []);

    console.log(leadData);
  };

  return (
    <div className={styles.main_div}>
      {/* {loader ? (
        <div className={styles.main_loader}>
          <LottieLoader height={250} width={250} loader={true} />
        </div>
      ) : ( */}
      <form action="">
        <div className={styles.quote_sec}>
          <div className={styles.quote_navigation}>
            <ul>
              {[
                "View Quote",
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
            <div className={styles.quote_form_action}></div>
            <div className={styles.quote_box}>
              <div className={styles.quote_box_input}>
                <div className={styles.quote_heading}>
                  <h2 ref={(el) => (sectionRefs.current[0] = el)}>
                    View Quote
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
                  moduleType="view"
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
                  moduleType="view"
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
                  moduleType="view"
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
                    moduleType="view"
                  />
                )}

                <div
                  className={`${styles.quote_heading} flex w-full justify-between items-center`}
                  ref={(el) => (sectionRefs.current[4] = el)}
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
                  <QuotesProductInformation
                    ProfileStyle={ProfileStyle}
                    setValue={setValue}
                    watch={watch}
                    register={register}
                    errors={errors}
                    watchedValues={watch()}
                    moduleType="view"
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
                  moduleType="view"
                />

                <QuoteColorInformation
                  setValue={setValue}
                  ProfileStyle={ProfileStyle}
                  watch={watch}
                  register={register}
                  errors={errors}
                  moduleType="view"
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
                  className={`$ flex w-full justify-between items-center`}
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
                    disabled
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
                              disabled
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
                              <Dropdown.Toggle
                                variant="light"
                                size="sm"
                                disabled
                              >
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
                              disabled
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
                              disabled
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
                              disabled
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
                              disabled
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
      {/* )} */}
    </div>
  );
};

export default ViewQuotes;
