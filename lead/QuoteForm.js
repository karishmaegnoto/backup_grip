"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  getQuoteDataByIdApi,
  editQuoteApi,
  addQuoteApi,
} from "@/hooks/ApisContainer/Quotes";
import { getLeadDataByIdApi } from "@/hooks/ApisContainer/Lead";
import useToastContext from "@/hooks/useToastContext";
import Loader from "@/components/shared/Loader/Loader";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import styles from "./QuoteForm.module.scss";
import { useForm } from "react-hook-form";
import { setValuesForHookInEditLead } from "@/helper/helper";
import AuthContext from "@/hooks/context/AuthContext";

const QuoteForm = ({ quoteDetails, leadId, quoteId }) => {
  const [loader, setLoader] = useState(true);
  const [formData, setFormData] = useState({
    customer_name: "",
    street: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    cell: "",
    email: "",
    quote_date: "",
    quote_name: "",
    direct_line: "",
    quote_email: "",
  });

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

  const buildingTypeValue = watch("biBuildingType");
  const [addValues, setAddValues] = useState({
    leadOwner: "",
    leadAssistant: [],
    leadStatus: "",
    leadSource: "",
    leadManufacturer: "",
    dateAndTime: "",
    quoteDateAndTime: "",
  });

  const [buildingPrice, setBuildingPrice] = useState("");
  const [quoteData, setQuoteData] = useState(null);
  const [items, setItems] = useState([]);
  const [LeadDetails, setLeadDetails] = useState({});
  const [buildingId, setBuildingId] = useState("");
  const [phone, setPhone] = useState("");
  const [calcsPlans, setCalcsPlans] = useState("");
  // const [surcharge, setSurcharge] = useState("");
  const [subtotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [total, setTotal] = useState(0);
  // const [balanceDue, setBalanceDue] = useState(0);
  const [addQuoteLoader, setAddQuoteLoader] = useState(false);
  const [quoteType, setQuoteType] = useState("quickQuote");
  const [quoteLeadDetails, setQuoteLeadDetails] = useState({});

  // States
  const [retailPrice, setRetailPrice] = useState("");
  const [manuDiscountPercent, setManuDiscountPercent] = useState("");
  const [manuDiscountValue, setManuDiscountValue] = useState("");
  // const [subTotal, setSubTotal] = useState("");
  const [depositType, setDepositType] = useState("%");
  const [depositVal, setDepositVal] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("");
  const [downPaymentValue, setDownPaymentValue] = useState("");
  const [lastEditedDownPayment, setLastEditedDownPayment] = useState("percent");
  const [taxPercent, setTaxPercent] = useState("");
  const [taxValue, setTaxValue] = useState("");
  const [extraLabor, setExtraLabor] = useState("");
  const [permitFees, setPermitFees] = useState("");
  const [otherFees, setOtherFees] = useState("");
  const [surcharge, setSurcharge] = useState("");
  const [balanceDue, setBalanceDue] = useState("");

  const notification = useToastContext();
  let { organizationName, user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    if (leadId) {
      getQuoteDataByIdApi(
        leadId,
        {
          error: (msg) => {
            console.error("Notification error:", msg);
          },
          success: (msg) => {
            console.log("Notification success:", msg);
          },
        },
        (loading, error, formData) => {
          if (!loading && !error && formData) {
            const quote = Array.isArray(formData) ? formData[0] : formData;
            if (quote) {
              setFormData({
                customer_name: quote.firstName || "",
                street: quote.address?.line1 || "",
                country: quote.address?.country || "",
                city: quote.address?.city || "",
                state: quote.address?.state || "",
                zipcode: quote.address?.zipCode || "",
                phone: quote.phone || "",
                cell: quote.mobile || "",
                email: quote.email || "",
                quote_name: `${user.firstName} ${user.lastName} ` || "",
                direct_line: "789-456-8742",
                quote_email: user.email || "",
                quote_email: quote.email || "",
                retail_price: quote.buildingPrice || "",
                balanceDueInstallation: quote.balanceDueInstallation || "",
                extraLabor: quote.extraLabor || "",
                permitFees: quote.permitFees || "",
                subtotal: quote.subtotal || "",
                surCharge: quote.surCharge || "",
                tax: quote.tax || "",
                size_s: quote.buildingInformation?.width || "",
                size_h: quote.buildingInformation?.height || "",
                size_w: quote.buildingInformation?.length || "",
                style: quote.buildingInformation?.roofStyle || "",
                gauge: quote.gauge || "",
                certification: quote.buildingInformation?.certification || "",
                color_roof: quote.roofColor || "",
                color_trim: quote.trimColor || "",
                surface_type: quote.buildingInformation?.foundationType || "",
              });
              setQuoteData(quote);
              setRetailPrice(quote.buildingPrice || "");
              setTaxValue(quote.tax || "");
              setExtraLabor(quote.extraLabor || "");
              setPermitFees(quote.permitFees || "");
              setOtherFees(quote.otherFess || "");
              setSurcharge(quote.surCharge || "");
              setSubTotal(quote.subtotal || "");
              setTaxPercent(quote.taxPercent || "");
              setLoader(false);

              // Map buildingData fields to items array for display in items table
              const buildingData = quote.leadData?.buildingData || {};
              const baseItems = [
                {
                  description: `${buildingData.width || ""}' X ${
                    buildingData.length || ""
                  }' Base`,
                  qty: "",
                  price: "",
                },
                {
                  description: `${buildingData.height} 'Height`,
                  qty: "",
                  price: "",
                },
                {
                  description: `Left Side: ${
                    buildingData.leftSide || ""
                  }  Right Side: ${buildingData.rightSide || ""}`,
                  qty: "",
                  price: "",
                },

                {
                  description: `Front end: ${
                    buildingData.frontend || ""
                  } Back end: ${buildingData.backend || ""}`,
                  qty: "",
                  price: "",
                },
              ];

              // garageRows--------
              const garageRows =
                buildingData.garbageOption?.map((opt) => ({
                  description: [
                    `Garage Door  Side end: ${opt.sideEnd || "N/A"}, Qty: ${
                      opt.qty || 0
                    }`,
                    opt.certification
                      ? ` Certified:  ${opt.certification}`
                      : null,
                    opt.size ? ` Garage size: ${opt.size}` : null,
                  ]
                    .join("")
                    .trim(),
                  qty: opt.qty || 0,
                  price: "",
                })) || [];

              // walkInDoorOptions--------
              const walkInDoorOptions =
                buildingData.walkInDoorOption?.map((opt) => ({
                  description: [
                    `WalkInDoor Chain Host: ${opt.chainHoist}, Qty: ${
                      opt.qty || 0
                    }`,
                    opt.color ? ` Color: ${opt.color}` : null,
                    opt.custom ? ` Custom: ${opt.custom}` : null,
                    opt.dutch ? ` Dutch Door: ${opt.dutch}` : null,
                    opt.notes ? ` Notes: ${opt.notes}` : null,
                    opt.walkInDoor ? `  WalkInDoor: ${opt.walkInDoor}` : null,
                    opt.size ? ` size: ${opt.size}` : null,
                  ]
                    .join("")
                    .trim(),
                  qty: opt.qty || 0,
                  price: "",
                })) || [];

              //windowOptions----
              const windowOption =
                buildingData.windowOption?.map((opt) => ({
                  description: [
                    `WalkInDoor Chain Host: ${opt.chainHoist}, Qty: ${
                      opt.qty || 0
                    }`,

                    opt.custom ? ` Custom: ${opt.custom}` : null,
                    opt.dutch ? ` Dutch: ${opt.dutch}` : null,
                    opt.notes ? ` Notes: ${opt.notes}` : null,
                    opt.window ? ` Window: ${opt.window}` : null,
                    opt.size ? `  size: ${opt.size}` : null,
                  ]
                    .join("")
                    .trim(),
                  qty: opt.qty || 0,
                  price: "",
                })) || [];

              const extraItems = [
                {
                  description: `Gauge Panel: ${quote.gaugePanel}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Colored Screws: ${quote.coloredScrews}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `JTrim: ${quote.jTrim}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Extra Braces: ${quote.extraBraces}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Two Tone: ${quote.twoTone}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Extra Anchors: ${quote.extraAnchors}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `TrussUpgraded: ${quote.trussUpgraded}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `extraBow: ${quote.extraBow}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description:
                    `WallSiding: ${quote.buildingData?.wallSiding}` || "",
                  qty: "",
                  price: "",
                },
              ];
              const totalItems = [
                ...baseItems,
                ...garageRows,
                ...walkInDoorOptions,
                ...windowOption,
                ...extraItems,
              ];

              const newItems = totalItems.map((item, index) => ({
                ...item,
                item: index + 1,
              }));

              setItems(newItems);
            } else {
              setTimeout(() => {
                setLoader(false);
              }, 2000);
            }
          }
        }
      );
    }
  }, [leadId]);

  //to fetch all the lead details and set it to the formData

  const today = new Date();
  useEffect(() => {
    if (leadId) {
      getLeadDataByIdApi(
        leadId,
        {
          error: (msg) => {
            console.error("Notification error:", msg);
          },
          success: (msg) => {
            console.log("Notification success:", msg);
          },
        },
        (loading, error, formData) => {
          if (!loading && !error && formData) {
            const lead = Array.isArray(formData) ? formData[0] : formData;
            if (lead) {
              setFormData({
                customer_name: lead.firstName || "",
                street: lead.address?.line1 || "",
                country: lead.address?.country || "",
                city: lead.address?.city || "",
                state: lead.address?.state || "",
                zipcode: lead.address?.zipCode || "",
                phone: lead.phone || "",
                cell: lead.mobile || "",
                email: lead.email || "",
                quote_date: `${String(today.getMonth() + 1).padStart(
                  2,
                  "0"
                )}/${String(today.getDate()).padStart(2, "0")}/${String(
                  today.getFullYear()
                ).slice(-2)}`,
                quote_name: `${user.firstName} ${user.lastName} ` || "",
                direct_line: "789-456-8742",
                quote_email: user.email || "",
                retail_price: lead.buildingPrice || "",
                balanceDueInstallation: lead.balanceDueInstallation || "",
                extraLabor: lead.extraLabor || "",
                permitFees: lead.permitFees || "",
                subtotal: lead.subtotal || "",
                surcharge: lead.surcharge || "",
                tax: lead.tax || "",
                size_s: lead.buildingInformation?.width || "",
                size_h: lead.buildingInformation?.height || "",
                size_w: lead.buildingInformation?.length || "",
                style: lead.buildingInformation?.roofStyle || "",
                gauge: lead.buildingInformation?.gauge || "",
                certification: lead.buildingInformation?.certification || "",
                color_roof: lead.roofColor || "",
                color_trim: lead.trimColor || "",
                surface_type: lead.buildingInformation?.foundationType || "",
              });
              // setQuoteData(quote);
              // setRetailPrice(quote.buildingPrice || "");
              // setTaxValue(quote.tax || "");
              // setExtraLabor(quote.extraLabor || "");
              // setPermitFees(quote.permitFees || "");
              // setOtherFees(quote.otherFess || "");
              // setSurcharge(quote.surCharge || "");
              // setSubTotal(quote.subtotal || "");
              // setTaxPercent(quote.taxPercent || "");
              setLoader(false);

              // Map buildingData fields to items array for display in items table
              const buildingInformation = lead?.buildingInformation || {};

              const baseItems = [
                {
                  description: `${buildingInformation.width || ""}' X ${
                    buildingInformation.length || ""
                  }' Base`,
                  qty: "",
                  price: "",
                },
                {
                  description: `${buildingInformation.height} 'Height`,
                  qty: "",
                  price: "",
                },
                {
                  description: `Left Side: ${
                    buildingInformation.leftSide || ""
                  }  Right Side: ${buildingInformation.rightSide || ""}`,
                  qty: "",
                  price: "",
                },

                {
                  description: `Front end: ${
                    buildingInformation.frontend || ""
                  } Back end: ${buildingInformation.backend || ""}`,
                  qty: "",
                  price: "",
                },
              ];

              // garageRows--------
              const garageRows =
                buildingInformation.garbageOption?.map((opt) => ({
                  description: [
                    `Garage Door  Side end: ${opt.sideEnd || "N/A"}, Qty: ${
                      opt.qty || 0
                    }`,
                    opt.certification
                      ? ` Certified:  ${opt.certification}`
                      : null,
                    opt.size ? ` Garage size: ${opt.size}` : null,
                  ]
                    .join("")
                    .trim(),
                  qty: opt.qty || 0,
                  price: "",
                })) || [];

              // walkInDoorOptions--------
              const walkInDoorOptions =
                buildingInformation.walkInDoorOption?.map((opt) => ({
                  description: [
                    `WalkInDoor Chain Host: ${opt.chainHoist}, Qty: ${
                      opt.qty || 0
                    }`,
                    opt.color ? ` Color: ${opt.color}` : null,
                    opt.custom ? ` Custom: ${opt.custom}` : null,
                    opt.dutch ? ` Dutch Door: ${opt.dutch}` : null,
                    opt.notes ? ` Notes: ${opt.notes}` : null,
                    opt.walkInDoor ? `  WalkInDoor: ${opt.walkInDoor}` : null,
                    opt.size ? ` size: ${opt.size}` : null,
                  ]
                    .join("")
                    .trim(),
                  qty: opt.qty || 0,
                  price: "",
                })) || [];

              //windowOptions----
              const windowOption =
                buildingInformation.windowOption?.map((opt) => ({
                  description: [
                    `WalkInDoor Chain Host: ${opt.chainHoist}, Qty: ${
                      opt.qty || 0
                    }`,

                    opt.custom ? ` Custom: ${opt.custom}` : null,
                    opt.dutch ? ` Dutch: ${opt.dutch}` : null,
                    opt.notes ? ` Notes: ${opt.notes}` : null,
                    opt.window ? ` Window: ${opt.window}` : null,
                    opt.size ? `  size: ${opt.size}` : null,
                  ]
                    .join("")
                    .trim(),
                  qty: opt.qty || 0,
                  price: "",
                })) || [];

              const extraItems = [
                {
                  description: `Gauge Panel: ${lead.gaugePanel}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Colored Screws: ${lead.coloredScrews}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `JTrim: ${lead.jTrim}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Extra Braces: ${lead.extraBraces}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Two Tone: ${lead.twoTone}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `Extra Anchors: ${lead.extraAnchors}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `TrussUpgraded: ${lead.trussUpgraded}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description: `extraBow: ${lead.extraBow}` || "",
                  qty: "",
                  price: "",
                },
                {
                  description:
                    `WallSiding: ${lead.buildingInformation.wallSiding}` || "",
                  qty: "",
                  price: "",
                },
              ];
              const totalItems = [
                ...baseItems,
                ...garageRows,
                ...walkInDoorOptions,
                ...windowOption,
                ...extraItems,
              ];

              const newItems = totalItems.map((item, index) => ({
                ...item,
                item: index + 1,
              }));

              setItems(newItems);
            } else {
              setTimeout(() => {
                setLoader(false);
              }, 2000);
            }
          }
        }
      );
    }
  }, [leadId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      if (!newItems[index]) {
        newItems[index] = { item: "", description: "", qty: "", price: "" };
      }
      newItems[index][field] = value;
      return newItems;
    });
  };

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

    // setAttachedFiles(data?.attachment || []);
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
    // if (buildingInfo) {
    //   setOptionsArr({
    //     garageDoors,
    //     garageWalkIns,
    //     garageWindowOption,
    //   });
    // }
  };

  const onSubmit = async (data) => {
    // const isValid = formValidation();

    if (!leadId) {
      notification.error("Lead ID is missing. Cannot submit the quote.");
      return;
    }

    // if (isValid) {
    try {
      setLoader(true);
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
        buildingPrice: retailPrice || "",
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
      formData.append("balanceDueInstallation", balanceDue?.toString() || "0");
      formData.append("type", "quickQuote");
      //---buildingSpecInformation-----
      formData.append(
        "buildingSpecInfo[quoteName]",
        data.buildingSpecInfo.quoteName
      );
      formData.append(
        "buildingSpecInfo[directLine]",
        data.buildingSpecInfo.directLine
      );
      formData.append("buildingSpecInfo[quoteDate]", new Date().toISOString());
      formData.append("leadId", leadId);
      console.log("Lead ID:", leadId);

      formData.append("threeDRef", data?.threeDRef?.trim() || "");

      // Debugging----checking form data with detailed logging
      const formDataObj = {};
      for (let pair of formData.entries()) {
        console.log(`[FormData] Key: ${pair[0]}, Value:`, pair[1]);
        formDataObj[pair[0]] = pair[1];
      }

      await addQuoteApi(
        formData,
        notification,
        async ({ loading, error, newQuoteId }) => {
          setLoader(false);
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
                    fetchLeadDataByLeadId();
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
              console.log("Quote is added Successfully");
              // console.log(
              //   `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true${quoteIdParam}`
              // );
              // router.push(
              //   `/${organizationName}/leads/edit-lead/${quoteLeadId}?quoteAdded=true${quoteIdParam}`
              // );
            }
          }
        }
      );
    } catch (error) {
      setLoader(false);
      console.error("Error during submission:", error);
    }
    // }
  };

  const fetchLeadDataByLeadId = (type) => {
    getLeadDataByIdApi(leadId, notification, (loading, error, res) => {
      !type && setLoader(true);
      if (!error) {
        if (res) {
          setLeadDetails(res);
          reFillData(res);
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

  useEffect(() => {
    if (leadId) {
      fetchLeadDataByLeadId();
    }
  }, [leadId]);

  const handleRetailPriceChange = (e) => setRetailPrice(e.target.value);
  const handleManuDiscountPercentChange = (e) =>
    setManuDiscountPercent(e.target.value);
  const handleManuDiscountValueChange = (e) =>
    setManuDiscountValue(e.target.value);
  const handleDownPaymentPercentChange = (e) => {
    const value = e.target.value;
    setLastEditedDownPayment("percent");
    setDownPaymentPercent(value);

    // Calculate downPaymentValue based on new percent and current subtotal
    const percentNum = parseFloat(value);
    const subTotalNum = parseFloat(subtotal);
    if (!isNaN(percentNum) && !isNaN(subTotalNum)) {
      const calculatedValue = (subTotalNum * percentNum) / 100;
      setDownPaymentValue(calculatedValue.toFixed(2));
    } else {
      setDownPaymentValue("");
    }
  };

  const handleDownPaymentValueChange = (e) => {
    const value = e.target.value;
    setLastEditedDownPayment("value");
    setDownPaymentValue(value);

    // Calculate downPaymentPercent based on new value and current subtotal
    const valueNum = parseFloat(value);
    const subTotalNum = parseFloat(subtotal);
    if (!isNaN(valueNum) && !isNaN(subTotalNum) && subTotalNum !== 0) {
      const calculatedPercent = (valueNum / subTotalNum) * 100;
      setDownPaymentPercent(calculatedPercent.toFixed(2));
    } else {
      setDownPaymentPercent("");
    }
  };
  const handleDepositTypeChange = (e) => setDepositType(e.target.value);
  const handleTaxPercentChange = (e) => {
    const value = e.target.value;
    setTaxPercent(value);
    if (value === "") {
      setTaxValue("");
    }
  };
  const handleTaxValueChange = (e) => setTaxValue(e.target.value);
  const handleExtraLaborChange = (e) => setExtraLabor(e.target.value);
  const handlePermitFeesChange = (e) => setPermitFees(e.target.value);
  const handleOtherFeesChange = (e) => setOtherFees(e.target.value);
  const handleSurchargeChange = (e) => setSurcharge(e.target.value);

  // Calculation function------------------
  const parse = (val) => {
    if (!val) return 0;
    // Remove commas before parsing
    const cleaned = val.toString().replace(/,/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatPrice = (value) => {
    if (!value) return "";
    let val = value.toString();

    // Remove commas
    val = val.replace(/,/g, "");

    // Remove trailing .00 if any
    val = val.replace(/\.00$/, "");

    // Handle multiple dots
    const dotCount = (val.match(/\./g) || []).length;
    if (dotCount > 1) {
      val = val.substring(0, val.lastIndexOf("."));
    }

    // Add .00 if no decimal
    if (val !== "" && !val.includes(".")) {
      val = val + ".00";
    }

    // Limit to 2 decimal places
    const parts = val.split(".");
    if (parts.length === 2 && parts[1].length > 2) {
      val = parts[0] + "." + parts[1].substring(0, 2);
    }

    // Add commas for thousands
    const [intPart, decPart] = val.split(".");
    const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart ? intFormatted + "." + decPart : intFormatted;
  };

  // Handlers to format price inputs on blur
  const handlePriceBlur = (setter) => (e) => {
    const formatted = formatPrice(e.target.value);
    setter(formatted);
  };

  const calculateValues = () => {
    const price = parse(retailPrice);
    const manuDiscountPerc = parse(manuDiscountPercent);
    const manuDiscountVal = parse(manuDiscountValue);
    const downPaymentPerc = parse(downPaymentPercent);
    const downPaymentVal = parse(downPaymentValue);
    const taxPerc = parse(taxPercent);
    const extraLaborVal = parse(extraLabor);
    const permitFeesVal = parse(permitFees);
    const otherFeesVal = parse(otherFees);
    const surchargeVal = parse(surcharge);

    // Calculate manufacturer discount value if percent is given
    let calculatedManuDiscountValue = manuDiscountVal;
    if (manuDiscountPercent !== "") {
      calculatedManuDiscountValue = (price * manuDiscountPerc) / 100;
      setManuDiscountValue(formatPrice(calculatedManuDiscountValue.toFixed(2)));
    }

    // Calculate subtotal after manufacturer discount
    const subtotalAfterDiscount = price - calculatedManuDiscountValue;

    // Calculate tax value if percent is given
    let calculatedTaxValue = taxValue;
    if (taxPercent !== "") {
      calculatedTaxValue = (subtotalAfterDiscount * taxPerc) / 100;
      setTaxValue(formatPrice(calculatedTaxValue.toFixed(2)));
    }

    // Calculate subtotal including tax and other fees
    const updatedSubTotal = subtotalAfterDiscount + calculatedTaxValue;
    setSubTotal(formatPrice(Number(updatedSubTotal).toFixed(2)));

    // Calculate down payment based on last edited field and depositType
    if (depositType === "%") {
      if (lastEditedDownPayment === "percent") {
        // Calculate downPaymentValue from downPaymentPercent
        const calculatedDownPaymentValue = (price * downPaymentPerc) / 100;
        setDownPaymentValue(formatPrice(calculatedDownPaymentValue.toFixed(2)));
      } else if (lastEditedDownPayment === "value") {
        // Calculate downPaymentPercent from downPaymentValue
        if (updatedSubTotal !== 0) {
          const calculatedDownPaymentPercent =
            (downPaymentVal / updatedSubTotal) * 100;
          setDownPaymentPercent(calculatedDownPaymentPercent.toFixed(2));
        }
      }
    } else if (depositType === "$") {
      //Calculate downPaymentPercent from downPaymentValue and subtotal
      if (updatedSubTotal !== 0) {
        const calculatedDownPaymentPercent =
          (downPaymentVal / updatedSubTotal) * 100;
        setDownPaymentPercent(calculatedDownPaymentPercent.toFixed(2));
      }
    }

    // Calculate total after down payment
    const totalAfterDeposit =
      updatedSubTotal - parseFloat(downPaymentValue || "0");

    // Calculate balance due including extra labor, permit fees, surcharge
    const balance =
      totalAfterDeposit +
      extraLaborVal +
      permitFeesVal +
      surchargeVal +
      otherFeesVal;

    setBalanceDue(balance.toFixed(2));
  };

  useEffect(() => {
    calculateValues();
  }, [
    retailPrice,
    manuDiscountPercent,
    manuDiscountValue,
    downPaymentPercent,
    downPaymentValue,
    depositType,
    taxPercent,
    taxValue,
    extraLabor,
    permitFees,
    otherFees,
    surcharge,
  ]);

  return (
    <div>
      {/* {loader ? (
        <div className={styles.main_loader}>
          <LottieLoader height={200} width={200} loader={true} />
        </div>
      ) : ( */}
      <div
        style={{
          width: "50%",
          // display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "10vw",
          margin: "30px",
          marginRight: "200px",
          marginLeft: "500px",
          padding: "20px",
          backgroundColor: "#ffffff",
          border: "1px solid #ddd",
        }}
      >
        <form
          action="/quote/save-quick-quote"
          method="post"
          formData-toggle="validator"
          id="quick_quote"
          name="new_lead"
          encType="multipart/form-data"
          style={{
            width: "20%",
            minWidth: "10vw",
            minHeight: "100vh",
            margin: "20px auto",
            padding: "5px",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "12px",
            clear: "both",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" name="lead_id" value={leadId} />
          <input type="hidden" name="quote_pdf_id" value="" />
          <input type="hidden" name="is_quickquote" value="1" />

          {/* Header */}
          <div
            style={{
              width: "100%",
              clear: "both",
              position: "relative",
              display: "block",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "45%",
                float: "left",
                lineHeight: "20px",
                fontSize: "14px",
              }}
            >
              <h1
                style={{
                  color: "#16a2b9",
                  fontWeight: 600,
                  fontSize: "28px",
                  fontWeight: "600",
                }}
              >
                Quote Form
              </h1>
              <p style={{ margin: 0 }}>
                <a
                  href="http://www.vikingsteelstructures.com"
                  style={{ color: "#000000", textDecoration: "none" }}
                >
                  www.vikingsteelstructures.com
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <a
                  href="mailto:sales@vikingsteelstructures.com"
                  style={{ color: "#000000", textDecoration: "none" }}
                >
                  sales@vikingsteelstructures.com
                </a>
              </p>
            </div>
            <div
              style={{
                width: "55%",
                float: "left",
                padding: "0px 15px",
                borderCollapse: "collapse",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/svg/viking-steel-structures-logo.svg"
                alt="Viking Steel Structures"
                style={{
                  width: "100%",
                  float: "left",
                  height: "100px",
                  marginBottom: 0,
                }}
              />
            </div>
            <div style={{ clear: "both" }}></div>
          </div>

          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "12px",
              fontFamily: "'Roboto', sans-serif",
              marginTop: "10px",
              padding: "5px 0px",
            }}
          >
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "70%" }}>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 0,
                      padding: "5px 0px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          colSpan={6}
                          style={{
                            background: "#16a2b9",
                            padding: "5px",
                            textAlign: "left",
                            color: "#fff",
                            fontWeight: "normal",
                          }}
                        >
                          Customer Information
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ width: "10%" }}>Name</td>
                        <td style={{ width: "90%" }} colSpan={5}>
                          <input
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                              fontSize: "12px",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "10%" }}>Street</td>
                        <td style={{ width: "40%" }}>
                          <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                        <td style={{ width: "10%" }}>Country</td>
                        <td colSpan={4}>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "10%" }}>City</td>
                        <td style={{ width: "40%" }}>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                        <td style={{ width: "10%" }}>State</td>
                        <td>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                        <td style={{ width: "10%" }}>Zip</td>
                        <td>
                          <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "10%" }}>Phone</td>
                        <td style={{ width: "40%" }}>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                        <td style={{ width: "10%" }}>Cell</td>
                        <td colSpan={4}>
                          <input
                            type="text"
                            name="cell"
                            value={formData.cell}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "10%" }}>Email</td>
                        <td style={{ width: "90%" }} colSpan={5}>
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: 0,
                      padding: "5px 0px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          colSpan={6}
                          style={{
                            background: "#16a2b9",
                            padding: "5px",
                            textAlign: "left",
                            color: "#fff",
                            fontWeight: "normal",
                          }}
                        >
                          Building Specialist Information
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>Quote Date</td>
                        <td style={{ width: "70%" }} colSpan={5}>
                          <input
                            type="text"
                            name="quote_date"
                            value={formData.quote_date}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "30%" }}>Name</td>
                        <td style={{ width: "70%" }} colSpan={5}>
                          <input
                            type="text"
                            name="quote_name"
                            value={formData.quote_name}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "30%" }}>Direct Line</td>
                        <td style={{ width: "70%" }} colSpan={5}>
                          <input
                            type="text"
                            name="direct_line"
                            value={formData.direct_line}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "30%" }}>Email</td>
                        <td style={{ width: "70%" }} colSpan={5}>
                          <input
                            type="text"
                            name="quote_email"
                            value={formData.quote_email}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "100%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "100%" }} colSpan={6}>
                          <input
                            type="text"
                            name="quote_msg"
                            value=""
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "95%",
                              minHeight: "20px",
                              borderBottom: "1px solid #000000",
                              marginLeft: "5px",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          {/*---- Secondary Table---- */}

          <div style={{ clear: "both" }}></div>

          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "12px",
              fontFamily: "'Roboto', sans-serif",
              marginTop: 0,
              padding: "5px 0px",
            }}
          >
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "33.33%", padding: "5px" }}>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: "10px",
                      padding: "5px 5px",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th
                          colSpan={5}
                          style={{
                            backgroundColor: "#cccccc",
                            color: "#000000",
                            padding: "5px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "11px",
                            minHeight: "36px",
                          }}
                        >
                          Lot must be level, no more than 3" off-level, and
                          clear of obstacles or unit may not be installed.
                        </th>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#666666",
                            width: "10%",
                            position: "relative",
                          }}
                          rowSpan={4}
                        >
                          <span
                            style={{
                              transform: "rotate(-90deg)",
                              display: "block",
                              position: "absolute",
                              left: "-8px",
                              color: "#fff",
                              bottom: "20px",
                            }}
                          >
                            Building
                          </span>
                        </td>
                        <td style={{ fontSize: "12px" }}>Size</td>
                        <td
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                            textAlign: "center",
                            width: "25%",
                            position: "relative",
                            fontSize: "12px",
                          }}
                        >
                          <input
                            type="text"
                            name="size_s"
                            value={formData.size_s || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "left",
                              width: "57%",
                              minHeight: "20px",
                              margin: 0,
                              textAlign: "right",
                              fontSize: "12px",
                            }}
                          />
                          <span
                            style={{
                              float: "right",
                              display: "block",
                              textAlign: "center",
                              marginTop: "7px",
                              position: "absolute",
                              right: "6px",
                              top: 0,
                            }}
                          >
                            ' W
                          </span>
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                            textAlign: "center",
                            width: "25%",
                            position: "relative",
                            fontSize: "12px",
                          }}
                        >
                          <input
                            type="text"
                            name="size_w"
                            value={formData.size_w || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "left",
                              width: "57%",
                              minHeight: "20px",
                              margin: 0,
                              textAlign: "right",
                              fontSize: "12px",
                            }}
                          />
                          <span
                            style={{
                              float: "right",
                              display: "block",
                              textAlign: "center",
                              marginTop: "7px",
                              position: "absolute",
                              right: "6px",
                              top: 0,
                            }}
                          >
                            ' L
                          </span>
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                            textAlign: "center",
                            width: "25%",
                            position: "relative",
                            fontSize: "12px",
                          }}
                        >
                          <input
                            type="text"
                            name="size_h"
                            value={formData.size_h || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "left",
                              width: "57%",
                              minHeight: "20px",
                              margin: 0,
                              textAlign: "right",
                              fontSize: "12px",
                            }}
                          />
                          <span
                            style={{
                              float: "right",
                              display: "block",
                              textAlign: "center",
                              marginTop: "7px",
                              position: "absolute",
                              right: "6px",
                              top: 0,
                            }}
                          >
                            ' H
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td style={{ fontSize: "12px" }}>Style</td>
                        <td
                          colSpan={4}
                          style={{ borderBottom: "1px solid #000000" }}
                        >
                          <input
                            type="text"
                            name="style"
                            value={formData.style || ""}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "95%",
                              minHeight: "20px",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td style={{ fontSize: "12px" }}>Gauge</td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="checkbox"
                            name="gauge_12"
                            value="1"
                            checked={formData.gauge === "12"}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                gauge: e.target.checked ? "12" : "",
                              }))
                            }
                            style={{ fontSize: "12px" }}
                          />
                          <span
                            style={{
                              marginTop: "3px",
                              display: "block",
                              width: "79%",
                              float: "right",
                              fontSize: "12px",
                            }}
                          >
                            12 GA.
                          </span>
                        </td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            width: "30%",
                            height: "24px",
                          }}
                        >
                          <input
                            type="checkbox"
                            name="gauge_14"
                            value="14"
                            checked={formData.gauge === "14"}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                gauge: e.target.checked ? "14" : "",
                              }))
                            }
                            style={{ fontSize: "12px" }}
                          />
                          <span
                            style={{
                              marginTop: "3px",
                              display: "block",
                              width: "64%",
                              float: "right",
                              fontSize: "12px",
                            }}
                          >
                            14 GA.
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={2} style={{ fontSize: "12px" }}>
                          Certification
                        </td>
                        <td
                          colSpan={3}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="text"
                            name="gauge_certification"
                            value={formData.certification || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "left",
                              width: "100%",
                              minHeight: "20px",
                              marginRight: 0,
                              fontSize: "12px",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td style={{ width: "33.33%", padding: "5px" }}>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: "10px",
                      padding: "5px 5px",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th
                          colSpan={5}
                          style={{
                            backgroundColor: "#cccccc",
                            color: "#000000",
                            padding: "5px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "11px",
                            minHeight: "36px",
                            height: "24px",
                          }}
                        >
                          5% return trip fee if lot is unleveled and unit cannot
                          be installed
                        </th>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#666666",
                            width: "10%",
                            position: "relative",
                            height: "24px",
                          }}
                          rowSpan={4}
                        >
                          <span
                            style={{
                              transform: "rotate(-90deg)",
                              display: "block",
                              position: "absolute",
                              left: "-5px",
                              color: "#fff",
                              bottom: "16px",
                            }}
                          >
                            Colors
                          </span>
                        </td>
                        <td>Roof</td>
                        <td
                          colSpan={4}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="text"
                            name="color_roof"
                            value={formData.color_roof || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "right",
                              width: "95%",
                              minHeight: "20px",
                              marginRight: 0,
                              fontSize: "12px",
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Side(s)</td>
                        <td
                          colSpan={4}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="text"
                            name="color_side"
                            value={formData.color_side || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "right",
                              width: "95%",
                              minHeight: "20px",
                              marginRight: 0,
                              fontSize: "12px",
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>End(s)</td>
                        <td
                          colSpan={4}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="text"
                            name="color_end"
                            value={formData.color_end || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "right",
                              width: "95%",
                              minHeight: "20px",
                              marginRight: 0,
                              fontSize: "12px",
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Trim</td>
                        <td
                          colSpan={4}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="text"
                            name="color_trim"
                            value={formData.color_trim || ""}
                            onChange={handleChange}
                            style={{
                              border: "none",
                              float: "right",
                              width: "95%",
                              minHeight: "20px",
                              marginRight: 0,
                              fontSize: "12px",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td
                  style={{
                    width: "33.33%",
                    padding: "5px",
                    verticalAlign: "sub",
                  }}
                >
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: "10px",
                      padding: "5px 5px",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th
                          colSpan={5}
                          style={{
                            backgroundColor: "#cccccc",
                            color: "#000000",
                            padding: "5px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "11px",
                            minHeight: "36px",
                            height: "24px",
                          }}
                        >
                          Note that frame is 1ft shorter than roof length
                        </th>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#666666",
                            width: "10%",
                            position: "relative",
                            height: "24px",
                            fontSize: "12px",
                          }}
                          rowSpan={4}
                        >
                          <span
                            style={{
                              transform: "rotate(-90deg)",
                              display: "block",
                              position: "absolute",
                              left: "-10px",
                              color: "#fff",
                              bottom: "22px",
                            }}
                          >
                            Property
                          </span>
                        </td>
                        <td
                          style={{
                            width: "33%",
                            height: "24px",
                            fontSize: "12px",
                          }}
                        >
                          Surface Type
                        </td>
                        <td
                          colSpan={4}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="text"
                            name="surface_type"
                            value={formData.surface_type || ""}
                            onChange={handleChange}
                            style={{
                              fontSize: "12px",
                              border: "none",
                              float: "right",
                              width: "95%",
                              minHeight: "20px",
                              marginRight: 0,
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "12px" }}>Lot ready?</td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="radio"
                            name="lot_ready"
                            value="1"
                            checked={formData.lot_ready === "1"}
                            onChange={handleChange}
                            style={{ fontSize: "12px" }}
                          />{" "}
                          Yes
                        </td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            width: "30%",
                            height: "24px",
                          }}
                        >
                          <input
                            type="radio"
                            name="lot_ready"
                            value="2"
                            checked={formData.lot_ready === "2"}
                            onChange={handleChange}
                            style={{ fontSize: "12px" }}
                          />{" "}
                          No
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "12px" }}>Lot leveled?</td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="radio"
                            name="lot_leveled"
                            value="1"
                            checked={formData.lot_leveled === "1"}
                            onChange={handleChange}
                            style={{ fontSize: "12px" }}
                          />{" "}
                          Yes
                        </td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            width: "30%",
                            height: "24px",
                          }}
                        >
                          <input
                            type="radio"
                            name="lot_leveled"
                            value="2"
                            checked={formData.lot_leveled === "2"}
                            onChange={handleChange}
                            style={{ fontSize: "12px" }}
                          />{" "}
                          No
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "12px" }}>Electricity?</td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            height: "24px",
                          }}
                        >
                          <input
                            type="radio"
                            name="electricity"
                            value="1"
                            checked={formData.electricity === "1"}
                            onChange={handleChange}
                            style={{ fontSize: "12px" }}
                          />{" "}
                          Yes
                        </td>
                        <td
                          colSpan={2}
                          style={{
                            borderBottom: "1px solid #000000",
                            width: "30%",
                            height: "24px",
                          }}
                        >
                          <input
                            type="radio"
                            name="electricity"
                            value="2"
                            checked={formData.electricity === "2"}
                            onChange={handleChange}
                            style={{ fontSize: "12px" }}
                          />{" "}
                          No
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Item Table + Total Section */}

          <div style={{ clear: "both" }}></div>

          <div style={{ clear: "both" }}></div>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "12px",
              fontFamily: "'Roboto', sans-serif",
              marginTop: "0px",
              padding: "5px 0px",
              background: "#16a2b9",
            }}
          >
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    width: "75%",
                    verticalAlign: "top",
                    border: "1px solid #000",
                    padding: "0px",
                  }}
                >
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: "0px",
                      padding: "5px 0px",
                      background: "#fff",
                      border: "1px solid #000000",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            background: "#16a2b9",
                            color: "#fff",
                            width: "10%",
                            border: "1px solid #000000",
                          }}
                        >
                          Item
                        </th>
                        <th
                          style={{
                            background: "#16a2b9",
                            color: "#fff",
                            width: "50%",
                            border: "1px solid #000000",
                          }}
                        >
                          Description
                        </th>
                        <th
                          style={{
                            background: "#16a2b9",
                            color: "#fff",
                            width: "10%",
                            border: "1px solid #000000",
                          }}
                        >
                          Qty
                        </th>
                        <th
                          style={{
                            background: "#16a2b9",
                            color: "#fff",
                            width: "15%",
                            border: "1px solid #000000",
                          }}
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td style={{ border: "1px solid #000000" }}>
                            <input
                              type="text"
                              name={`item${index}`}
                              style={{
                                border: "none",
                                width: "90%",
                                marginRight: "2px",
                                fontFamily: "'Roboto', sans-serif",
                                lineHeight: "16px",
                                fontSize: "12px",
                              }}
                              value={item.item || ""}
                              onChange={(e) =>
                                handleItemChange(index, "item", e.target.value)
                              }
                            />
                          </td>
                          <td style={{ border: "1px solid #000000" }}>
                            <textarea
                              name={`description${index}`}
                              style={{
                                border: "none",
                                float: "left",
                                width: "95%",
                                minHeight: "20px",
                                marginRight: "2px",
                                lineHeight: "16px",
                                fontSize: "12px",
                                fontFamily: "'Roboto', sans-serif",
                              }}
                              value={item.description || ""}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td style={{ border: "1px solid #000000" }}>
                            <input
                              type="text"
                              name={`qty${index}`}
                              style={{
                                border: "none",
                                width: "90%",
                                minHeight: "20px",
                                marginRight: "2px",
                                fontFamily: "'Roboto', sans-serif",
                                lineHeight: "16px",
                                fontSize: "12px",
                              }}
                              value={item.qty || ""}
                              onChange={(e) =>
                                handleItemChange(index, "qty", e.target.value)
                              }
                            />
                          </td>
                          <td style={{ border: "1px solid #000000" }}>
                            <input
                              type="text"
                              name={`price${index}`}
                              style={{
                                border: "none",
                                width: "90%",
                                minHeight: "20px",
                                marginRight: "2px",
                                fontFamily: "'Roboto', sans-serif",
                                lineHeight: "16px",
                                fontSize: "12px",
                              }}
                              value={item.price || ""}
                              onChange={(e) =>
                                handleItemChange(index, "price", e.target.value)
                              }
                              onInput={(e) => {
                                if (typeof formatPrice === "function") {
                                  formatPrice(e.target);
                                }
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>

                <td>
                  <table>
                    <tbody>
                      <tr>
                        <th
                          style={{
                            width: "30px",
                            backgroundColor: "#16a2b9",
                            position: "relative",
                          }}
                        >
                          <p
                            style={{
                              transform: "rotate(-90deg)",
                              display: "block",
                              position: "absolute",
                              left: "-113px",
                              color: "#ffffff",
                              bottom: "22px",
                              width: "233px",
                              margin: 0,
                              fontWeight: 500,
                            }}
                          >
                            Down-payment is based on sub-total
                          </p>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td
                  style={{
                    verticalAlign: "top",
                    background: "#ffe599",
                    border: "1px solid #000",
                    padding: "0px",
                  }}
                >
                  {/* ---------Total Section-------- */}
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                      marginTop: "0px",
                      padding: "5px 0px",
                      background: "#fff",
                      border: "1px solid #000000",
                      borderBottom: "none",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          style={{
                            background: "#16a2b9",
                            color: "#fff",
                            border: "1px solid #000000",
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Retail Price
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="retail_price"
                            name="retail_price"
                            placeholder="0.00"
                            value={retailPrice}
                            onChange={handleRetailPriceChange}
                            onBlur={handlePriceBlur(setRetailPrice)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Manu. Discount{" "}
                          <span
                            style={{
                              textAlign: "right",
                              position: "relative",
                              display: "block",
                              width: "100%",
                              height: "20px",
                            }}
                          >
                            <input
                              type="text"
                              name="manu_discount_prs"
                              value={manuDiscountPercent}
                              onChange={handleManuDiscountPercentChange}
                              style={{
                                border: "none",
                                float: "left",
                                width: "83%",
                                marginRight: "2px",
                                textAlign: "right",
                              }}
                              placeholder="0.00"
                            />
                            <span
                              style={{
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                right: "2px",
                                top: "-3px",
                                bottom: "0px",
                                padding: "0",
                              }}
                            >
                              %
                            </span>
                          </span>
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            name="manu_discount_value"
                            placeholder="0.00"
                            value={manuDiscountValue}
                            onChange={handleManuDiscountValueChange}
                            onBlur={handlePriceBlur(setManuDiscountValue)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Sub Total
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="sub_total"
                            name="sub_total"
                            placeholder="0.00"
                            value={subtotal}
                            readOnly
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                              backgroundColor: "#f0f0f0",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Down Payment{" "}
                          <span
                            style={{
                              textAlign: "right",
                              position: "relative",
                              display: "block",
                              width: "100%",
                              height: "20px",
                            }}
                          >
                            <input
                              type="text"
                              id="down_payment_prs"
                              name="down_payment_prs"
                              value={downPaymentPercent}
                              onChange={handleDownPaymentPercentChange}
                              style={{
                                border: "none",
                                float: "left",
                                width: "83%",
                                marginRight: "2px",
                                textAlign: "right",
                              }}
                              placeholder="0.00"
                            />
                            <span
                              style={{
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                right: "2px",
                                top: "-3px",
                                bottom: "0px",
                                padding: "0",
                              }}
                            >
                              %
                            </span>
                          </span>
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="down_payment_value"
                            name="down_payment_value"
                            placeholder="0.00"
                            value={downPaymentValue}
                            onChange={handleDownPaymentValueChange}
                            onBlur={handlePriceBlur(setDownPaymentValue)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Tax{" "}
                          <span
                            style={{
                              textAlign: "right",
                              position: "relative",
                              display: "block",
                              width: "100%",
                              height: "20px",
                            }}
                          >
                            <input
                              type="text"
                              id="tax_prs"
                              name="tax_prs"
                              value={taxPercent}
                              onChange={handleTaxPercentChange}
                              style={{
                                border: "none",
                                float: "left",
                                width: "83%",
                                marginRight: "2px",
                                textAlign: "right",
                              }}
                              placeholder="0.00"
                            />
                            <span
                              style={{
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                right: "2px",
                                top: "-3px",
                                bottom: "0px",
                                padding: "0",
                              }}
                            >
                              %
                            </span>
                          </span>
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="tax_value"
                            name="tax_value"
                            placeholder="0.00"
                            value={taxValue}
                            onChange={handleTaxValueChange}
                            onBlur={handlePriceBlur(setTaxValue)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Extra Labor
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="extra_labor"
                            name="extra_labor"
                            placeholder="0.00"
                            value={extraLabor}
                            onChange={handleExtraLaborChange}
                            onBlur={handlePriceBlur(setExtraLabor)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Permit Fees
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="permit_fees"
                            name="permit_fees"
                            placeholder="0.00"
                            value={permitFees}
                            onChange={handlePermitFeesChange}
                            onBlur={handlePriceBlur(setPermitFees)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Other Fees
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="other_fees"
                            name="other_fees"
                            placeholder="0.00"
                            value={otherFees}
                            onChange={handleOtherFeesChange}
                            onBlur={handlePriceBlur(setOtherFees)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Sur-Charge
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="surcharge"
                            name="surcharge"
                            placeholder="0.00"
                            value={surcharge}
                            onChange={handleSurchargeChange}
                            onBlur={handlePriceBlur(setSurcharge)}
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                          }}
                        >
                          Balance Due
                        </td>
                        <td
                          style={{
                            border: "1px solid #000000",
                            width: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              left: "0px",
                              top: "0px",
                              bottom: "0px",
                              padding: "0px 5px",
                            }}
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="balance_due"
                            name="balance_due"
                            placeholder="0.00"
                            value={balanceDue}
                            readOnly
                            style={{
                              border: "none",
                              float: "right",
                              width: "80%",
                              minHeight: "39px",
                              marginRight: "2px",
                              outline: "none",
                              backgroundColor: "#f0f0f0",
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <th
                          colSpan={2}
                          style={{
                            background: "#16a2b9",
                            color: "#fff",
                            border: "1px solid #000000",
                          }}
                        >
                          Notes/Reminders:
                        </th>
                      </tr>

                      <tr>
                        <th
                          colSpan={2}
                          rowSpan={5}
                          style={{
                            height: "50px",
                            background: "#ffe599",
                            color: "#000",
                            border: "1px solid #000000",
                            borderBottom: "none",
                            fontWeight: 500,
                            fontSize: "11px",
                          }}
                        >
                          <input type="hidden" name="message" value="" />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn btn-success"
            type="submit"
            style={{ margin: "25px 350px" }}
          >
            Save
          </button>
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default QuoteForm;
