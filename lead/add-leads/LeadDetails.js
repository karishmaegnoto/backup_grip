import React, { useContext } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import styles from "@/app/[slug]/leads/edit-lead/[id]/editLead.module.scss";
import LeadContext from "@/hooks/context/LeadContext";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import ErrorMessage from "@/components/shared/FormFields/ErrorMessage";
import MultiSelect from "@/components/shared/FormFields/multiSelect";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { whiteSpaceCheck } from "@/helper/helper";
import { MaxLength } from "@/utils/constants/CharactersLength";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import PhoneInputWithEmail from "@/components/shared/FormFields/PhoneInputWithEmail";
import { regex } from "@/utils/constants/regexVariables";
import leadStyle from "@/app/[slug]/leads/lead.module.scss";
import ODateTimePicker from "@/components/shared/datePicker/ODateTimePicker";
import devStyle from "@/styles/devStyle.module.scss";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const LeadDetails = ({
  handleChange,
  addError,
  register,
  errors,
  setValue,
  watch,
  setPhone,
  phone,
  emailValue,
  mobileValue,
  addValues,
  dateAndTimeValue,
  handleChangeDate,
  emailFieldDisabled,
  mobileFieldDisabled,
  moduleType,
  editLeadData,
  handelEditApi,
  watchedValues,
  handleAddTimeline,
  show3DRefInput,
}) => {
  let {
    leadOwnerDetails,
    leadSourceDetails,
    leadManufacturerDetails,
    leadStatusDetails,
    allLeadDataLoader,
    leadAssistantDetails,
  } = useContext(LeadContext);

  return (
    <div className={ProfileStyle.profile_info_details}>
      <div className={`${ProfileStyle.form_floating} form_select`}>
        <SingleSelect
          options={leadOwnerDetails}
          label={"Select Lead Owner"}
          onSelectionChange={handleChange("leadOwner")}
          value={addValues.leadOwner}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          handleAddTimeline={handleAddTimeline}
          labelKey={"Lead Owner"}
        />
        {addError?.leadOwnerError && (
          <ErrorMessage message={addError?.leadOwnerError} />
        )}
        <label>Lead Owner*</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      {moduleType && editLeadData?.sharedWith?.length > 0 && (
        <div className={`${ProfileStyle.form_floating} form_select`}>
          <MultiSelect
            options={leadOwnerDetails}
            label={"Select Share With"}
            onSelectionChange={handleChange("shareWith")}
            value={addValues.shareWith}
            loader={allLeadDataLoader}
            maxLimit={3}
            moduleType={moduleType}
            handleAddTimeline={handleAddTimeline}
            labelKey={"Share with"}
          />
          <label>Share With*</label>
          {moduleType == "view" && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
      )}
      <div className={`${ProfileStyle.form_floating} form_select`}>
        <MultiSelect
          options={leadAssistantDetails}
          label={"Select Lead Owner Assist"}
          onSelectionChange={handleChange("leadAssistant")}
          value={addValues.leadAssistant}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          handleAddTimeline={handleAddTimeline}
          labelKey={"Lead assistant"}
        />
        {addError?.leadAssistantError && (
          <ErrorMessage message={addError?.leadAssistantError} />
        )}
        <label>Lead Owner Assist*</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={ProfileStyle.form_floating}>
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
          className={ProfileStyle.form_control}
          inputType={"text"}
          maxLength={MaxLength.nameLen}
          errors={errors}
          floatingLabel="First Name"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("First name", watchedValues?.firstName);
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
          className={ProfileStyle.form_control}
          floatingLabel="Last Name *"
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
      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="email"
          placeholder="Enter your email"
          register={{
            ...register("email", {
              required: !mobileValue && ValidationMessage?.EMAIL_REQUIRED,
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
          // className={`${ProfileStyle.form_control}`}
          className={
            emailFieldDisabled
              ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
              : `${ProfileStyle.form_control}`
          }
          // disabled={emailFieldDisabled}
          //-------------------------------------Testing-------------------------------------------------------
          // disabled={!!mobileValue}
          //-------------------------------------Testing--------------------------------------------------------
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Email", watchedValues?.email);
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
      <div
        className={`${ProfileStyle.form_floating} ${ProfileStyle.mobile_fields}`}
      >
        <PhoneInputWithEmail
          setValue={setValue}
          watch={watch}
          errors={errors}
          name="mobile"
          validationMessage={ValidationMessage}
          regex={regex}
          countryCode="+91"
          initialPhone=""
          setPhone={setPhone}
          phone={phone}
          className={""}
          height={"49px"}
          register={{
            ...register("mobile", {
              required: !emailValue && ValidationMessage.MOBILE_NUMBER_REQUIRED,
            }),
          }}
          // disabled={mobileFieldDisabled}
          //-------------------------------------Testing--------------------------------------------------------
          // disabled={!!emailValue}
          //-------------------------------------Testing--------------------------------------------------------
          backgroundColor={mobileFieldDisabled ? "rgb(249, 249, 249)" : ""}
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Mobile no", watchedValues?.mobile);
              handelEditApi(watchedValues);
            }
          }}
        />
        <label className={ProfileStyle.check_mobile}>Mobile No.</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>

      <div className={ProfileStyle.form_floating}>
        <CustomizedFormFields
          type="text"
          name="phoneNo"
          placeholder="Enter your phone no"
          register={{
            ...register("phoneNo", {
              required: false,
            }),
          }}
          inputType={"number"}
          maxLength={MaxLength.officePhone}
          errors={errors}
          className={ProfileStyle.form_control}
          floatingLabel="Phone No"
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Phone no", watchedValues?.phoneNo);
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
          onKeyPress={false}
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Web form", watchedValues?.webForm);
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
        <SingleSelect
          options={leadStatusDetails}
          label={"Lead Status"}
          onSelectionChange={handleChange("leadStatus")}
          value={addValues.leadStatus}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          labelKey={"Lead status"}
        />
        <label>Lead Status</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>

      <div className={`${ProfileStyle.form_floating} form_select`}>
        <SingleSelect
          options={leadSourceDetails.filter(
            (option) => option && option.title && option.value
          )}
          label={"Lead Source"}
          onSelectionChange={handleChange("leadSource")}
          value={addValues.leadSource}
          loader={allLeadDataLoader}
          disabled={moduleType ? true : false}
          moduleType={moduleType}
          handleAddTimeline={handleAddTimeline}
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
        <div className={`${ProfileStyle.form_floating} form_select`}>
          <CustomizedFormFields
            type="text"
            name="threeDRef"
            placeholder="3D Reference Number"
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

      <div className={`${ProfileStyle.form_floating} form_select`}>
        <SingleSelect
          options={leadManufacturerDetails}
          label={"Manufacture"}
          onSelectionChange={handleChange("leadManufacturer")}
          value={addValues.leadManufacturer}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          handleAddTimeline={handleAddTimeline}
          labelKey={"Lead manufacturer"}
        />
        <label>Manufacturer</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={`${ProfileStyle.form_floating} form_select`}>
        {/* {moduleType ? (
          <ODateTimePicker
            name="dateAndTimePicker"
            value={dateAndTimeValue && new Date(dateAndTimeValue)}
            className={ProfileStyle.form_control}
            placeholder={"Enter contact date & time."}
            errors={errors}
            onChange={handleChangeDate}
          />
        ) : ( */}
        <ODateTimePicker
          name="dateAndTimePicker"
          value={dateAndTimeValue && new Date(dateAndTimeValue)}
          className={ProfileStyle.form_control}
          placeholder={"Enter contact date & time."}
          minDate={new Date()}
          errors={errors}
          onChange={handleChangeDate}
        />

        <label htmlFor="date">Contact Date & Time</label>
      </div>
      <div
        className={`${ProfileStyle.form_floating} ${ProfileStyle.form_textarea}`}
      >
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
          onBlur={() => {
            if (moduleType) {
              handleAddTimeline("Notes", watchedValues?.notes);
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

export default LeadDetails;
