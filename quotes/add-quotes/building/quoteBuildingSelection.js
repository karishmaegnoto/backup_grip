import React, { Fragment } from "react";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import { MaxLength } from "@/utils/constants/CharactersLength";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { constantTypes } from "@/utils/constants/constant";
import devStyle from "@/styles/devStyle.module.scss";

const QuoteBuildingSelection = ({
  register,
  errors,
  moduleType,
  ProfileStyle,
  buildingTypeValue,
  buildingTypeFieldDisabled,
}) => {
  return (
    <Fragment>
      <div className={styles.form_floating}>
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
          className={styles.form_control}
          floatingLabel="Installation Zipcode"
          disabled={moduleType === "view"}
          //   onBlur={() => {
          //     if (moduleType) {
          //       handleAddTimeline(
          //         "Installation zip-code",
          //         watchedValues?.biInstallationZipCode
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
          className={styles.form_control}
          floatingLabel="Surface"
          disabled={moduleType === "view"}
          //   onBlur={() => {
          //     if (moduleType) {
          //       handleAddTimeline(
          //         "Foundation type",
          //         watchedValues?.biFoundationType
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
      <div className={`${styles.form_floating} form_select`}>
        <CustomizedFormFields
          type="select"
          name="biBuildingType"
          value={buildingTypeValue}
          register={{
            ...register("biBuildingType", {
              required: false,
            }),
          }}
          errors={errors}
          floatingLabel="Building Type"
          selectOption={constantTypes?.buildingType}
          selectOptionLabel="Select building type"
          className={
            buildingTypeFieldDisabled
              ? `${styles.form_control} ${devStyle.disabled_fields}`
              : `${styles.form_control}`
          }
          disabled={buildingTypeFieldDisabled || moduleType === "view"}
        />
      </div>
    </Fragment>
  );
};

export default QuoteBuildingSelection;
