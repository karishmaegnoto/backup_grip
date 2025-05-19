import { constantTypes } from "@/utils/constants/constant";
import CryptoJS from "crypto-js";
import moment from "moment";

export const alphaInput = (event) => {
  if (event) {
    const char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z ]+$/.test(char)) {
      event.preventDefault();
    }
  }
};

export const floatInput = (event) => {
  if (event) {
    const char = String.fromCharCode(event.which);
    if (!/^\d*(\.\d{0,2})?$/.test(char)) {
      event.preventDefault();
    }
  }
};
export const removeMultiSpace = (e) => {
  if (e) {
    e.target.value = e.target.value.replace(/\s{2,}/g, " ");
  }
};

export const integerInput = (event) => {
  if (event) {
    const char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }
};

export const whiteSpaceCheck = (value, message) => {
  if (value?.length > 0 && !!value.trim() === false) {
    return message ?? "White spaces not allowed.";
  }
};
export const matchesNewPassword = (
  newPassword,
  confirmNewPassword,
  message
) => {
  if (newPassword != confirmNewPassword) {
    return message;
  }
};

export const encryptData = (data) => {
  if (data) {
    return CryptoJS.AES.encrypt(data, "Egnoto-mern-crm").toString();
  }
};

export const decryptData = (cipherText) => {
  if (cipherText !== undefined) {
    const bytes = CryptoJS.AES.decrypt(cipherText, "Egnoto-mern-crm");
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};

export const formatMonthYearDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
};

export const checkEmailsAndMode = (email1, email2, mode) => {
  return email1 === email2 && mode === "edit";
};

export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const cleanSearchTerm = (term) => {
  const cleaned = term.trim().replace(/\s+/g, " ");
  return cleaned.length > 0 ? cleaned : null;
};

export const getCommaSeparatedLowerCaseNames = (sidebarData, excludeNames) => {
  const filteredArray = sidebarData?.filter(
    (item) => !excludeNames.includes(item?.name)
  );

  const lowerCaseNames = filteredArray?.map(
    (item) => `"${item?.name?.toLowerCase()}"`
  );

  return lowerCaseNames.join(", ");
};

export function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const matchPathName = (href) => {
  return constantTypes.sidebarData.find((item) => item.href === href);
};

export const textTruncateMore = (string, length) => {
  if (string?.length > length) return string.substring(0, length) + "...";
  else return string;
};

export const addLeadRequestGaragePayload = (
  data,
  addValues,
  optionsArr,
  attachedFiles
) => {
  const formData = new FormData();

  const leadAssist = addValues?.leadAssistant
    ?.map((item) => item.value)
    .join(", ");

  let countryCode = "";
  let dateAndTime = "";

  if (data?.countryCode) {
    countryCode = data?.countryCode?.replace("+", "");
  }
  if (addValues?.dateAndTime?.length > 0) {
    dateAndTime = new Date(addValues?.dateAndTime?.[0]).toString();
  }

  const updatedGarageDoorOption = optionsArr?.garageDoors?.map(
    ({ id, ...rest }) => rest
  );
  const updateGarageWalkIns = optionsArr?.garageWalkIns?.map(
    ({ id, ...rest }) => rest
  );
  const updateGarageWindowOption = optionsArr?.garageWindowOption?.map(
    ({ id, ...rest }) => rest
  );

  formData.append("leadOwner", addValues?.leadOwner?.value?.trim() || "");
  formData.append("leadOwnerAssist", leadAssist || "");
  formData.append("firstName", data?.firstName?.trim() || "");
  formData.append("lastName", data?.lastName?.trim() || "");
  formData.append("mobile", data?.mobile?.trim() || "");
  formData.append("countryCode", countryCode?.trim() || "");
  formData.append("phone", data?.phoneNo?.trim() || "");
  formData.append("leadEmail", data?.email?.trim() || "");
  formData.append("webForm", data?.webForm?.trim() || "");
  formData.append("leadStatus", addValues?.leadStatus?.value?.trim() || "");
  formData.append("leadSource", addValues?.leadSource?.value?.trim() || "");
  formData.append(
    "manufacturer",
    addValues?.leadManufacturer?.value?.trim() || ""
  );
  formData.append("contractDateAndTime", dateAndTime?.trim() || "");
  formData.append("notes", data?.notes?.trim() || "");

  formData.append("threeDRef", data?.threeDRef?.trim() || "");

  formData.append("address[line1]", data?.addressLineOne?.trim() || "");
  formData.append("address[line2]", data?.addressLineTwo?.trim() || "");
  formData.append("address[city]", data?.city?.trim() || "");
  formData.append("address[state]", data?.state?.trim() || "");
  formData.append("address[country]", data?.country?.trim() || "");
  formData.append("address[zipCode]", data?.zipcode?.trim() || "");

  formData.append(
    "productInformation[title]",
    data?.productTitle?.trim() || ""
  );
  formData.append("productInformation[url]", data?.productUrl?.trim() || "");
  formData.append(
    "productInformation[imageUrl]",
    data?.colorImageUrl?.trim() || ""
  );

  attachedFiles.forEach((file, index) => {
    formData.append(`attachment`, file);
  });

  formData.append(
    "buildingData[installationZipCode]",
    data?.biInstallationZipCode?.trim() || ""
  );
  formData.append(
    "buildingData[foundationType]",
    data?.biFoundationType?.trim() || ""
  );
  formData.append(
    "buildingData[buildType]",
    data?.biBuildingType?.trim() || ""
  );
  formData.append(
    "buildingData[width]",
    data?.biWidth ? parseInt(data?.biWidth) : ""
  );
  formData.append(
    "buildingData[length]",
    data?.biLength ? parseInt(data?.biLength) : ""
  );
  formData.append(
    "buildingData[height]",
    data?.biHeight ? parseInt(data?.biHeight) : ""
  );
  formData.append(
    "buildingData[certification]",
    data?.biCertification?.trim() || ""
  );
  formData.append(
    "buildingData[gauge]",
    typeof data?.biGauge === "string"
      ? data?.biGauge.trim()
        ? parseInt(data?.biGauge)
        : ""
      : typeof data?.biGauge === "number"
      ? data.biGauge
      : ""
  );

  formData.append("buildingData[roofStyle]", data?.biRoofStyle?.trim() || "");
  formData.append("buildingData[wallSiding]", data?.biWallSiding?.trim() || "");
  formData.append("buildingData[frontend]", data?.biFrontEnd?.trim() || "");
  formData.append("buildingData[backend]", data?.biBackEnd?.trim() || "");
  formData.append("buildingData[leftSide]", data?.biLeftEnd?.trim() || "");
  formData.append("buildingData[rightSide]", data?.biRightSide?.trim() || "");

  updatedGarageDoorOption &&
    formData.append(
      "buildingData[garbageOption]",
      JSON.stringify(updatedGarageDoorOption)
    );

  updateGarageWalkIns &&
    formData.append(
      "buildingData[walkInDoorOption]",
      JSON.stringify(updateGarageWalkIns)
    );

  updateGarageWindowOption &&
    formData.append(
      "buildingData[windowOption]",
      JSON.stringify(updateGarageWindowOption)
    );

  formData.append("roofColor", data?.biRoofColor?.trim() || "");
  formData.append("wallColor", data?.biWallColor?.trim() || "");
  formData.append("trimColor", data?.biTrimColor?.trim() || "");
  formData.append("garbageDoorColor", data?.biGarageDoorColor?.trim() || "");
  formData.append("wainsCoat", data?.biWainscoat?.trim() || "");
  formData.append("gaugePanel", data?.biGaugePanel?.trim() || "");
  formData.append("jTrim", data?.biJTrim?.trim() || "");
  formData.append("extraAnchors", data?.biExtraAnchors?.trim() || "");
  formData.append("twoTone", data?.biTwoTone?.trim() || "");
  formData.append("extraBraces", data?.biExtraBraces?.trim() || "");
  formData.append("extraBow", data?.biExtraBow?.trim() || "");
  formData.append("trussUpgraded", data?.biTrussUpgraded?.trim() || "");
  formData.append("coloredScrews", data?.biColoredScrews?.trim() || "");

  return formData;
};

export const addLeadRequestBarnPayload = (
  data,
  addValues,
  optionsArr,
  attachedFiles
) => {
  const formData = new FormData();

  const leadAssist = addValues?.leadAssistant

    ?.map((item) => item.value)
    .join(", ");

  let countryCode = "";
  let dateAndTime = "";

  if (data?.countryCode) {
    countryCode = data?.countryCode?.replace("+", "");
  }
  if (addValues?.dateAndTime?.length > 0) {
    dateAndTime = new Date(addValues?.dateAndTime?.[0]).toString();
  }

  const updateCustomLeanTo = optionsArr?.customLeanTo?.map(
    ({ id, ...rest }) => rest
  );

  const wallOption = {
    wallSiding: data?.biBarnWallSiding?.trim() || "",
    centralBuilding: createWallSection(optionsArr, "wallCentralBuilding"),
    leftLeanTo: createWallSection(optionsArr, "wallLeftLeanTo"),
    rightLeanTo: createWallSection(optionsArr, "wallRightLeanTo"),
    additionalLeanTo: createWallSection(optionsArr, "wallAdditionalLeanTo"),
  };

  const walkInDoorOption = {
    centralBuilding: trimValues(
      stripId(optionsArr?.walkInOptionCentralBuilding)
    ),
    leftLeanTo: trimValues(stripId(optionsArr?.walkInOptionLeftLeanTo)),
    rightLeanTo: trimValues(stripId(optionsArr?.walkInOptionRightLeanTo)),
    additionalLeanTo: trimValues(
      stripId(optionsArr?.walkInOptionAdditionalLeanTo)
    ),
  };

  const barnDoorOption = {
    centralBuilding: trimValues(stripId(optionsArr?.doorOptionCentralBuilding)),
    leftLeanTo: trimValues(stripId(optionsArr?.doorOptionLeftLeanTo)),
    rightLeanTo: trimValues(stripId(optionsArr?.doorOptionRightLeanTo)),
    additionalLeanTo: trimValues(
      stripId(optionsArr?.doorOptionAdditionalLeanTo)
    ),
  };

  const windowOption = {
    centralBuilding: trimValues(stripId(optionsArr?.windowCentralBuilding)),
    leftLeanTo: trimValues(stripId(optionsArr?.windowLeftLeanTo)),
    rightLeanTo: trimValues(stripId(optionsArr?.windowRightLeanTo)),
    additionalLeanTo: trimValues(stripId(optionsArr?.windowAdditionalLeanTo)),
  };

  formData.append("leadOwner", addValues?.leadOwner?.value?.trim() || "");
  formData.append("leadOwnerAssist", leadAssist || "");
  formData.append("firstName", data?.firstName?.trim() || "");
  formData.append("lastName", data?.lastName?.trim() || "");
  formData.append("mobile", data?.mobile?.trim() || "");
  formData.append("countryCode", countryCode?.trim() || "");
  formData.append("phone", data?.phoneNo?.trim() || "");
  formData.append("leadEmail", data?.email?.trim() || "");
  formData.append("webForm", data?.webForm?.trim() || "");
  formData.append("leadStatus", addValues?.leadStatus?.value?.trim() || "");
  formData.append("leadSource", addValues?.leadSource?.value?.trim() || "");
  formData.append(
    "manufacturer",
    addValues?.leadManufacturer?.value?.trim() || ""
  );
  formData.append("contractDateAndTime", dateAndTime?.trim() || "");
  formData.append("notes", data?.notes?.trim() || "");

  formData.append("threeDRef", data?.threeDRef?.trim() || "");

  formData.append("address[line1]", data?.addressLineOne?.trim() || "");
  formData.append("address[line2]", data?.addressLineTwo?.trim() || "");
  formData.append("address[city]", data?.city?.trim() || "");
  formData.append("address[state]", data?.state?.trim() || "");
  formData.append("address[country]", data?.country?.trim() || "");
  formData.append("address[zipCode]", data?.zipcode?.trim() || "");

  formData.append(
    "productInformation[title]",
    data?.productTitle?.trim() || ""
  );
  formData.append("productInformation[url]", data?.productUrl?.trim() || "");
  formData.append(
    "productInformation[imageUrl]",
    data?.colorImageUrl?.trim() || ""
  );

  attachedFiles.forEach((file, index) => {
    formData.append(`attachment`, file);
  });

  formData.append(
    "buildingData[installationZipCode]",
    data?.biInstallationZipCode?.trim() || ""
  );
  formData.append(
    "buildingData[foundationType]",
    data?.biFoundationType?.trim() || ""
  );
  formData.append(
    "buildingData[buildType]",
    data?.biBuildingType?.trim() || ""
  );
  formData.append("buildingData[barnStyle]", data?.biBarnStyle?.trim() || "");
  formData.append(
    "buildingData[certification]",
    data?.biBarnCertificationAndGauge?.trim() || ""
  );
  formData.append(
    "buildingData[connectionStyle]",
    data?.biBarnConnectionStyle?.trim() || ""
  );
  formData.append(
    "buildingData[connectionFees]",
    data?.biBarnConnectionFees ? parseInt(data?.biBarnConnectionFees) : ""
  );
  formData.append("buildingData[roofStyle]", data?.biRoofStyle?.trim() || "");

  formData.append(
    "buildingData[centralBuilding][width]",
    data?.biCentralBuildingWidth ? parseInt(data?.biCentralBuildingWidth) : ""
  );
  formData.append(
    "buildingData[centralBuilding][height]",
    data?.biCentralBuildingHeight ? parseInt(data?.biCentralBuildingHeight) : ""
  );
  formData.append(
    "buildingData[centralBuilding][length]",
    data?.biCentralBuildingLength ? parseInt(data?.biCentralBuildingLength) : ""
  );
  formData.append(
    "buildingData[leftLeanTo][width]",
    data?.biLeftLeanToWidth ? parseInt(data?.biLeftLeanToWidth) : ""
  );
  formData.append(
    "buildingData[leftLeanTo][height]",
    data?.biLeftLeanHeight ? parseInt(data?.biLeftLeanHeight) : ""
  );
  formData.append(
    "buildingData[leftLeanTo][length]",
    data?.biLeftLeanLength ? parseInt(data?.biLeftLeanLength) : ""
  );
  formData.append(
    "buildingData[rightLeanTo][width]",
    data?.biRightLeanWidth ? parseInt(data?.biRightLeanWidth) : ""
  );
  formData.append(
    "buildingData[rightLeanTo][height]",
    data?.biRightLeanHeight ? parseInt(data?.biRightLeanHeight) : ""
  );
  formData.append(
    "buildingData[rightLeanTo][length]",
    data?.biRightLeanLength ? parseInt(data?.biRightLeanLength) : ""
  );

  updateCustomLeanTo &&
    formData.append(
      "buildingData[customLeanTo]",
      JSON.stringify(updateCustomLeanTo)
    );

  wallOption &&
    formData.append("buildingData[wall]", JSON.stringify(wallOption));

  walkInDoorOption &&
    formData.append(
      "buildingData[walkInDoorOptionForBarn]",
      JSON.stringify(walkInDoorOption)
    );
  barnDoorOption &&
    formData.append(
      "buildingData[barnDoorOption]",
      JSON.stringify(barnDoorOption)
    );
  windowOption &&
    formData.append(
      "buildingData[windowOptionForBarn]",
      JSON.stringify(windowOption)
    );

  formData.append("roofColor", data?.biRoofColor?.trim() || "");
  formData.append("wallColor", data?.biWallColor?.trim() || "");
  formData.append("trimColor", data?.biTrimColor?.trim() || "");
  formData.append("garbageDoorColor", data?.biGarageDoorColor?.trim() || "");
  formData.append("wainsCoat", data?.biWainscoat?.trim() || "");
  formData.append("gaugePanel", data?.biGaugePanel?.trim() || "");
  formData.append("jTrim", data?.biJTrim?.trim() || "");
  formData.append("extraAnchors", data?.biExtraAnchors?.trim() || "");
  formData.append("twoTone", data?.biTwoTone?.trim() || "");
  formData.append("extraBraces", data?.biExtraBraces?.trim() || "");
  formData.append("extraBow", data?.biExtraBow?.trim() || "");
  formData.append("trussUpgraded", data?.biTrussUpgraded?.trim() || "");
  formData.append("coloredScrews", data?.biColoredScrews?.trim() || "");

  return formData;
};

const createWallSection = (section, optionsArrKey) => ({
  frontEnd: section?.[optionsArrKey]?.[0]?.frontEnd?.trim() || "",
  backEnd: section?.[optionsArrKey]?.[0]?.backEnd?.trim() || "",
  leftSide: section?.[optionsArrKey]?.[0]?.leftSide?.trim() || "",
  rightSide: section?.[optionsArrKey]?.[0]?.rightSide?.trim() || "",
});

const stripId = (array) => array?.map(({ id, ...rest }) => rest) || [];

const trimValues = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(trimValues);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.trim(), trimValues(value)])
    );
  } else if (typeof obj === "string") {
    return obj.trim();
  }
  return obj;
};

export const setValuesForHookInEditLead = (setValue, setPhone, data) => {
  //----------Debug-------------------
  console.log("Full data from backend:", data);
  // console.log(
  //   "buildingInformation keys:",
  //   Object.keys(data.buildingInformation || {})
  // );
  //-------------------------------------
  setValue("firstName", data?.firstName || "");
  setValue("lastName", data?.lastName || "");
  setValue("email", data?.email || "");
  // setValue("countryCode", `+${data?.countryCode}` || "+1");
  //----------------- Updated code for country code------------------------------
  let countryCodeValue = "+1"; // Default value
  if (data?.countryCode && data.countryCode !== "null" && data.countryCode) {
    countryCodeValue = data.countryCode.toString().startsWith("+")
      ? data.countryCode
      : `+${data.countryCode}`;
  }
  setValue("countryCode", countryCodeValue);
  //------------------------------------------------------------------------------
  setValue("mobile", data?.mobile || "");
  setPhone(`+${data?.countryCode} ${data?.mobile}`);
  setValue("phoneNo", data?.phone || "");
  setValue("webForm", data?.webForm || "");
  setValue("notes", data?.notes || "");
  setValue("addressLineOne", data?.address?.line1 || "");
  setValue("addressLineTwo", data?.address?.line2 || "");
  setValue("city", data?.address?.city || "");
  setValue("state", data?.address?.state || "");
  setValue("country", data?.address?.country || "");
  setValue("zipcode", data?.address?.zipCode || "");
  setValue("productTitle", data?.productInformation?.title || "");
  setValue("productUrl", data?.productInformation?.url || "");
  setValue("colorImageUrl", data?.productInformation?.imageUrl || "");
  // Bottom Data
  setValue("biRoofColor", data?.roofColor || "");
  setValue("biWallColor", data?.wallColor || "");
  setValue("biTrimColor", data?.trimColor || "");
  setValue("biGarageDoorColor", data?.garbageDoorColor || ""); //---------------type error-------------
  // setValue("biGarageDoorColor", data?.garageDoorColor || "");
  setValue("biWainscoat", data?.wainsCoat || "");
  setValue("biGaugePanel", data?.gaugePanel || "");
  setValue("biJTrim", data?.jTrim || "");
  setValue("biExtraAnchors", data?.extraAnchors || "");
  setValue("biTwoTone", data?.twoTone || "");
  setValue("biExtraBraces", data?.extraBraces || "");
  setValue("biExtraBow", data?.extraBow || "");
  setValue("biTrussUpgraded", data?.trussUpgraded || "");
  setValue("biColoredScrews", data?.coloredScrews || "");

  setValue(
    "biInstallationZipCode",
    data?.buildingInformation?.installationZipCode || ""
  );
  setValue("biFoundationType", data?.buildingInformation?.foundationType || "");
  setValue("biBuildingType", data?.buildingInformation?.buildType || "");
  setValue("biWidth", data?.buildingInformation?.width || "");
  setValue("biLength", data?.buildingInformation?.length || "");
  setValue("biHeight", data?.buildingInformation?.height || "");
  // setValue(
  //   "biCertificationAndGauge",
  //   data?.buildingInformation?.certification || ""
  // );
  // setValue(
  //   "buildingData[certification]",
  //   data?.buildingInformation?.certification || ""
  // );
  // setValue("buildingData[gauge]", data?.buildingInformation?.gauge || "");
  setValue("biCertification", data?.buildingInformation?.certification || "");
  setValue("biGauge", data?.buildingInformation?.gauge || "");

  setValue("biBarnStyle", data?.buildingInformation?.barnStyle || "");
  setValue("biRoofStyle", data?.buildingInformation?.roofStyle || "");
  setValue("biWallSiding", data?.buildingInformation?.wallSiding || "");
  setValue("biFrontEnd", data?.buildingInformation?.frontend || "");
  setValue("biBackEnd", data?.buildingInformation?.backend || "");
  setValue("biLeftEnd", data?.buildingInformation?.leftSide || "");
  setValue("biRightSide", data?.buildingInformation?.rightSide || "");
  //---
  setValue(
    "biCentralBuildingWidth",
    data?.buildingInformation?.centralBuilding?.width || ""
  );
  setValue(
    "biCentralBuildingLength",
    data?.buildingInformation?.centralBuilding?.length || ""
  );
  setValue(
    "biCentralBuildingHeight",
    data?.buildingInformation?.centralBuilding?.height || ""
  );
  setValue(
    "biLeftLeanToWidth",
    data?.buildingInformation?.leftLeanTo?.width || ""
  );
  setValue(
    "biLeftLeanLength",
    data?.buildingInformation?.leftLeanTo?.length || ""
  );
  setValue(
    "biLeftLeanHeight",
    data?.buildingInformation?.leftLeanTo?.height || ""
  );
  setValue(
    "biRightLeanWidth",
    data?.buildingInformation?.rightLeanTo?.width || ""
  );
  setValue(
    "biRightLeanLength",
    data?.buildingInformation?.rightLeanTo?.length || ""
  );
  setValue(
    "biRightLeanHeight",
    data?.buildingInformation?.rightLeanTo?.height || ""
  );
  setValue(
    "biBarnConnectionStyle",
    data?.buildingInformation?.connectionStyle || ""
  );
  setValue(
    "biBarnConnectionFees",
    data?.buildingInformation?.connectionFees || ""
  );
  setValue(
    "biBarnCertificationAndGauge",
    data?.buildingInformation?.certification || ""
  );
  setValue(
    "biBarnWallSiding",
    data?.buildingInformation?.wall?.wallSiding || ""
  );
};

export const createIdMappedArray = (arr) => {
  let count = 1;
  const filteredArr = arr?.filter((item) => item !== undefined);
  if (filteredArr?.length > 0) {
    return arr?.map(({ _id, ...rest }) => ({ ...rest, id: count++ })) || [];
  }
};

export const mapWallOptions = (buildingInfo) => ({
  wallCentralBuilding: createIdMappedArray([
    buildingInfo?.wall?.centralBuilding,
  ]),
  wallLeftLeanTo: createIdMappedArray([buildingInfo?.wall?.leftLeanTo]),
  wallRightLeanTo: createIdMappedArray([buildingInfo?.wall?.rightLeanTo]),
  wallAdditionalLeanTo: createIdMappedArray([
    buildingInfo?.wall?.additionalLeanTo,
  ]),
});
//*********************EDIT LEAD*************/
export const editLeadRequestGaragePayload = (
  data,
  addValues,
  optionsArr,
  attachedFiles,
  buildingId,
  leadId
) => {
  const formData = new FormData();

  const leadAssist = addValues?.leadAssistant
    ?.map((item) => item.value)
    .join(", ");

  const shareWith = addValues?.shareWith?.map((item) => {
    return { id: item.value, name: item?.title };
  });

  let countryCode = "";
  let dateAndTime = "";

  if (data?.countryCode) {
    countryCode = data?.countryCode?.replace("+", "");
  }
  if (addValues?.dateAndTime?.length > 0) {
    dateAndTime = new Date(addValues?.dateAndTime?.[0]).toString();
  }

  const updatedGarageDoorOption = optionsArr?.garageDoors?.map(
    ({ id, ...rest }) => rest
  );
  const updateGarageWalkIns = optionsArr?.garageWalkIns?.map(
    ({ id, ...rest }) => rest
  );
  const updateGarageWindowOption = optionsArr?.garageWindowOption?.map(
    ({ id, ...rest }) => rest
  );

  formData.append("leadOwner", addValues?.leadOwner?.value?.trim() || "");
  formData.append("leadOwnerAssist", leadAssist || "");
  formData.append("firstName", data?.firstName?.trim() || "");
  formData.append("lastName", data?.lastName?.trim() || "");
  formData.append("mobile", data?.mobile?.trim() || "");
  formData.append("countryCode", countryCode?.trim() || "");
  formData.append("phone", data?.phoneNo?.trim() || "");
  formData.append("leadEmail", data?.email?.trim() || "");
  formData.append("webForm", data?.webForm?.trim() || "");
  formData.append("leadStatus", addValues?.leadStatus?.value?.trim() || "");
  formData.append("leadSource", addValues?.leadSource?.value?.trim() || "");
  formData.append(
    "manufacture",
    addValues?.leadManufacturer?.value?.trim() || ""
  );
  formData.append("contractDateAndTime", dateAndTime?.trim() || "");
  formData.append("notes", data?.notes?.trim() || "");

  formData.append("threeDRef", data?.threeDRef?.trim() || "");

  formData.append("address[line1]", data?.addressLineOne?.trim() || "");
  formData.append("address[line2]", data?.addressLineTwo?.trim() || "");
  formData.append("address[city]", data?.city?.trim() || "");
  formData.append("address[state]", data?.state?.trim() || "");
  formData.append("address[country]", data?.country?.trim() || "");
  formData.append("address[zipCode]", data?.zipcode?.trim() || "");

  formData.append(
    "productInformation[title]",
    data?.productTitle?.trim() || ""
  );
  formData.append("productInformation[url]", data?.productUrl?.trim() || "");
  formData.append(
    "productInformation[imageUrl]",
    data?.colorImageUrl?.trim() || ""
  );

  attachedFiles.forEach((file, index) => {
    formData.append(`attachment`, file);
  });

  formData.append("buildingData[id]", buildingId?.trim() || "");

  formData.append(
    "buildingData[installationZipCode]",
    data?.biInstallationZipCode?.trim() || ""
  );
  formData.append(
    "buildingData[foundationType]",
    data?.biFoundationType?.trim() || ""
  );
  formData.append(
    "buildingData[buildType]",
    data?.biBuildingType?.trim() || ""
  );
  formData.append(
    "buildingData[width]",
    data?.biWidth ? parseInt(data?.biWidth) : ""
  );
  formData.append(
    "buildingData[length]",
    data?.biLength ? parseInt(data?.biLength) : ""
  );
  formData.append(
    "buildingData[height]",
    data?.biHeight ? parseInt(data?.biHeight) : ""
  );
  // formData.append(
  //   "buildingData[certification]",
  //   data?.biCertificationAndGauge?.trim()
  //     ? parseInt(data?.biCertificationAndGauge)
  //     : ""
  // );

  formData.append(
    "buildingData[certification]",
    data?.biCertification?.trim() || ""
  );
  formData.append(
    "buildingData[gauge]",
    data?.biGauge ? parseInt(data?.biGauge) : ""
  );

  formData.append("buildingData[roofStyle]", data?.biRoofStyle?.trim() || "");
  formData.append("buildingData[wallSiding]", data?.biWallSiding?.trim() || "");
  formData.append("buildingData[frontend]", data?.biFrontEnd?.trim() || "");
  formData.append("buildingData[backend]", data?.biBackEnd?.trim() || "");
  formData.append("buildingData[leftSide]", data?.biLeftEnd?.trim() || "");
  formData.append("buildingData[rightSide]", data?.biRightSide?.trim() || "");

  shareWith?.length > 0 &&
    formData.append("sharedWith", JSON.stringify(shareWith));

  updatedGarageDoorOption &&
    formData.append(
      "buildingData[garbageOption]",
      JSON.stringify(updatedGarageDoorOption)
    );

  updateGarageWalkIns &&
    formData.append(
      "buildingData[walkInDoorOption]",
      JSON.stringify(updateGarageWalkIns)
    );

  updateGarageWindowOption &&
    formData.append(
      "buildingData[windowOption]",
      JSON.stringify(updateGarageWindowOption)
    );

  formData.append("roofColor", data?.biRoofColor?.trim() || "");
  formData.append("wallColor", data?.biWallColor?.trim() || "");
  formData.append("trimColor", data?.biTrimColor?.trim() || "");
  formData.append("garbageDoorColor", data?.biGarageDoorColor?.trim() || "");
  formData.append("wainsCoat", data?.biWainscoat?.trim() || "");
  formData.append("gaugePanel", data?.biGaugePanel?.trim() || "");
  formData.append("jTrim", data?.biJTrim?.trim() || "");
  formData.append("extraAnchors", data?.biExtraAnchors?.trim() || "");
  formData.append("twoTone", data?.biTwoTone?.trim() || "");
  formData.append("extraBraces", data?.biExtraBraces?.trim() || "");
  formData.append("extraBow", data?.biExtraBow?.trim() || "");
  formData.append("trussUpgraded", data?.biTrussUpgraded?.trim() || "");
  formData.append("coloredScrews", data?.biColoredScrews?.trim() || "");
  formData.append("quoteName", data?.quoteName);

  // Add leadId to formData to fix backend cast error
  formData.append("leadId", leadId || "");

  return formData;
};

export const editLeadRequestBarnPayload = (
  data,
  addValues,
  optionsArr,
  attachedFiles,
  buildingId
) => {
  const formData = new FormData();
  console.log("Payload type:", formData.constructor.name);

  const leadAssist = addValues?.leadAssistant
    ?.map((item) => item.value)
    .join(", ");

  const shareWith = addValues?.shareWith?.map((item) => {
    return { id: item.value, name: item?.title };
  });

  let countryCode = "";
  let dateAndTime = "";

  if (data?.countryCode) {
    countryCode = data?.countryCode?.replace("+", "");
  }
  if (addValues?.dateAndTime?.length > 0) {
    dateAndTime = new Date(addValues?.dateAndTime?.[0]).toString();
  }

  const updateCustomLeanTo = optionsArr?.customLeanTo?.map(
    ({ id, ...rest }) => rest
  );

  console.log("updateCustomLeanTo", updateCustomLeanTo);

  const wallOption = {
    wallSiding: data?.biBarnWallSiding?.trim() || "",
    centralBuilding: createWallSection(optionsArr, "wallCentralBuilding"),
    leftLeanTo: createWallSection(optionsArr, "wallLeftLeanTo"),
    rightLeanTo: createWallSection(optionsArr, "wallRightLeanTo"),
    additionalLeanTo: createWallSection(optionsArr, "wallAdditionalLeanTo"),
  };

  const walkInDoorOption = {
    centralBuilding: trimValues(
      stripId(optionsArr?.walkInOptionCentralBuilding)
    ),
    leftLeanTo: trimValues(stripId(optionsArr?.walkInOptionLeftLeanTo)),
    rightLeanTo: trimValues(stripId(optionsArr?.walkInOptionRightLeanTo)),
    additionalLeanTo: trimValues(
      stripId(optionsArr?.walkInOptionAdditionalLeanTo)
    ),
  };

  const barnDoorOption = {
    centralBuilding: trimValues(stripId(optionsArr?.doorOptionCentralBuilding)),
    leftLeanTo: trimValues(stripId(optionsArr?.doorOptionLeftLeanTo)),
    rightLeanTo: trimValues(stripId(optionsArr?.doorOptionRightLeanTo)),
    additionalLeanTo: trimValues(
      stripId(optionsArr?.doorOptionAdditionalLeanTo)
    ),
  };

  const windowOption = {
    centralBuilding: trimValues(stripId(optionsArr?.windowCentralBuilding)),
    leftLeanTo: trimValues(stripId(optionsArr?.windowLeftLeanTo)),
    rightLeanTo: trimValues(stripId(optionsArr?.windowRightLeanTo)),
    additionalLeanTo: trimValues(stripId(optionsArr?.windowAdditionalLeanTo)),
  };

  formData.append("leadOwner", addValues?.leadOwner?.value?.trim() || "");
  formData.append("leadOwnerAssist", leadAssist || "");
  formData.append("firstName", data?.firstName?.trim() || "");
  formData.append("lastName", data?.lastName?.trim() || "");
  formData.append("mobile", data?.mobile?.trim() || "");
  formData.append("countryCode", countryCode?.trim() || "");
  formData.append("phone", data?.phoneNo?.trim() || "");
  formData.append("leadEmail", data?.email?.trim() || "");
  formData.append("webForm", data?.webForm?.trim() || "");
  formData.append("leadStatus", addValues?.leadStatus?.value?.trim() || "");
  formData.append("leadSource", addValues?.leadSource?.value?.trim() || "");
  formData.append(
    "manufacture",
    addValues?.leadManufacturer?.value?.trim() || ""
  );
  formData.append("contractDateAndTime", dateAndTime?.trim() || "");
  formData.append("notes", data?.notes?.trim() || "");

  formData.append("threeDRef", data?.threeDRef?.trim() || "");

  formData.append("address[line1]", data?.addressLineOne?.trim() || "");
  formData.append("address[line2]", data?.addressLineTwo?.trim() || "");
  formData.append("address[city]", data?.city?.trim() || "");
  formData.append("address[state]", data?.state?.trim() || "");
  formData.append("address[country]", data?.country?.trim() || "");
  formData.append("address[zipCode]", data?.zipcode?.trim() || "");

  formData.append(
    "productInformation[title]",
    data?.productTitle?.trim() || ""
  );
  formData.append("productInformation[url]", data?.productUrl?.trim() || "");
  formData.append(
    "productInformation[imageUrl]",
    data?.colorImageUrl?.trim() || ""
  );

  // attachedFiles.forEach((file, index) => {
  //   formData.append(`attachment`, file);
  // });

  attachedFiles.forEach((file, index) => {
    formData.append(`attachment[${index}]`, file);
  });

  console.log("Attached Files:", attachedFiles);

  //-----------debugging-------------

  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }
  //----------------
  formData.append("buildingData[id]", buildingId?.trim() || "");
  formData.append(
    "buildingData[installationZipCode]",
    data?.biInstallationZipCode?.trim() || ""
  );

  formData.append(
    "buildingData[foundationType]",
    data?.biFoundationType?.trim() || ""
  );
  formData.append(
    "buildingData[buildType]",
    data?.biBuildingType?.trim() || ""
  );
  formData.append("buildingData[barnStyle]", data?.biBarnStyle?.trim() || "");
  formData.append(
    "buildingData[certification]",
    data?.biBarnCertificationAndGauge?.trim() || ""
  );
  formData.append(
    "buildingData[connectionStyle]",
    data?.biBarnConnectionStyle?.trim() || ""
  );
  formData.append(
    "buildingData[connectionFees]",
    data?.biBarnConnectionFees ? parseInt(data?.biBarnConnectionFees) : ""
  );
  formData.append("buildingData[roofStyle]", data?.biRoofStyle?.trim() || "");

  formData.append(
    "buildingData[centralBuilding][width]",
    data?.biCentralBuildingWidth ? parseInt(data?.biCentralBuildingWidth) : ""
  );
  formData.append(
    "buildingData[centralBuilding][height]",
    data?.biCentralBuildingHeight ? parseInt(data?.biCentralBuildingHeight) : ""
  );
  formData.append(
    "buildingData[centralBuilding][length]",
    data?.biCentralBuildingLength ? parseInt(data?.biCentralBuildingLength) : ""
  );
  formData.append(
    "buildingData[leftLeanTo][width]",
    data?.biLeftLeanToWidth ? parseInt(data?.biLeftLeanToWidth) : ""
  );
  formData.append(
    "buildingData[leftLeanTo][height]",
    data?.biLeftLeanHeight ? parseInt(data?.biLeftLeanHeight) : ""
  );
  formData.append(
    "buildingData[leftLeanTo][length]",
    data?.biLeftLeanLength ? parseInt(data?.biLeftLeanLength) : ""
  );
  formData.append(
    "buildingData[rightLeanTo][width]",
    data?.biRightLeanWidth ? parseInt(data?.biRightLeanWidth) : ""
  );
  formData.append(
    "buildingData[rightLeanTo][height]",
    data?.biRightLeanHeight ? parseInt(data?.biRightLeanHeight) : ""
  );
  formData.append(
    "buildingData[rightLeanTo][length]",
    data?.biRightLeanLength ? parseInt(data?.biRightLeanLength) : ""
  );

  shareWith?.length > 0 &&
    formData.append("sharedWith", JSON.stringify(shareWith));

  updateCustomLeanTo &&
    formData.append(
      "buildingData[customLeanTo]",
      JSON.stringify(updateCustomLeanTo)
    );

  wallOption &&
    formData.append("buildingData[wall]", JSON.stringify(wallOption));

  walkInDoorOption &&
    formData.append(
      "buildingData[walkInDoorOptionForBarn]",
      JSON.stringify(walkInDoorOption)
    );
  barnDoorOption &&
    formData.append(
      "buildingData[barnDoorOption]",
      JSON.stringify(barnDoorOption)
    );
  windowOption &&
    formData.append(
      "buildingData[windowOptionForBarn]",
      JSON.stringify(windowOption)
    );

  formData.append("roofColor", data?.biRoofColor?.trim() || "");
  formData.append("wallColor", data?.biWallColor?.trim() || "");
  formData.append("trimColor", data?.biTrimColor?.trim() || "");
  formData.append("garbageDoorColor", data?.biGarbageDoorColor?.trim() || "");
  formData.append("wainsCoat", data?.biWainscoat?.trim() || "");
  formData.append("gaugePanel", data?.biGaugePanel?.trim() || "");
  formData.append("jTrim", data?.biJTrim?.trim() || "");
  formData.append("extraAnchors", data?.biExtraAnchors?.trim() || "");
  formData.append("twoTone", data?.biTwoTone?.trim() || "");
  formData.append("extraBraces", data?.biExtraBraces?.trim() || "");
  formData.append("extraBow", data?.biExtraBow?.trim() || "");
  formData.append("trussUpgraded", data?.biTrussUpgraded?.trim() || "");
  formData.append("coloredScrews", data?.biColoredScrews?.trim() || "");

  return formData;
};
//*********************EDIT LEAD*************/

//---------------ADD quote---------------//
export const addQuoteRequestGaragePayload = (
  data,
  addValues,
  optionsArr,
  attachedFiles
) => {
  const formData = new FormData();

  const leadAssist = addValues?.leadAssistant
    ?.map((item) => item.value)
    .join(", ");

  let countryCode = "";
  let dateAndTime = "";

  if (data?.countryCode) {
    countryCode = data?.countryCode?.replace("+", "");
  }
  if (addValues?.dateAndTime?.length > 0) {
    dateAndTime = new Date(addValues?.dateAndTime?.[0]).toString();
  }

  const updatedGarageDoorOption = optionsArr?.garageDoors?.map(
    ({ id, ...rest }) => rest
  );
  const updateGarageWalkIns = optionsArr?.garageWalkIns?.map(
    ({ id, ...rest }) => rest
  );
  const updateGarageWindowOption = optionsArr?.garageWindowOption?.map(
    ({ id, ...rest }) => rest
  );

  formData.append("leadOwner", addValues?.leadOwner?.value?.trim() || "");
  formData.append("leadOwnerAssist", leadAssist || "");
  formData.append("firstName", data?.firstName?.trim() || "");
  formData.append("lastName", data?.lastName?.trim() || "");
  formData.append("mobile", data?.mobile?.trim() || "");
  formData.append("countryCode", countryCode?.trim() || "");
  formData.append("phone", data?.phoneNo?.trim() || "");
  formData.append("leadEmail", data?.email?.trim() || "");
  formData.append("webForm", data?.webForm?.trim() || "");
  formData.append("leadStatus", addValues?.leadStatus?.value?.trim() || "");
  formData.append("leadSource", addValues?.leadSource?.value?.trim() || "");
  formData.append(
    "manufacturer",
    addValues?.leadManufacturer?.value?.trim() || ""
  );
  formData.append("contractDateAndTime", dateAndTime?.trim() || "");
  formData.append("notes", data?.notes?.trim() || "");

  formData.append("threeDRef", data?.threeDRef?.trim() || "");

  formData.append("address[line1]", data?.addressLineOne?.trim() || "");
  formData.append("address[line2]", data?.addressLineTwo?.trim() || "");
  formData.append("address[city]", data?.city?.trim() || "");
  formData.append("address[state]", data?.state?.trim() || "");
  formData.append("address[country]", data?.country?.trim() || "");
  formData.append("address[zipCode]", data?.zipcode?.trim() || "");

  formData.append(
    "productInformation[title]",
    data?.productTitle?.trim() || ""
  );
  formData.append("productInformation[url]", data?.productUrl?.trim() || "");
  formData.append(
    "productInformation[imageUrl]",
    data?.colorImageUrl?.trim() || ""
  );

  attachedFiles.forEach((file, index) => {
    formData.append(`attachment`, file);
  });

  formData.append(
    "buildingData[installationZipCode]",
    data?.biInstallationZipCode?.trim() || ""
  );
  formData.append(
    "buildingData[foundationType]",
    data?.biFoundationType?.trim() || ""
  );
  formData.append(
    "buildingData[buildType]",
    data?.biBuildingType?.trim() || ""
  );
  formData.append(
    "buildingData[width]",
    data?.biWidth ? parseInt(data?.biWidth) : ""
  );
  formData.append(
    "buildingData[length]",
    data?.biLength ? parseInt(data?.biLength) : ""
  );
  formData.append(
    "buildingData[height]",
    data?.biHeight ? parseInt(data?.biHeight) : ""
  );
  formData.append(
    "buildingData[certification]",
    data?.biCertification?.trim() || ""
  );
  formData.append(
    "buildingData[gauge]",
    typeof data?.biGauge === "string"
      ? data?.biGauge.trim()
        ? parseInt(data?.biGauge)
        : ""
      : typeof data?.biGauge === "number"
      ? data.biGauge
      : ""
  );

  formData.append("buildingData[roofStyle]", data?.biRoofStyle?.trim() || "");
  formData.append("buildingData[wallSiding]", data?.biWallSiding?.trim() || "");
  formData.append("buildingData[frontend]", data?.biFrontEnd?.trim() || "");
  formData.append("buildingData[backend]", data?.biBackEnd?.trim() || "");
  formData.append("buildingData[leftSide]", data?.biLeftEnd?.trim() || "");
  formData.append("buildingData[rightSide]", data?.biRightSide?.trim() || "");

  updatedGarageDoorOption &&
    formData.append(
      "buildingData[garbageOption]",
      JSON.stringify(updatedGarageDoorOption)
    );

  updateGarageWalkIns &&
    formData.append(
      "buildingData[walkInDoorOption]",
      JSON.stringify(updateGarageWalkIns)
    );

  updateGarageWindowOption &&
    formData.append(
      "buildingData[windowOption]",
      JSON.stringify(updateGarageWindowOption)
    );

  formData.append("roofColor", data?.biRoofColor?.trim() || "");
  formData.append("wallColor", data?.biWallColor?.trim() || "");
  formData.append("trimColor", data?.biTrimColor?.trim() || "");
  formData.append("garbageDoorColor", data?.biGarageDoorColor?.trim() || "");
  formData.append("wainsCoat", data?.biWainscoat?.trim() || "");
  formData.append("gaugePanel", data?.biGaugePanel?.trim() || "");
  formData.append("jTrim", data?.biJTrim?.trim() || "");
  formData.append("extraAnchors", data?.biExtraAnchors?.trim() || "");
  formData.append("twoTone", data?.biTwoTone?.trim() || "");
  formData.append("extraBraces", data?.biExtraBraces?.trim() || "");
  formData.append("extraBow", data?.biExtraBow?.trim() || "");
  formData.append("trussUpgraded", data?.biTrussUpgraded?.trim() || "");
  formData.append("coloredScrews", data?.biColoredScrews?.trim() || "");

  return formData;
};

export const formatDateOnWebSupport = (dateString) => {
  return moment(dateString).format("dddd, MMM DD, YYYY, h:mm A");
};

export const removeUploadPath = (url) => {
  if (url) {
    return url?.substring(url?.indexOf("/uploads"));
  }
};
