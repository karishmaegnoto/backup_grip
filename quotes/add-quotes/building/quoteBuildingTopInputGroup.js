import React, { Fragment } from "react";
import { MaxLength } from "@/utils/constants/CharactersLength";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const QuoteBuildingTopInputGroup = ({
  buildingTypeValue,
  register,
  errors,
  moduleType,
  handelEditApi,
  watchedValues,
  handleAddTimeline,
  ProfileStyle,
}) => {
  return (
    <Fragment>
      {buildingTypeValue !== "barn" && (
        <>
          <div className={styles.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biWidth"
              placeholder="Enter width"
              register={{
                ...register("biWidth", {
                  required: false,
                }),
              }}
              inputType={"number"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={styles.form_control}
              disabled={moduleType === "view"}
              floatingLabel="Width"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Width", watchedValues?.biWidth);
              //     handelEditApi(watchedValues);
              //   }
              // }}
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
              name="biLength"
              placeholder="Enter Length"
              register={{
                ...register("biLength", {
                  required: false,
                }),
              }}
              inputType={"number"}
              disabled={moduleType === "view"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={styles.form_control}
              floatingLabel="Length"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Length", watchedValues?.biLength);
              //     handelEditApi(watchedValues);
              //   }
              // }}
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
              name="biHeight"
              placeholder="Enter height"
              disabled={moduleType === "view"}
              register={{
                ...register("biHeight", {
                  required: false,
                }),
              }}
              inputType={"number"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={styles.form_control}
              floatingLabel="Height"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Height", watchedValues?.biHeight);
              //     handelEditApi(watchedValues);
              //   }
              // }}
            />
            {moduleType == "view" && (
              <div className={ProfileStyle.beforeEdit}>
                <InputEditSvg />
              </div>
            )}
          </div>
          {/* <div className={styles.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biCertificationAndGauge"
              placeholder="Enter certification & gauge"
              register={{
                ...register("biCertificationAndGauge", {
                  required: false,
                }),
              }}
              inputType={"number"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={styles.form_control}
              floatingLabel="Certification & Gauge"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline(
              //       "Certification & gauge",
              //       watchedValues?.biCertificationAndGauge
              //     );
              //     handelEditApi(watchedValues);
              //   }
              // }}
            />
            {moduleType == "view" && (
              <div className={ProfileStyle.beforeEdit}>
                <InputEditSvg />
              </div>
            )}
          </div> */}
          <div className={styles.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biCertification"
              placeholder="Enter certification"
              disabled={moduleType === "view"}
              register={{
                ...register("biCertification", {
                  required: false,
                  pattern: {
                    value: /^[A-Za-z0-9\s]*$/,
                    message: "Only Numbers & characters are allowed",
                  },
                }),
              }}
              inputType={"text"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Certification"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline(
                    "Certification",
                    watchedValues?.biCertification
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
          <div className={styles.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biGauge"
              placeholder="Enter gauge"
              disabled={moduleType === "view"}
              register={{
                ...register("biGauge", {
                  required: false,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only numeric values are allowed",
                  },
                }),
              }}
              inputType={"number"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Gauge"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Gauge", watchedValues?.biGauge);
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
        </>
      )}
      {buildingTypeValue == "barn" && (
        <div className={`${styles.form_floating} form_select`}>
          <CustomizedFormFields
            type="select"
            name="biBarnStyle"
            value={biBarnStyleValue}
            disabled={moduleType === "view"}
            register={{
              ...register("biBarnStyle", {
                required: false,
              }),
            }}
            className={`${styles.form_control}`}
            errors={errors}
            floatingLabel="Barn Style"
            selectOption={constantTypes?.barnStyle}
            selectOptionLabel="Select building type"
            // onBlur={() => {
            //   if (moduleType) {
            //     handleAddTimeline("Barn style", watchedValues?.biBarnStyle);
            //     handelEditApi(watchedValues);
            //   }
            // }}
          />
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
      )}
      {buildingTypeValue !== "barn" && (
        <>
          <div className={styles.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biRoofStyle"
              placeholder="Enter roof style "
              disabled={moduleType === "view"}
              register={{
                ...register("biRoofStyle", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={styles.form_control}
              floatingLabel="Roof Style"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Roof style", watchedValues?.biRoofStyle);
              //     handelEditApi(watchedValues);
              //   }
              // }}
            />
            {moduleType == "view" && (
              <div className={ProfileStyle.beforeEdit}>
                <InputEditSvg />
              </div>
            )}
          </div>
          {/* <div className={styles.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biWallSiding"
              placeholder="Enter wall siding."
              register={{
                ...register("biWallSiding", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Wall Siding"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Wall Siding", watchedValues?.biWallSiding);
              //     handelEditApi(watchedValues);
              //   }
              // }}
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
              name="biFrontEnd"
              placeholder="Enter front end."
              register={{
                ...register("biFrontEnd", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Front End"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Front End", watchedValues?.biFrontEnd);
              //     handelEditApi(watchedValues);
              //   }
              // }}
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
              name="biBackEnd"
              placeholder="Enter back end."
              register={{
                ...register("biBackEnd", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Back End"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Back End", watchedValues?.biBackEnd);
              //     handelEditApi(watchedValues);
              //   }
              // }}
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
              name="biLeftEnd"
              placeholder="Enter left end."
              register={{
                ...register("biLeftEnd", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Left End"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Left End", watchedValues?.biLeftEnd);
              //     handelEditApi(watchedValues);
              //   }
              // }}
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
              name="biRightSide"
              placeholder="Enter right side."
              register={{
                ...register("biRightSide", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Right Side"
              // onBlur={() => {
              //   if (moduleType) {
              //     handleAddTimeline("Right Side", watchedValues?.biRightSide);
              //     handelEditApi(watchedValues);
              //   }
              // }}
            />
            {moduleType == "view" && (
              <div className={ProfileStyle.beforeEdit}>
                <InputEditSvg />
              </div>
            )}
          </div> */}
        </>
      )}
    </Fragment>
  );
};

export default QuoteBuildingTopInputGroup;
