// components/CreditCardForm.js
import React, { Fragment, useState } from "react";
import styles from "./creditCardForm.module.scss";
import loginStyle from "@/app/login/login.module.scss";
import CustomizedFormFields from "../shared/FormFields/CustomizedFormFields";
import { MaxLength } from "@/utils/constants/CharactersLength";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { regex } from "@/utils/constants/regexVariables";
import { whiteSpaceCheck } from "@/helper/helper";
import { useForm } from "react-hook-form";
import Loader from "../shared/Loader/Loader";
import ODatePicker from "../shared/datePicker/ODatePicker";

const CreditCardForm = ({
  register,
  errors,
  expiryDate,
  handleChangeDate,
  dateError,
}) => {
  return (
    <Fragment>
      <h2 className={loginStyle.form_title} style={{ marginTop: "15px" }}>
        Enter your credit card details
      </h2>
      <CustomizedFormFields
        type="text"
        name="cardNumber"
        placeholder="Enter your card no."
        register={{
          ...register("cardNumber", {
            required: ValidationMessage.CARD_NO_REQUIRED,
            validate: (value) => whiteSpaceCheck(value),
          }),
        }}
        className={loginStyle.form_control}
        inputType={"text"}
        errors={errors}
      />

      <ODatePicker
        name="expiryDate"
        value={expiryDate}
        className={loginStyle.form_control}
        placeholder={"MM/YY"}
        minDate={new Date()}
        errors={errors}
        onChange={handleChangeDate}
        dateError={dateError}
      />

      <CustomizedFormFields
        type="text"
        name="cvv"
        placeholder="Enter your cvv."
        register={{
          ...register("cvv", {
            required: ValidationMessage.CVV_REQUIRED,
            validate: (value) => whiteSpaceCheck(value),
          }),
        }}
        className={loginStyle.form_control}
        inputType={"number"}
        errors={errors}
      />
    </Fragment>
  );
};

export default CreditCardForm;
