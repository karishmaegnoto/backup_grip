import React, { Fragment } from "react";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { MaxLength } from "@/utils/constants/CharactersLength";
import { constantTypes } from "@/utils/constants/constant";
import devStyle from "@/styles/devStyle.module.scss";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const BuildingSelection = ({
  register,
  errors,
  buildingTypeValue,
  buildingTypeFieldDisabled,
  moduleType,
  handelEditApi,
  watchedValues,
  handleAddTimeline = () => {},
}) => {
  return (
    <Fragment>
      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="biInstallationZipCode"
          placeholder="Enter installation zip code"
          register={{
            ...register("biInstallationZipCode", {
              required: false,
            }),
          }}
          inputType={"number"}
          maxLength={MaxLength.zipCode}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Installation Zipcode"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Installation zip-code",
                watchedValues?.biInstallationZipCode
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
          name="biFoundationType"
          placeholder="Enter foundation type "
          register={{
            ...register("biFoundationType", {
              required: false,
            }),
          }}
          inputType={"text"}
          onKeyPress={false}
          maxLength={MaxLength?.unKnownFields}
          errors={errors}
          className={ProfileStyle.form_control}
          // floatingLabel="Foundation Type"
          floatingLabel="Surface"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline(
                "Foundation type",
                watchedValues?.biFoundationType
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
      <div className={`${ProfileStyle.form_floating} form_select`}>
        <CustomizedFormFields
          type="select"
          name="biBuildingType"
          value={buildingTypeValue}
          register={{
            ...register("biBuildingType", {
              required: false,
            }),
          }}
          // className={`${ProfileStyle.form_control}`}
          errors={errors}
          floatingLabel="Building Type"
          selectOption={constantTypes?.buildingType}
          selectOptionLabel="Select building type"
          className={
            buildingTypeFieldDisabled
              ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
              : `${ProfileStyle.form_control}`
          }
          disabled={buildingTypeFieldDisabled}
        />
      </div>
    </Fragment>
  );
};

export default BuildingSelection;
