import React, { useContext } from "react";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import LeadContext from "@/hooks/context/LeadContext";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { whiteSpaceCheck } from "@/helper/helper";
import { MaxLength } from "@/utils/constants/CharactersLength";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { regex } from "@/utils/constants/regexVariables";
import devStyle from "@/styles/devStyle.module.scss";
import ODateTimePicker from "@/components/shared/datePicker/ODateTimePicker";

const QuoteLeadDetails = ({
  handleChange,
  addValues,
  register,
  errors,
  moduleType,
  emailFieldDisabled,
  handleChangeDate,
  ProfileStyle,
  show3DRefInput,
}) => {
  let {
    leadOwnerDetails,
    allLeadDataLoader,
    leadStatusDetails,
    leadSourceDetails,
  } = useContext(LeadContext);

  return (
    <div
      className={styles.add_input_info}
      style={moduleType === "view" ? { pointerEvents: "none" } : {}}
    >
      <div className={styles.form_floating}>
        <CustomizedFormFields
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          register={{
            ...register("firstName", {
              required: false,
              validate: (value) => whiteSpaceCheck(value),
            }),
          }}
          className={styles.form_control}
          inputType={"text"}
          maxLength={MaxLength.nameLen}
          errors={errors}
          floatingLabel="First Name"
          disabled={moduleType === "view"}
          //   onBlur={() => {
          //     if (moduleType) {
          //       handleAddTimeline("First name", watchedValues?.firstName);
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
          name="lastName"
          placeholder="Enter your last name"
          register={{
            ...register("lastName", {
              required: ValidationMessage?.LAST_NAME_REQUIRED,
              validate: (value) => whiteSpaceCheck(value),
            }),
          }}
          inputType={"text"}
          maxLength={MaxLength.nameLen}
          errors={errors}
          className={styles.form_control}
          floatingLabel="Last Name *"
          disabled={moduleType === "view"}
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Last name", watchedValues?.lastName);
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
          name="email"
          placeholder="Enter your email"
          register={{
            ...register("email", {
              required: ValidationMessage?.EMAIL_REQUIRED,
              pattern: {
                value: regex?.regEmail,
                message: ValidationMessage?.ENTER_VALID_EMAIL,
              },
              validate: (value) => whiteSpaceCheck(value),
            }),
          }}
          errors={errors}
          inputType="email"
          floatingLabel="Email *"
          className={
            emailFieldDisabled
              ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
              : `${ProfileStyle.form_control}`
          }
          disabled={emailFieldDisabled || moduleType === "view"}
          //   onBlur={() => {
          //     if (moduleType) {
          //       handleAddTimeline("Email", watchedValues?.email);
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
          name="webForm"
          placeholder="Enter web form"
          register={{
            ...register("webForm", {
              required: false,
            }),
          }}
          inputType={"text"}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Web Form"
          disabled={moduleType === "view"}
          onKeyPress={false}
          //   onBlur={() => {
          //     if (moduleType) {
          //       handleAddTimeline("Web form", watchedValues?.webForm);
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
        <SingleSelect
          options={leadStatusDetails}
          label={"Lead Status"}
          onSelectionChange={handleChange("leadStatus")}
          value={addValues.leadStatus}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          labelKey={"Lead status"}
          disabled={moduleType === "view"}
        />
        <label>Lead Status</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={`${styles.form_floating} form_select`}>
        <SingleSelect
          options={leadSourceDetails}
          label={"Lead Source"}
          onSelectionChange={handleChange("leadSource")}
          value={addValues.leadSource}
          loader={allLeadDataLoader}
          disabled={true}
          labelKey={"Lead source"}
        />
        <label>Lead Source</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>

      {/*----------Show 3D Ref Input if lead source == 3D Estimator--------- */}
      {show3DRefInput && (
        <div className={`${styles.form_floating} form_select`}>
          <CustomizedFormFields
            type="text"
            name="threeDRef"
            placeholder="3D Reference Number"
            disabled={moduleType === "view"}
            register={{
              ...register("threeDRef", {
                // required: ValidationMessage?.REF_NUMBER_REQUIRED,
              }),
            }}
            className={ProfileStyle.form_control}
            floatingLabel="3D Reference Number"
            // onBlur={() => {
            //   if (moduleType) {
            //     handleAddTimeline("3D Ref Number", watch("threeDRef"));
            //     handelEditApi(watch());
            //   }
            // }}
          />
        </div>
      )}

      <div className={`${styles.form_floating} form_select`}>
        <ODateTimePicker
          name="dateAndTimePicker"
          // value={addValues?.dateAndTime && new Date(addValues?.dateAndTime)}
          value={
            addValues?.contractDateAndTime &&
            new Date(addValues?.contractDateAndTime)
          }
          className={ProfileStyle.form_control}
          placeholder={"Enter contact date & time."}
          // minDate={new Date()}
          errors={errors}
          onChange={handleChangeDate}
        />
        <label htmlFor="date">Contact Date & Time</label>
      </div>

      <div className={styles.notes_sec_quote}>
        <div className={`${styles.form_floating} ${styles.form_textarea}`}>
          <CustomizedFormFields
            type="textarea"
            name="notes"
            placeholder="Notes"
            register={{
              ...register("notes", {
                required: false,
              }),
            }}
            inputType={"text"}
            maxLength={MaxLength.description}
            errors={errors}
            className={ProfileStyle.form_control}
            rows={3}
            // onBlur={() => {
            //   if (moduleType) {
            //     handleAddTimeline("Notes", watchedValues?.notes);
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
      </div>
    </div>
  );
};

export default QuoteLeadDetails;
