import React, { Fragment } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import Accordion from "react-bootstrap/Accordion";
import AppButtons from "@/components/shared/buttons/appButtons";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { MaxLength } from "@/utils/constants/CharactersLength";
import BarnWallAccordionItem from "./barnWallAccordionItem";
import BarnCustomLeanTo from "./barnCustomLeanTo";
import BarnWalkInAccordionItem from "./barnWalkInAccordionItem";
import { constantTypes } from "@/utils/constants/constant";
import BarnDoorOptionAccordionItem from "./barnDoorOptionAccordionItem";
import BarnWindowAccordionItem from "./barnWindowAccordionItem";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const BarnAccordionSection = ({
  buildingTypeValue,
  register,
  errors,
  optionsBarnArr,
  setOptionsBarnArr,
  moduleType,
  handelEditApi,
  watchedValues,
  setTriggerEditEvent,
  triggerEditEvent,
  handleAddTimeline,
}) => {
  const getBarnsFieldValue = (fieldType, event, custom) => {
    if (
      fieldType === "sideEnd" ||
      fieldType === "size" ||
      fieldType === "walkInDoor" ||
      fieldType === "window"
    ) {
      return custom ? event.target.value : event?.value ? event.value : "";
    } else if (
      fieldType === "width" ||
      fieldType === "length" ||
      fieldType === "height" ||
      fieldType === "qty"
    ) {
      return Number(event.target.value) || 0;
    } else if (event.target.type === "checkbox") {
      return event.target.checked;
    } else if (fieldType === "certification") {
      return event.target.value === "true";
    } else {
      return event.target.value;
    }
  };

  const handleChangeBarnsOptions = (fieldType, event, id, custom, type) => {
    const value = getBarnsFieldValue(fieldType, event, custom);
    let defaultSize;

    if (
      type === "doorOptionCentralBuilding" ||
      type === "doorOptionLeftLeanTo" ||
      type === "doorOptionRightLeanTo" ||
      type === "doorOptionAdditionalLeanTo"
    ) {
      defaultSize = constantTypes?.barnDoorOptionsCentralSize[0]?.value || "";
    }

    setOptionsBarnArr((prevOptions) => ({
      ...prevOptions,
      [type]: prevOptions[type]?.map((item) => {
        if (item.id === id) {
          if (fieldType === "custom" && !value) {
            return { ...item, size: defaultSize, [fieldType]: value };
          }
          if (fieldType === "custom" && value) {
            return { ...item, size: "", [fieldType]: value };
          }
          return { ...item, [fieldType]: value };
        }
        return item;
      }),
    }));
    if (moduleType) {
      setTriggerEditEvent(!triggerEditEvent);
    }
  };

  const handleAddAnotherBarnsOption = (type) => {
    const nextId =
      optionsBarnArr[type].length > 0
        ? optionsBarnArr[type][optionsBarnArr[type]?.length - 1]?.id + 1
        : 1;

    let newOption;

    if (type === "customLeanTo") {
      newOption = {
        id: nextId,
        sideEnd: "Left Side",
        width: 0,
        height: 0,
        length: 0,
      };
    } else if (
      type === "walkInOptionCentralBuilding" ||
      type === "walkInOptionLeftLeanTo" ||
      type === "walkInOptionRightLeanTo" ||
      type === "walkInOptionAdditionalLeanTo"
    ) {
      newOption = {
        id: nextId,
        walkInDoor: "Right Side",
        size: "36x80",
        color: "With Window",
        qty: 0,
        notes: "",
      };
    } else if (
      type === "doorOptionCentralBuilding" ||
      type === "doorOptionLeftLeanTo" ||
      type === "doorOptionRightLeanTo" ||
      type === "doorOptionAdditionalLeanTo"
    ) {
      newOption = {
        id: nextId,
        sideEnd: "Left Side",
        size: "36x80",
        qty: 0,
        doorColor: "",
        certification: true,
        dutch: false,
        chainHoist: false,
        custom: false,
        notes: "",
      };
    } else if (
      type === "windowCentralBuilding" ||
      type === "windowLeftLeanTo" ||
      type === "windowRightLeanTo" ||
      type === "windowAdditionalLeanTo"
    ) {
      newOption = {
        id: nextId,
        window: "Right Side",
        size: "30x36",
        qty: 0,
        custom: false,
        notes: "",
      };
    }

    setOptionsBarnArr((prevOptions) => ({
      ...prevOptions,
      [type]: [...prevOptions[type], newOption],
    }));
  };

  const deleteAnotherBarnsOption = (id, type) => {
    setOptionsBarnArr((prevOptions) => ({
      ...prevOptions,
      [type]: prevOptions[type]?.filter((item) => item?.id !== id),
    }));
  };

  return (
    <Fragment>
      {buildingTypeValue === "barn" && (
        <div className={addLeadStyle.lead_barn}>
          <div className={addLeadStyle.barn_div_style}>
            <div className={addLeadStyle.header_option}>Central Building</div>
            <div className={addLeadStyle.barn_div_inner}>
              <div className={ProfileStyle.form_floating}>
                <CustomizedFormFields
                  type="text"
                  name="biCentralBuildingWidth"
                  placeholder="Enter width"
                  register={{
                    ...register("biCentralBuildingWidth", {
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
                      handleAddTimeline(
                        "Central building width",
                        watchedValues?.biCentralBuildingWidth
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
                  name="biCentralBuildingLength"
                  placeholder="Enter length"
                  register={{
                    ...register("biCentralBuildingLength", {
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
                      handleAddTimeline(
                        "Central building length",
                        watchedValues?.biCentralBuildingLength
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
                  name="biCentralBuildingHeight"
                  placeholder="Enter height"
                  register={{
                    ...register("biCentralBuildingHeight", {
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
                      handleAddTimeline(
                        "Central building height",
                        watchedValues?.biCentralBuildingHeight
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
          </div>
          <div className={addLeadStyle.barn_div_style}>
            <div className={addLeadStyle.header_option}>Left Lean-to</div>
            <div className={addLeadStyle.barn_div_inner}>
              <div className={ProfileStyle.form_floating}>
                <CustomizedFormFields
                  type="text"
                  name="biLeftLeanToWidth"
                  placeholder="Enter width"
                  register={{
                    ...register("biLeftLeanToWidth", {
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
                      handleAddTimeline(
                        "Left lean to width",
                        watchedValues?.biLeftLeanToWidth
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
                  name="biLeftLeanLength"
                  placeholder="Enter Length"
                  register={{
                    ...register("biLeftLeanLength", {
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
                      handleAddTimeline(
                        "Left lean to length",
                        watchedValues?.biLeftLeanLength
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
                  name="biLeftLeanHeight"
                  placeholder="Enter Height"
                  register={{
                    ...register("biLeftLeanHeight", {
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
                      handleAddTimeline(
                        "Left lean to height",
                        watchedValues?.biLeftLeanHeight
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
          </div>
          <div className={addLeadStyle.barn_div_style}>
            <div className={addLeadStyle.header_option}>Right Lean-to</div>
            <div className={addLeadStyle.barn_div_inner}>
              <div className={ProfileStyle.form_floating}>
                <CustomizedFormFields
                  type="text"
                  name="biRightLeanWidth"
                  placeholder="Enter Width"
                  register={{
                    ...register("biRightLeanWidth", {
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
                      handleAddTimeline(
                        "Right lean to width",
                        watchedValues?.biRightLeanWidth
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
                  name="biRightLeanLength"
                  placeholder="Enter Length"
                  register={{
                    ...register("biRightLeanLength", {
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
                      handleAddTimeline(
                        "Right lean to length",
                        watchedValues?.biRightLeanLength
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
                  name="biRightLeanHeight"
                  placeholder="Enter Height"
                  register={{
                    ...register("biRightLeanHeight", {
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
                      handleAddTimeline(
                        "Right lean to height",
                        watchedValues?.biRightLeanHeight
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
          </div>
          {/* custom Lean-to */}
          <BarnCustomLeanTo
            optionsBarnArr={optionsBarnArr}
            setOptionsBarnArr={setOptionsBarnArr}
            deleteAnotherBarnsOption={deleteAnotherBarnsOption}
            handleAddAnotherBarnsOption={handleAddAnotherBarnsOption}
            handleChangeBarnsOptions={handleChangeBarnsOptions}
            moduleType={moduleType}
            handleAddTimeline={handleAddTimeline}
          />

          <div className={ProfileStyle.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biBarnConnectionStyle"
              placeholder="Enter connection style."
              register={{
                ...register("biBarnConnectionStyle", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Connection Style"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline(
                    "Connection style",
                    watchedValues?.biBarnConnectionStyle
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
              name="biBarnConnectionFees"
              placeholder="Enter connection fees"
              register={{
                ...register("biBarnConnectionFees", {
                  required: false,
                }),
              }}
              inputType={"number"}
              maxLength={36}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Connection Fees"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline(
                    "Connection Fees",
                    watchedValues?.biBarnConnectionFees
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
              name="biBarnCertificationAndGauge"
              placeholder="Enter certification and gauge."
              register={{
                ...register("biBarnCertificationAndGauge", {
                  required: false,
                }),
              }}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Certification & Gauge"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline(
                    "Certification & gauge",
                    watchedValues?.biBarnCertificationAndGauge
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

          <Accordion
            className={`${addLeadStyle.lead_accordians} ${addLeadStyle.barn_accordians}`}
            defaultActiveKey={[""]}
            alwaysOpen
          >
            <BarnWallAccordionItem
              register={register}
              errors={errors}
              optionsBarnArr={optionsBarnArr}
              handleChangeBarnsOptions={handleChangeBarnsOptions}
              moduleType={moduleType}
              handleAddTimeline={handleAddTimeline}
              watchedValues={watchedValues}
              handelEditApi={handelEditApi}
            />

            <BarnWalkInAccordionItem
              optionsBarnArr={optionsBarnArr}
              deleteAnotherBarnsOption={deleteAnotherBarnsOption}
              handleChangeBarnsOptions={handleChangeBarnsOptions}
              moduleType={moduleType}
              handleAddAnotherBarnsOption={handleAddAnotherBarnsOption}
              watchedValues={watchedValues}
              handleAddTimeline={handleAddTimeline}
            />

            <BarnDoorOptionAccordionItem
              optionsBarnArr={optionsBarnArr}
              deleteAnotherBarnsOption={deleteAnotherBarnsOption}
              handleChangeBarnsOptions={handleChangeBarnsOptions}
              handleAddAnotherBarnsOption={handleAddAnotherBarnsOption}
              moduleType={moduleType}
              handleAddTimeline={handleAddTimeline}
            />

            <BarnWindowAccordionItem
              optionsBarnArr={optionsBarnArr}
              deleteAnotherBarnsOption={deleteAnotherBarnsOption}
              handleChangeBarnsOptions={handleChangeBarnsOptions}
              handleAddAnotherBarnsOption={handleAddAnotherBarnsOption}
              moduleType={moduleType}
              handleAddTimeline={handleAddTimeline}
            />
          </Accordion>
        </div>
      )}
    </Fragment>
  );
};

export default BarnAccordionSection;
