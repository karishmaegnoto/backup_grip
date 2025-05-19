import React from "react";
import styles from "@/app/[slug]/quotes/add-quotes/add-quotes.module.scss";
import QuoteBuildingSelection from "./quoteBuildingSelection";
import QuoteBuildingTopInputGroup from "./quoteBuildingTopInputGroup";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import { MaxLength } from "@/utils/constants/CharactersLength";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import GarageAndCarportAccordion from "@/components/lead/add-leads/building/garageAndCarportAccordion";
import BarnAccordionSection from "@/components/lead/add-leads/building/barn/barnAccordionSection";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";

// import BarnAccordionSection from "./barn/barnAccordionSection";

const QuoteBuildingInformation = ({
  setValue,
  watch,
  register,
  errors,
  ProfileStyle,
  moduleType,
  buildingTypeValue,
  buildingTypeFieldDisabled,
  visibleBuilding,

  // buildingTypeValue,
  biBarnStyleValue,
  optionsArr,
  setOptionsArr,
  optionsBarnArr,
  setOptionsBarnArr,
  attachedFiles,
  setAttachedFiles,
  // buildingTypeFieldDisabled,
  toggleDeleteAttachmentModal,
  // moduleType,
  handelEditApi,
  watchedValues,
  setTriggerEditEvent,
  triggerEditEvent,
  // visibleBuilding,
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
      <div className={styles.add_input_info}>
        {visibleBuilding && (
          <QuoteBuildingSelection
            register={register}
            errors={errors}
            moduleType={moduleType}
            ProfileStyle={ProfileStyle}
            buildingTypeValue={buildingTypeValue}
            buildingTypeFieldDisabled={buildingTypeFieldDisabled}
          />
        )}

        {visibleBuilding && (
          <QuoteBuildingTopInputGroup
            buildingTypeValue={buildingTypeValue}
            register={register}
            errors={errors}
            moduleType={moduleType}
            ProfileStyle={ProfileStyle}
          />
        )}
      </div>

      {visibleBuilding && (
        <GarageAndCarportAccordion
          buildingTypeValue={buildingTypeValue}
          register={register}
          errors={errors}
          optionsArr={optionsArr}
          setOptionsArr={setOptionsArr}
          // moduleType={moduleType}
          watchedValues={watchedValues}
          handelEditApi={handelEditApi}
          setTriggerEditEvent={setTriggerEditEvent}
          triggerEditEvent={triggerEditEvent}
          handleAddTimeline={handleAddTimeline}
          moduleType="view"
        />
      )}

      {visibleBuilding && (
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
      )}
    </div>
  );
};

export default QuoteBuildingInformation;
