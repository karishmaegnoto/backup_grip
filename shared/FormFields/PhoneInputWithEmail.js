// components/PhoneInputField.js

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ErrorMessage from "./ErrorMessage";

const PhoneInputWithEmail = ({
  register,
  setValue,
  watch,
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
        onBlur
        {...register}
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

export default PhoneInputWithEmail;
