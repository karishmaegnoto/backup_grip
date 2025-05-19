/*eslint-disable @next/next/no-img-element*/
import React, { useContext } from "react";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import LeadContext from "@/hooks/context/LeadContext";
import ErrorMessage from "@/components/shared/FormFields/ErrorMessage";
import AddQuoteAddLeadSvg from "@/assets/svgs/addQuoteAddLeadSvg";
import MultiSelect from "@/components/shared/FormFields/multiSelect";
import PhoneInputWithEmail from "@/components/shared/FormFields/PhoneInputWithEmail";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { regex } from "@/utils/constants/regexVariables";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import { MaxLength } from "@/utils/constants/CharactersLength";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";

const QuoteAddLeadDetails = ({
  handleChange,
  addValues,
  paramsLeadId,
  addError,
  errors,
  setValue,
  watch,
  register,
  setPhone,
  phone,
  mobileFieldDisabled,
  LeadDetails,
  moduleType,
  ProfileStyle,
}) => {
  let {
    leadOwnerDetails,
    allLeadDataLoader,
    leadAssistantDetails,
    leadManufacturerDetails,
  } = useContext(LeadContext);

  const isViewMode = moduleType === "view";

  return (
    <div className={styles.add_input_info}>
      <div className={`${styles.form_floating} form_select`}>
        <SingleSelect
          options={leadOwnerDetails}
          label={"Select Lead Owner"}
          onSelectionChange={handleChange("leadOwner")}
          value={addValues.leadOwner}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          crossButton={false}
          //   handleAddTimeline={handleAddTimeline}
          labelKey={"Lead Owner"}
          disabled={isViewMode}
        />
        {addError?.leadOwnerError && (
          <ErrorMessage message={addError?.leadOwnerError} />
        )}
        <label>Lead Owner*</label>
        {isViewMode && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      {/* {!paramsLeadId && (
        <div className={styles.form_floating}>
          <input type="text" id="lead" placeholder="lead*" />
          <label htmlFor="lead">Lead*</label>
          <button className={styles.add_lead}>
            <AddQuoteAddLeadSvg />
            Add
          </button>
        </div>
      )} */}
      {LeadDetails?.sharedWith?.length > 0 && (
        <div className={`${styles.form_floating} form_select`}>
          <MultiSelect
            options={leadOwnerDetails}
            label={"Select Share With"}
            onSelectionChange={handleChange("shareWith")}
            value={addValues.shareWith}
            loader={allLeadDataLoader}
            maxLimit={3}
            moduleType={moduleType}
            // handleAddTimeline={handleAddTimeline}
            labelKey={"Share with"}
            disabled={isViewMode}
          />
          <label>Share With</label>
          {isViewMode && (
            <div className={ProfileStyle.beforeEdit}>
              <InputEditSvg />
            </div>
          )}
        </div>
      )}
      <div
        className={`${styles.form_floating} form_select`}
        style={isViewMode ? { pointerEvents: "none" } : {}}
      >
        <MultiSelect
          options={leadAssistantDetails}
          label={"Select Lead Owner Assist"}
          onSelectionChange={handleChange("leadAssistant")}
          value={addValues.leadAssistant}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          //   handleAddTimeline={handleAddTimeline}
          labelKey={"Lead assistant"}
          disabled={isViewMode}
        />
        {addError?.leadAssistantError && (
          <ErrorMessage message={addError?.leadAssistantError} />
        )}
        <label>Lead Owner Assist*</label>
        {isViewMode && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={`${styles.form_floating} form_select`}>
        <SingleSelect
          options={leadManufacturerDetails}
          label={"Select Lead Manufacture"}
          onSelectionChange={handleChange("leadManufacturer")}
          value={addValues.leadManufacturer}
          loader={allLeadDataLoader}
          moduleType={moduleType}
          //   handleAddTimeline={handleAddTimeline}
          labelKey={"Lead manufacturer"}
          disabled={isViewMode}
        />
        <label>Manufacturer</label>
        {isViewMode && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={`${styles.form_floating} ${styles.mobile_fields}`}>
        <PhoneInputWithEmail
          setValue={setValue}
          watch={watch}
          errors={errors}
          name="mobile"
          validationMessage={ValidationMessage}
          regex={regex}
          countryCode={watch("countryCode") || ""}
          initialPhone=""
          setPhone={setPhone}
          phone={phone}
          className={""}
          height={"49px"}
          register={{
            ...register("mobile", {
              required: ValidationMessage.MOBILE_NUMBER_REQUIRED,
            }),
          }}
          disabled={isViewMode || mobileFieldDisabled}
          backgroundColor={
            isViewMode || mobileFieldDisabled ? "rgb(249, 249, 249)" : ""
          }
          onCountryCodeChange={(newCode) => setValue("countryCode", newCode)}
          //   onBlur={() => {
          //     if (moduleType) {
          //       handleAddTimeline("Mobile no", watchedValues?.mobile);
          //       handelEditApi(watchedValues);
          //     }
          //   }}
        />

        <label className={styles.check_mobile}>Mobile No.</label>
        {moduleType == "view" && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
      <div className={styles.form_floating}>
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
          className={styles.form_control}
          floatingLabel="Phone No"
          disabled={isViewMode}
          //   onBlur={() => {
          //     if (moduleType) {
          //       handleAddTimeline("Phone no", watchedValues?.phoneNo);
          //       handelEditApi(watchedValues);
          //     }
          //   }}
        />
        {isViewMode && (
          <div className={ProfileStyle.beforeEdit}>
            <InputEditSvg />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteAddLeadDetails;
