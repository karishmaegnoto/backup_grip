// components/PhoneInputField.js

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ErrorMessage from "./ErrorMessage";

const PhoneInputField = ({
  register,
  setValue,
  errors,
  validationMessage,
  regex,
  countryCode = "+91",
  placeholder,
  phone,
  setPhone,
  className,
  name,
  height = "56px",
  disabled = false,
  backgroundColor,
  ...rest
}) => {
  return (
    <div className="w-full">
      <PhoneInput
        enableSearch={true}
        // disableDropdown={true}
        // onlyCountries={["us"]}
        disabled={disabled}
        placeholder={placeholder || "Phone Number"}
        className={className}
        searchStyle={{
          alignItems: "center",
          width: "90%",
        }}
        country="us"
        value={phone}
        name={name}
        {...register(name, {
          required: validationMessage.MOBILE_NUMBER_REQUIRED,
          // pattern: {
          //   value: countryCode === "+91" ? regex.regPhone : regex.regPhoneUs,
          //   message: validationMessage.VALID_MOBILE_NO,
          // },
          // validate: (value) => {
          //   if (value === "") {
          //     return true;
          //   }
          //   const pattern =
          //     countryCode === "+91" ? regex.regPhone : regex.regPhoneUs;
          //   return value.match(pattern)
          //     ? true
          //     : validationMessage.VALID_MOBILE_NO;
          // },
          // minLength: {
          //   value: 10,
          //   message: validationMessage?.MOBILE_NOT_LESS_10,
          // },
          // maxLength: {
          //   value: 15,
          //   message: validationMessage?.MOBILE_NOT_GRATER_15,
          // },
        })}
        onChange={(value, data) => {
          setValue("countryCode", `+${data?.dialCode}`, {
            shouldValidate: true,
          });
          setValue(name, value?.slice(data?.dialCode?.length), {
            shouldValidate: true,
          });
          setPhone(data?.dialCode + value?.slice(data?.dialCode?.length));
        }}
        containerStyle={{
          height: height || "56px",
          outline: 0,
        }}
        dropdownStyle={{
          zIndex: 100,
          maxHeight: "150px",
          outline: 0,
        }}
        inputStyle={{
          width: "100%",
          height: height || "56px",
          outline: 0,
          paddingLeft: "50px",
          backgroundColor: backgroundColor || "",
        }}
        {...rest}
      />
      <ErrorMessage message={errors?.[name]?.message} />
    </div>
  );
};

export default PhoneInputField;
