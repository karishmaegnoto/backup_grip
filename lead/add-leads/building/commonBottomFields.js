import React, { Fragment } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { MaxLength } from "@/utils/constants/CharactersLength";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const CommonBottomFields = ({
  register,
  errors,
  moduleType,
  handelEditApi,
  watchedValues,
  handleAddTimeline = () => {},
}) => {
  return (
    <div className={ProfileStyle.common_div}>
      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="biRoofColor"
          placeholder="Enter roof color."
          register={{
            ...register("biRoofColor", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Roof Color"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Roof color", watchedValues?.biRoofColor);
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
          name="biWallColor"
          placeholder="Enter wall color."
          register={{
            ...register("biWallColor", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Wall Color"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Wall color", watchedValues?.biWallColor);
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
          name="biTrimColor"
          placeholder="Enter trim color."
          register={{
            ...register("biTrimColor", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Trim Color"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Trim color", watchedValues?.biTrimColor);
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
          name="biGarageDoorColor"
          placeholder="Enter garage door color."
          register={{
            ...register("biGarageDoorColor", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Garage Door Color"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Garage door color",
                watchedValues?.biGarageDoorColor
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
          name="biWainscoat"
          placeholder="Enter wainscoat."
          register={{
            ...register("biWainscoat", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Wainscoat"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Wainscoat", watchedValues?.biWainscoat);
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
          name="biGaugePanel"
          placeholder="Enter gauge panel."
          register={{
            ...register("biGaugePanel", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Gauge Panel"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Gauge panel", watchedValues?.biGaugePanel);
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
          name="biJTrim"
          placeholder="Enter JTrim."
          register={{
            ...register("biJTrim", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="JTrim"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("JTrim", watchedValues?.biJTrim);
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
          name="biExtraAnchors"
          placeholder="Enter extra anchors."
          register={{
            ...register("biExtraAnchors", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Extra Anchors"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Extra anchors", watchedValues?.biExtraAnchors);
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
          name="biTwoTone"
          placeholder="Enter two tone."
          register={{
            ...register("biTwoTone", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Two Tone"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Two tone", watchedValues?.biTwoTone);
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
          name="biExtraBraces"
          placeholder="Enter extra braces."
          register={{
            ...register("biExtraBraces", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Extra Braces"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Extra braces", watchedValues?.biExtraBraces);
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
          name="biExtraBow"
          placeholder="Enter extra bow."
          register={{
            ...register("biExtraBow", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Extra Bow"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Extra bow", watchedValues?.biExtraBow);
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
          name="biTrussUpgraded"
          placeholder="Enter truss upgraded."
          register={{
            ...register("biTrussUpgraded", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Truss Upgraded"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Truss upgraded",
                watchedValues?.biTrussUpgraded
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
          name="biColoredScrews"
          placeholder="Enter colored screws."
          register={{
            ...register("biColoredScrews", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Colored Screws"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Colored Screws",
                watchedValues?.biColoredScrews
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
    </div>
  );
};

export default CommonBottomFields;
