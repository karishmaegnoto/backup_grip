import React, { Fragment } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { MaxLength } from "@/utils/constants/CharactersLength";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const NotBarnTopInputGroup = ({
  buildingTypeValue,
  register,
  errors,
  moduleType,
  handelEditApi,
  watchedValues,
  handleAddTimeline = () => {},
}) => {
  return (
    <Fragment>
      {buildingTypeValue !== "barn" && (
        <>
          <div className={ProfileStyle.form_floating}>
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
              className={ProfileStyle.form_control}
              floatingLabel="Width"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Width", watchedValues?.biWidth);
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
              name="biLength"
              placeholder="Enter Length"
              register={{
                ...register("biLength", {
                  required: false,
                }),
              }}
              inputType={"number"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Length"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Length", watchedValues?.biLength);
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
              name="biHeight"
              placeholder="Enter height"
              register={{
                ...register("biHeight", {
                  required: false,
                }),
              }}
              inputType={"number"}
              maxLength={MaxLength.wLHLength}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Height"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Height", watchedValues?.biHeight);
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
              name="biCertification"
              placeholder="Enter certification"
              register={{
                ...register("biCertification", {
                  required: false,
                }),
              }}
              inputType={"text"}
              // maxLength={MaxLength.wLHLength}
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
          <div className={ProfileStyle.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biGauge"
              placeholder="Enter gauge"
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
    </Fragment>
  );
};

export default NotBarnTopInputGroup;
