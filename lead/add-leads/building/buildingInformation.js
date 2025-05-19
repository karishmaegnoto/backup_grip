import React, { Fragment } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { MaxLength } from "@/utils/constants/CharactersLength";
import { constantTypes } from "@/utils/constants/constant";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import BuildingSelection from "./buildingSelection";
import NotBarnTopInputGroup from "./notBarnTopInputGroup";
import GarageAndCarportAccordion from "./garageAndCarportAccordion";
import CommonBottomFields from "./commonBottomFields";
import BarnAccordionSection from "./barn/barnAccordionSection";
import LeadAttachment from "../leadAttachment";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import { Eye, EyeOff } from "lucide-react";

const BuildingInformation = ({
  register,
  errors,
  buildingTypeValue,
  biBarnStyleValue,
  optionsArr,
  setOptionsArr,
  optionsBarnArr,
  setOptionsBarnArr,
  attachedFiles,
  setAttachedFiles,
  buildingTypeFieldDisabled,
  toggleDeleteAttachmentModal,
  moduleType,
  handelEditApi,
  watchedValues,
  setTriggerEditEvent,
  triggerEditEvent,
  visibleBuilding,
  setVisibleBuilding,
  handleAddTimeline = () => {},
  setAttachmentType,
  attachmentLoader,
  setAttachmentLoader,
}) => {
  return (
    <div
      className={`${ProfileStyle.profile_info_details} ${ProfileStyle.form_building_info}`}
    >
      {visibleBuilding && (
        <BuildingSelection
          register={register}
          errors={errors}
          buildingTypeValue={buildingTypeValue}
          buildingTypeFieldDisabled={buildingTypeFieldDisabled}
          moduleType={moduleType}
          watchedValues={watchedValues}
          handelEditApi={handelEditApi}
          handleAddTimeline={handleAddTimeline}
        />
      )}

      <div className={addLeadStyle.lead_garage}>
        {visibleBuilding && (
          <>
            <NotBarnTopInputGroup
              buildingTypeValue={buildingTypeValue}
              register={register}
              errors={errors}
              moduleType={moduleType}
              watchedValues={watchedValues}
              handelEditApi={handelEditApi}
              handleAddTimeline={handleAddTimeline}
            />
            {buildingTypeValue == "barn" && (
              <div className={`${ProfileStyle.form_floating} form_select`}>
                <CustomizedFormFields
                  type="select"
                  name="biBarnStyle"
                  value={biBarnStyleValue}
                  register={{
                    ...register("biBarnStyle", {
                      required: false,
                    }),
                  }}
                  className={`${ProfileStyle.form_control}`}
                  errors={errors}
                  floatingLabel="Barn Style"
                  selectOption={constantTypes?.barnStyle}
                  selectOptionLabel="Select building type"
                  onBlur={() => {
                    if (moduleType) {
                      handleAddTimeline(
                        "Barn style",
                        watchedValues?.biBarnStyle
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
            )}
            <div className={ProfileStyle.form_floating}>
              <CustomizedFormFields
                type="text"
                name="biRoofStyle"
                placeholder="Enter roof style "
                register={{
                  ...register("biRoofStyle", {
                    required: false,
                  }),
                }}
                inputType={"text"}
                onKeyPress={false}
                maxLength={MaxLength?.unKnownFields}
                errors={errors}
                className={ProfileStyle.form_control}
                floatingLabel="Roof Style"
                onBlur={() => {
                  if (moduleType) {
                    handleAddTimeline("Roof style", watchedValues?.biRoofStyle);
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
            <GarageAndCarportAccordion
              buildingTypeValue={buildingTypeValue}
              register={register}
              errors={errors}
              optionsArr={optionsArr}
              setOptionsArr={setOptionsArr}
              moduleType={moduleType}
              watchedValues={watchedValues}
              handelEditApi={handelEditApi}
              setTriggerEditEvent={setTriggerEditEvent}
              triggerEditEvent={triggerEditEvent}
              handleAddTimeline={handleAddTimeline}
            />
            <BarnAccordionSection
              buildingTypeValue={buildingTypeValue}
              register={register}
              errors={errors}
              optionsBarnArr={optionsBarnArr}
              setOptionsBarnArr={setOptionsBarnArr}
              moduleType={moduleType}
              watchedValues={watchedValues}
              handelEditApi={handelEditApi}
              setTriggerEditEvent={setTriggerEditEvent}
              triggerEditEvent={triggerEditEvent}
              handleAddTimeline={handleAddTimeline}
            />
          </>
        )}
        <CommonBottomFields
          register={register}
          errors={errors}
          moduleType={moduleType}
          watchedValues={watchedValues}
          handelEditApi={handelEditApi}
          handleAddTimeline={handleAddTimeline}
        />

        {/* ---------------------Testing--------------- */}
        {/* <LeadAttachment
          attachedFiles={attachedFiles}
          setAttachedFiles={setAttachedFiles}
          toggleDeleteAttachmentModal={toggleDeleteAttachmentModal}
          moduleType={moduleType}
          setTriggerEditEvent={setTriggerEditEvent}
          triggerEditEvent={triggerEditEvent}
          handleAddTimeline={handleAddTimeline}
          setAttachmentType={setAttachmentType}
          attachmentLoader={attachmentLoader}
          setAttachmentLoader={setAttachmentLoader}
        /> */}
      </div>
    </div>
    //
  );
};

export default BuildingInformation;
