import React from "react";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import LogoutSpinner from "@/components/shared/Loader/logout-spinner";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { whiteSpaceCheck } from "@/helper/helper";
import { MaxLength } from "@/utils/constants/CharactersLength";

const QuoteAddressDetails = ({
  setValue,
  watch,
  register,
  errors,
  moduleType,
  stateByZipLoader,
  getStateByZipCode,
  ProfileStyle,
}) => {
  return (
    <div
      className={styles.add_input_info}
      style={moduleType === "view" ? { pointerEvents: "none" } : {}}
    >
      <div className={styles.add_input_info}>
        <div className={styles.form_floating}>
          <CustomizedFormFields
            type="text"
            name="addressLineOne"
            placeholder="Enter your address line one"
            register={{
              ...register("addressLineOne", {
                required: false,
              }),
            }}
            disabled={moduleType === "view"}
            errors={errors}
            className={styles.form_control}
            floatingLabel="Address Line 1"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline(
            //         "Address line one",
            //         watchedValues?.addressLineOne
            //       );
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
        <div className={styles.form_floating}>
          <CustomizedFormFields
            type="text"
            name="addressLineTwo"
            placeholder="Enter your address line two"
            register={{
              ...register("addressLineTwo", {
                required: false,
              }),
            }}
            disabled={moduleType === "view"}
            startLabel={false}
            className={styles.form_control}
            floatingLabel="Address Line 2"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline(
            //         "Address line two",
            //         watchedValues?.addressLineTwo
            //       );
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
        <div className={styles.form_floating}>
          <CustomizedFormFields
            type="text"
            name="city"
            placeholder="Enter your city"
            register={{
              ...register("city", {
                required: false,
              }),
            }}
            disabled={moduleType === "view"}
            inputType={"text"}
            startLabel={false}
            className={styles.form_control}
            floatingLabel="City"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline("City", watchedValues?.city);
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
        <div className={styles.form_floating}>
          <CustomizedFormFields
            type="text"
            name="state"
            placeholder="Enter your state"
            register={{
              ...register("state", {
                required: false,
              }),
            }}
            inputType={"text"}
            startLabel={false}
            className={styles.form_control}
            floatingLabel="State"
            disabled={(stateByZipLoader, moduleType === "view")}
            style={
              stateByZipLoader
                ? { background: "rgb(249, 249, 249)", cursor: "not-allowed" }
                : {}
            }
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline("state", watchedValues?.state);
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {stateByZipLoader && (
            <span style={{ position: "absolute", top: "14px", right: "10px" }}>
              <LogoutSpinner />
            </span>
          )}
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
        <div className={styles.form_floating}>
          <CustomizedFormFields
            type="text"
            name="country"
            placeholder="Enter your country"
            register={{
              ...register("country", {
                required: false,
              }),
            }}
            disabled={moduleType === "view"}
            inputType={"text"}
            startLabel={false}
            className={styles.form_control}
            floatingLabel="Country"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline("country", watchedValues?.country);
            //       handelEditApi(watchedValues);
            //     }
            //   }}
          />
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
        <div className={styles.form_floating}>
          <CustomizedFormFields
            type="number"
            name="zipcode"
            placeholder="Enter your zip code"
            register={{
              ...register("zipcode", {
                required: ValidationMessage?.ZIP_CODE_FIELD,
                validate: (value) => whiteSpaceCheck(value),
              }),
            }}
            disabled={moduleType === "view"}
            inputType={"number"}
            errors={errors}
            maxLength={MaxLength.zipCode}
            className={styles.form_control}
            floatingLabel="Zip Code *"
            onBlur={() => {
              // if (moduleType) {
              //   handleAddTimeline("zipcode", watchedValues?.zipcode);
              //   handelEditApi(watchedValues);
              // }
              getStateByZipCode();
            }}
          />

          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteAddressDetails;
