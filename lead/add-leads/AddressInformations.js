import React from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { whiteSpaceCheck } from "@/helper/helper";
import { MaxLength } from "@/utils/constants/CharactersLength";
import LogoutSpinner from "@/components/shared/Loader/logout-spinner";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const AddressInformation = ({
  register,
  errors,
  getStateByZipCode,
  stateByZipLoader,
  handelEditApi,
  moduleType,
  watchedValues,
  handleAddTimeline,
}) => {
  return (
    <div className={ProfileStyle.profile_info_details}>
      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="addressLineOne"
          placeholder="Enter your address line one"
          register={{
            ...register("addressLineOne", {
              required: false,
            }),
          }}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Address Line 1"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Address line one",
                watchedValues?.addressLineOne
              );
              handelEditApi(watchedValues);
            }
          }}
        />
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="addressLineTwo"
          placeholder="Enter your address line two"
          register={{
            ...register("addressLineTwo", {
              required: false,
            }),
          }}
          startLabel={false}
          className={ProfileStyle.form_control}
          floatingLabel="Address Line 2"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Address line two",
                watchedValues?.addressLineTwo
              );
              handelEditApi(watchedValues);
            }
          }}
        />{" "}
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="city"
          placeholder="Enter your city"
          register={{
            ...register("city", {
              required: false,
            }),
          }}
          inputType={"text"}
          startLabel={false}
          className={ProfileStyle.form_control}
          floatingLabel="City"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("City", watchedValues?.city);
              handelEditApi(watchedValues);
            }
          }}
        />{" "}
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div
        className={ProfileStyle.form_floating}
        // style={{ position: "relative" }}
      >
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
          className={ProfileStyle.form_control}
          floatingLabel="State"
          disabled={stateByZipLoader}
          style={
            stateByZipLoader
              ? { background: "rgb(249, 249, 249)", cursor: "not-allowed" }
              : {}
          }
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("state", watchedValues?.state);
              handelEditApi(watchedValues);
            }
          }}
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
      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="country"
          placeholder="Enter your country"
          register={{
            ...register("country", {
              required: false,
            }),
          }}
          inputType={"text"}
          startLabel={false}
          className={ProfileStyle.form_control}
          floatingLabel="Country"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("country", watchedValues?.country);
              handelEditApi(watchedValues);
            }
          }}
        />{" "}
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={ProfileStyle.form_floating}>
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
          inputType={"number"}
          errors={errors}
          maxLength={MaxLength.zipCode}
          className={ProfileStyle.form_control}
          //
          floatingLabel="Zip Code *"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("zipcode", watchedValues?.zipcode);
              handelEditApi(watchedValues);
            }
            getStateByZipCode();
          }}
        />{" "}
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressInformation;
