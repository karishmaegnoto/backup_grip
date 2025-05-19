import React from "react";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import ODateTimePicker from "@/components/shared/datePicker/ODateTimePicker";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import { whiteSpaceCheck } from "@/helper/helper";
import { MaxLength } from "@/utils/constants/CharactersLength";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";

const BuildingSpecialistInformation = ({
  addValues,
  watch,
  register,
  errors,
  handleChangeQuoteDate,
  moduleType,
  ProfileStyle,
}) => {
  return (
    <div
      className={styles.add_input_info}
      style={moduleType === "view" ? { pointerEvents: "none" } : {}}
    >
      <div className={styles.add_input_info}>
        <div className={`${styles.form_floating} form_select`}>
          <ODateTimePicker
            name="dateAndTimePicker"
            value={addValues?.quoteDate && new Date(addValues?.quoteDate)}
            // register={{
            //   ...register("buildingSpecInfo.quoteDate", {
            //     required: false,
            //     validate: (value) => whiteSpaceCheck(value),
            //   }),
            // }}
            className={ProfileStyle.form_control}
            placeholder={"Enter contact date & time."}
            errors={errors}
            onChange={handleChangeQuoteDate}
            disabled={moduleType === "view"}
          />
          <label htmlFor="date">Quote Date</label>
        </div>
        <div className={styles.form_floating}>
          <CustomizedFormFields
            type="text"
            name="quickQuoteName"
            placeholder="Enter quote name"
            register={{
              ...register("buildingSpecInfo.quoteName", {
                required: false,
                validate: (value) => whiteSpaceCheck(value),
              }),
            }}
            disabled={moduleType === "view"}
            className={styles.form_control}
            inputType={"text"}
            maxLength={MaxLength.nameLen}
            errors={errors}
            floatingLabel="Quote Name"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline("First name", watchedValues?.quoteName);
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
            name="directLine"
            placeholder="Enter direct line"
            disabled={moduleType === "view"}
            register={{
              ...register("buildingSpecInfo.directLine", {
                required: false,
                validate: (value) => whiteSpaceCheck(value),
              }),
            }}
            className={styles.form_control}
            inputType={"text"}
            errors={errors}
            floatingLabel="Direct Line"
            //   onBlur={() => {
            //     if (moduleType) {
            //       handleAddTimeline("First name", watchedValues?.quoteName);
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
      </div>
    </div>
  );
};

export default BuildingSpecialistInformation;
