import React, { Fragment } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { MaxLength } from "@/utils/constants/CharactersLength";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import Accordion from "react-bootstrap/Accordion";
import { Trash2 } from "lucide-react";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import AppButtons from "@/components/shared/buttons/appButtons";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import { constantTypes } from "@/utils/constants/constant";
import { integerInput } from "@/helper/helper";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const GarageAndCarportAccordion = ({
  buildingTypeValue,
  register,
  errors,
  optionsArr,
  setOptionsArr,
  moduleType,
  handelEditApi = () => {},
  watchedValues,
  setTriggerEditEvent,
  triggerEditEvent,
  handleAddTimeline = () => {},
}) => {
  const getFieldValue = (fieldType, event, custom) => {
    if (
      fieldType === "sideEnd" ||
      fieldType === "size" ||
      fieldType === "walkInDoor" ||
      fieldType === "window"
    ) {
      return custom ? event.target.value : event?.value ? event?.value : "";
    } else if (fieldType === "qty") {
      return Number(event.target.value) || 0;
    } else if (event.target.type === "checkbox") {
      return event.target.checked;
    } else if (fieldType === "certification") {
      return event.target.value === "true";
    } else {
      return event.target.value;
    }
  };

  const handleChangeOptions = (fieldType, event, id, custom, type) => {
    const value = getFieldValue(fieldType, event, custom);
    let defaultSize;

    if (type === "garageDoors") {
      defaultSize = constantTypes?.garageDoorOptionsSize[0]?.value || "";
    } else if (type === "garageWalkIns") {
      defaultSize = constantTypes?.garageWalkInDoorOptionsSize[0]?.value || "";
    } else if (type === "garageWindowOption") {
      defaultSize = constantTypes?.garageWindowOptionsSize[0]?.value || "";
    }

    setOptionsArr((prevOptions) => ({
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

  const handleAddAnotherOption = (type) => {
    const currentOptions = Array.isArray(optionsArr[type])
      ? optionsArr[type]
      : [];
    const nextId =
      currentOptions.length > 0
        ? currentOptions[currentOptions.length - 1]?.id + 1
        : 1;

    let newOption;

    if (type === "garageDoors") {
      newOption = {
        id: nextId,
        sideEnd: "Left Side",
        size: "6x6",
        qty: 0,
        doorColor: "",
        certification: true,
        dutch: false,
        chainHoist: false,
        custom: false,
        notes: "",
      };
    } else if (type === "garageWalkIns") {
      newOption = {
        id: nextId,
        walkInDoor: "Right Side",
        size: "36x80",
        qty: 0,
        color: "With Window",
        notes: "",
        custom: false,
      };
    } else if (type === "garageWindowOption") {
      newOption = {
        id: nextId,
        window: "Right Side",
        size: "30x36",
        qty: 0,
        custom: false,
        notes: "",
      };
    }

    setOptionsArr((prevOptions) => ({
      ...prevOptions,
      [type]: [
        ...(Array.isArray(prevOptions[type]) ? prevOptions[type] : []),
        newOption,
      ],
    }));
  };

  const deleteAnotherOption = (id, type) => {
    setOptionsArr((prevOptions) => ({
      ...prevOptions,
      [type]: prevOptions[type]?.filter((item) => item?.id !== id),
    }));
  };
  return (
    <Fragment>
      {buildingTypeValue !== "barn" && (
        <>
          <div className={ProfileStyle.form_floating}>
            <CustomizedFormFields
              type="text"
              name="biWallSiding"
              placeholder="Enter wall siding."
              register={{
                ...register("biWallSiding", {
                  required: false,
                }),
              }}
              disabled={moduleType === "view"}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Wall Siding"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Wall Siding", watchedValues?.biWallSiding);
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
              name="biFrontEnd"
              placeholder="Enter front end."
              register={{
                ...register("biFrontEnd", {
                  required: false,
                }),
              }}
              disabled={moduleType === "view"}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Front End"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Front End", watchedValues?.biFrontEnd);
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
              name="biBackEnd"
              placeholder="Enter back end."
              register={{
                ...register("biBackEnd", {
                  required: false,
                }),
              }}
              disabled={moduleType === "view"}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Back End"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Back End", watchedValues?.biBackEnd);
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
              name="biLeftEnd"
              placeholder="Enter left end."
              register={{
                ...register("biLeftEnd", {
                  required: false,
                }),
              }}
              disabled={moduleType === "view"}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Left End"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Left End", watchedValues?.biLeftEnd);
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
              name="biRightSide"
              placeholder="Enter right side."
              register={{
                ...register("biRightSide", {
                  required: false,
                }),
              }}
              disabled={moduleType === "view"}
              inputType={"text"}
              onKeyPress={false}
              maxLength={MaxLength?.unKnownFields}
              errors={errors}
              className={ProfileStyle.form_control}
              floatingLabel="Right Side"
              onBlur={() => {
                if (moduleType) {
                  handleAddTimeline("Right Side", watchedValues?.biRightSide);
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
            className={addLeadStyle.lead_accordians}
            defaultActiveKey={[]}
            alwaysOpen
          >
            <Accordion.Item
              eventKey="0"
              className={addLeadStyle.lead_accordian_item}
            >
              <Accordion.Header className={addLeadStyle.lead_accordian_header}>
                Garage Door Options
              </Accordion.Header>
              <Accordion.Body
                className={addLeadStyle.lead_accordian_body}
                style={{
                  visibility: "visible",
                }}
              >
                <div className={addLeadStyle.repeat_div}>
                  {optionsArr?.garageDoors &&
                    optionsArr?.garageDoors?.length > 0 &&
                    optionsArr?.garageDoors?.map((item, index) => {
                      return (
                        <Fragment key={item?.id ?? index}>
                          <div
                            className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                          >
                            DOOR {item?.id}
                            {item?.id !== 1 && (
                              <button
                                type="button"
                                disabled={moduleType === "view"}
                                onClick={() =>
                                  deleteAnotherOption(item?.id, "garageDoors")
                                }
                              >
                                <Trash2 color="lightGray" />
                              </button>
                            )}
                          </div>
                          <div className={ProfileStyle.garage_box}>
                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              <SingleSelect
                                options={
                                  constantTypes?.garageDoorOptionsSideEnd
                                }
                                label={"Side/End"}
                                disabled={moduleType === "view"}
                                onSelectionChange={(e) =>
                                  handleChangeOptions(
                                    "sideEnd",
                                    e,
                                    item?.id,
                                    false,
                                    "garageDoors"
                                  )
                                }
                                value={constantTypes?.garageDoorOptionsSideEnd?.find(
                                  (el) => el?.value === item?.sideEnd
                                )}
                                crossButton={false}
                                moduleType={moduleType}
                                handleAddTimeline={handleAddTimeline}
                                labelKey={"Garage doors - side/end"}
                              />
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              {item?.custom ? (
                                <>
                                  <input
                                    type="text"
                                    disabled={moduleType === "view"}
                                    placeholder="Size"
                                    name="size"
                                    onChange={(e) =>
                                      handleChangeOptions(
                                        "size",
                                        e,
                                        item?.id,
                                        true,
                                        "garageDoors"
                                      )
                                    }
                                    value={item?.size}
                                    onBlur={() => {
                                      if (moduleType) {
                                        handleAddTimeline(
                                          "Garage doors - size",
                                          item?.size
                                        );
                                      }
                                    }}
                                  />
                                  <label htmlFor="">Size</label>
                                  {moduleType == "view" && (
                                    <div className={ProfileStyle.beforeEdit}>
                                      <InputEditSvg />
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <SingleSelect
                                    options={
                                      constantTypes?.garageDoorOptionsSize
                                    }
                                    label={"Size"}
                                    disabled={moduleType === "view"}
                                    onSelectionChange={(e) =>
                                      handleChangeOptions(
                                        "size",
                                        e,
                                        item?.id,
                                        false,
                                        "garageDoors"
                                      )
                                    }
                                    value={constantTypes?.garageDoorOptionsSize?.find(
                                      (el) => el?.value === item?.size
                                    )}
                                    crossButton={false}
                                    moduleType={moduleType}
                                    handleAddTimeline={handleAddTimeline}
                                    labelKey={"Garage doors - size"}
                                  />
                                  {moduleType == "view" && (
                                    <div className={ProfileStyle.beforeEdit}>
                                      <InputEditSvg />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                            <div className={ProfileStyle.form_floating}>
                              <input
                                type="text"
                                id="last_name"
                                placeholder="QTY"
                                name="qty"
                                disabled={moduleType === "view"}
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "qty",
                                    e,
                                    item?.id,
                                    false,
                                    "garageDoors"
                                  )
                                }
                                value={item.qty > 0 ? item.qty : ""}
                                onKeyPress={(e) => integerInput(e)}
                                maxLength={5}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Garage doors - qty",
                                      item?.qty
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">QTY</label>{" "}
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div className={ProfileStyle.form_floating}>
                              <input
                                type="text"
                                id=""
                                placeholder="Door Color"
                                disabled={moduleType === "view"}
                                name="doorColor"
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "doorColor",
                                    e,
                                    item?.id,
                                    false,
                                    "garageDoors"
                                  )
                                }
                                value={item.doorColor}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Garage doors - Door color",
                                      item?.doorColor
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">Door Color</label>{" "}
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              <select
                                name="certification"
                                disabled={moduleType === "view"}
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "certification",
                                    e,
                                    item?.id,
                                    false,
                                    "garageDoors"
                                  )
                                }
                                value={item.certification}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Garage doors - certification",
                                      item?.certification
                                    );
                                  }
                                }}
                              >
                                <option value="">Select Certification </option>
                                <option value={true}>Certified </option>
                                <option value={false}>Not Certified</option>
                              </select>
                              <label htmlFor="role">Certification</label>{" "}
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={addLeadStyle.checkbox_lead}>
                            <div className={addLeadStyle.checkbox_box}>
                              <input
                                type="checkbox"
                                className={addLeadStyle.checkbox}
                                name="dutch"
                                disabled={moduleType === "view"}
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "dutch",
                                    e,
                                    item?.id,
                                    false,
                                    "garageDoors"
                                  )
                                }
                                checked={item.dutch}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Garage doors - dutch",
                                      item.dutch
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">Dutch </label>
                            </div>
                            <div className={addLeadStyle.checkbox_box}>
                              <input
                                type="checkbox"
                                className={addLeadStyle.checkbox}
                                disabled={moduleType === "view"}
                                name="chainHoist"
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "chainHoist",
                                    e,
                                    item?.id,
                                    false,
                                    "garageDoors"
                                  )
                                }
                                checked={item.chainHoist}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Garage doors - chain hoist",
                                      item.chainHoist
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">Chain Hoist </label>
                            </div>
                            <div className={addLeadStyle.checkbox_box}>
                              <input
                                type="checkbox"
                                className={addLeadStyle.checkbox}
                                disabled={moduleType === "view"}
                                name="custom"
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "custom",
                                    e,
                                    item?.id,
                                    false,
                                    "garageDoors"
                                  )
                                }
                                checked={item.custom}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Garage doors - custom",
                                      item.custom
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">Custom</label>
                            </div>
                          </div>
                          <div className={ProfileStyle.form_floating}>
                            <textarea
                              id="notes"
                              name="notes"
                              disabled={moduleType === "view"}
                              onChange={(e) =>
                                handleChangeOptions(
                                  "notes",
                                  e,
                                  item?.id,
                                  false,
                                  "garageDoors"
                                )
                              }
                              value={item?.notes}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "Garage doors - notes",
                                    item.notes
                                  );
                                }
                              }}
                            />
                            <label htmlFor="notes">Notes</label>{" "}
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                        </Fragment>
                      );
                    })}
                  <div className={addLeadStyle.head_buttons}>
                    <AppButtons
                      buttonType="black"
                      buttonSvg="/svg/add.svg"
                      disabled={moduleType === "view"}
                      buttonSvgAlt="No_Add_Image"
                      buttonTitle="Add Another Door"
                      type="button"
                      onClick={() => handleAddAnotherOption("garageDoors")}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              eventKey="1"
              className={addLeadStyle.lead_accordian_item}
            >
              <Accordion.Header className={addLeadStyle.lead_accordian_header}>
                Walk in Door Options
              </Accordion.Header>
              <Accordion.Body
                className={addLeadStyle.lead_accordian_body}
                style={{
                  visibility: "visible",
                }}
              >
                <div className={addLeadStyle.repeat_div}>
                  {optionsArr?.garageWalkIns &&
                    optionsArr?.garageWalkIns?.length > 0 &&
                    optionsArr?.garageWalkIns?.map((item, index) => {
                      return (
                        <Fragment key={item?.id ?? index}>
                          <div
                            className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                          >
                            DOOR {item?.id}
                            {item?.id !== 1 && (
                              <button
                                type="button"
                                disabled={moduleType === "view"}
                                onClick={() =>
                                  deleteAnotherOption(item?.id, "garageWalkIns")
                                }
                              >
                                <Trash2 color="lightGray" />
                              </button>
                            )}
                          </div>
                          <div className={ProfileStyle.garage_box}>
                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              <SingleSelect
                                options={
                                  constantTypes?.garageDoorOptionsSideEnd
                                }
                                disabled={moduleType === "view"}
                                label={"Walk-in-Door"}
                                onSelectionChange={(e) =>
                                  handleChangeOptions(
                                    "walkInDoor",
                                    e,
                                    item?.id,
                                    false,
                                    "garageWalkIns"
                                  )
                                }
                                value={constantTypes?.garageDoorOptionsSideEnd?.find(
                                  (el) => el?.value === item?.walkInDoor
                                )}
                                crossButton={false}
                                moduleType={moduleType}
                                handleAddTimeline={handleAddTimeline}
                                labelKey={"Walk in Door - walkInDoor"}
                              />
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              {item?.custom ? (
                                <>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    name="size"
                                    onChange={(e) =>
                                      handleChangeOptions(
                                        "size",
                                        e,
                                        item?.id,
                                        true,
                                        "garageWalkIns"
                                      )
                                    }
                                    value={item?.size}
                                    onBlur={() => {
                                      if (moduleType) {
                                        handleAddTimeline(
                                          "Walk in Door - size",
                                          item?.size
                                        );
                                      }
                                    }}
                                    disabled={moduleType === "view"}
                                  />
                                  <label htmlFor="">Size</label>
                                  {moduleType == "view" && (
                                    <div className={ProfileStyle.beforeEdit}>
                                      <InputEditSvg />
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <SingleSelect
                                    options={
                                      constantTypes?.garageWalkInDoorOptionsSize
                                    }
                                    disabled={moduleType === "view"}
                                    label={"Size"}
                                    onSelectionChange={(e) =>
                                      handleChangeOptions(
                                        "size",
                                        e,
                                        item?.id,
                                        false,
                                        "garageWalkIns"
                                      )
                                    }
                                    value={constantTypes?.garageWalkInDoorOptionsSize?.find(
                                      (el) => el?.value === item?.size
                                    )}
                                    crossButton={false}
                                    moduleType={moduleType}
                                    handleAddTimeline={handleAddTimeline}
                                    labelKey={"Walk in Door - size"}
                                  />
                                  {moduleType == "view" && (
                                    <div className={ProfileStyle.beforeEdit}>
                                      <InputEditSvg />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>

                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              <select
                                name="color"
                                disabled={moduleType === "view"}
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "color",
                                    e,
                                    item?.id,
                                    false,
                                    "garageWalkIns"
                                  )
                                }
                                value={item.color}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Walk in Door - color",
                                      item?.color
                                    );
                                  }
                                }}
                              >
                                <option value="With Window">With Window</option>
                                <option value="Without Window">
                                  Without Window
                                </option>
                              </select>
                              <label htmlFor="last_name"> Color</label>
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div className={ProfileStyle.form_floating}>
                              <input
                                type="text"
                                placeholder="QTY"
                                disabled={moduleType === "view"}
                                name="qty"
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "qty",
                                    e,
                                    item?.id,
                                    false,
                                    "garageWalkIns"
                                  )
                                }
                                value={item.qty > 0 ? item.qty : ""}
                                onKeyPress={(e) => integerInput(e)}
                                maxLength={5}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Walk in Door - qty",
                                      item?.qty
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">QTY</label>
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={addLeadStyle.checkbox_lead}>
                            <div className={addLeadStyle.checkbox_box}>
                              <input
                                type="checkbox"
                                disabled={moduleType === "view"}
                                className={addLeadStyle.checkbox}
                                name="custom"
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "custom",
                                    e,
                                    item?.id,
                                    false,
                                    "garageWalkIns"
                                  )
                                }
                                checked={item.custom}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Walk in Door - custom",
                                      item?.custom
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">Custom</label>
                            </div>
                          </div>
                          <div className={ProfileStyle.form_floating}>
                            <textarea
                              id="notes"
                              disabled={moduleType === "view"}
                              name="notes"
                              onChange={(e) =>
                                handleChangeOptions(
                                  "notes",
                                  e,
                                  item?.id,
                                  false,
                                  "garageWalkIns"
                                )
                              }
                              value={item?.notes}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "Walk in Door - notes",
                                    item?.notes
                                  );
                                }
                              }}
                            />
                            <label htmlFor="notes">Notes</label>
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                        </Fragment>
                      );
                    })}
                  <div className={addLeadStyle.head_buttons}>
                    <AppButtons
                      buttonType="black"
                      buttonSvg="/svg/add.svg"
                      buttonSvgAlt="No_Add_Image"
                      buttonTitle="Add Another Door"
                      disabled={moduleType === "view"}
                      type="button"
                      onClick={() => handleAddAnotherOption("garageWalkIns")}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              eventKey="2"
              className={addLeadStyle.lead_accordian_item}
            >
              <Accordion.Header className={addLeadStyle.lead_accordian_header}>
                Window Options
              </Accordion.Header>
              <Accordion.Body
                className={addLeadStyle.lead_accordian_body}
                style={{
                  visibility: "visible",
                }}
              >
                <div className={addLeadStyle.repeat_div}>
                  {optionsArr?.garageWindowOption &&
                    optionsArr?.garageWindowOption?.length > 0 &&
                    optionsArr?.garageWindowOption?.map((item, index) => {
                      return (
                        <Fragment key={item?.id ?? index}>
                          <div
                            className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                          >
                            Window {item?.id}
                            {item?.id !== 1 && (
                              <button
                                type="button"
                                disabled={moduleType === "view"}
                                onClick={() =>
                                  deleteAnotherOption(
                                    item?.id,
                                    "garageWindowOption"
                                  )
                                }
                              >
                                <Trash2 color="lightGray" />
                              </button>
                            )}
                          </div>
                          <div className={ProfileStyle.garage_box}>
                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              <SingleSelect
                                options={
                                  constantTypes?.garageDoorOptionsSideEnd
                                }
                                label={"Window"}
                                disabled={moduleType === "view"}
                                onSelectionChange={(e) =>
                                  handleChangeOptions(
                                    "window",
                                    e,
                                    item?.id,
                                    false,
                                    "garageWindowOption"
                                  )
                                }
                                value={constantTypes?.garageDoorOptionsSideEnd?.find(
                                  (el) => el?.value === item?.window
                                )}
                                crossButton={false}
                                moduleType={moduleType}
                                handleAddTimeline={handleAddTimeline}
                                labelKey={"Window option - window"}
                              />
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div
                              className={`${ProfileStyle.form_floating} form_select`}
                            >
                              {item?.custom ? (
                                <>
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    name="size"
                                    onChange={(e) =>
                                      handleChangeOptions(
                                        "size",
                                        e,
                                        item?.id,
                                        true,
                                        "garageWindowOption"
                                      )
                                    }
                                    value={item?.size}
                                    onBlur={() => {
                                      if (moduleType) {
                                        handleAddTimeline(
                                          "Window option - size",
                                          item?.size
                                        );
                                      }
                                    }}
                                    disabled={moduleType === "view"}
                                  />
                                  <label htmlFor="">Size</label>
                                  {moduleType == "view" && (
                                    <div className={ProfileStyle.beforeEdit}>
                                      <InputEditSvg />
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <SingleSelect
                                    options={
                                      constantTypes?.garageWindowOptionsSize
                                    }
                                    disabled={moduleType === "view"}
                                    label={"Size"}
                                    onSelectionChange={(e) =>
                                      handleChangeOptions(
                                        "size",
                                        e,
                                        item?.id,
                                        false,
                                        "garageWindowOption"
                                      )
                                    }
                                    value={constantTypes?.garageWindowOptionsSize?.find(
                                      (el) => el?.value === item?.size
                                    )}
                                    crossButton={false}
                                    moduleType={moduleType}
                                    handleAddTimeline={handleAddTimeline}
                                    labelKey={"Window option - size"}
                                  />
                                  {moduleType == "view" && (
                                    <div className={ProfileStyle.beforeEdit}>
                                      <InputEditSvg />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>

                            <div className={ProfileStyle.form_floating}>
                              <input
                                type="text"
                                disabled={moduleType === "view"}
                                placeholder="QTY"
                                name="qty"
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "qty",
                                    e,
                                    item?.id,
                                    false,
                                    "garageWindowOption"
                                  )
                                }
                                value={item.qty > 0 ? item.qty : ""}
                                onKeyPress={(e) => integerInput(e)}
                                maxLength={5}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Window option - qty",
                                      item?.qty
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">QTY</label>{" "}
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={addLeadStyle.checkbox_lead}>
                            <div className={addLeadStyle.checkbox_box}>
                              <input
                                type="checkbox"
                                disabled={moduleType === "view"}
                                className={addLeadStyle.checkbox}
                                name="custom"
                                onChange={(e) =>
                                  handleChangeOptions(
                                    "custom",
                                    e,
                                    item?.id,
                                    false,
                                    "garageWindowOption"
                                  )
                                }
                                checked={item.custom}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "Window option - custom",
                                      item?.custom
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="">Custom</label>
                            </div>
                          </div>
                          <div className={ProfileStyle.form_floating}>
                            <textarea
                              id="notes"
                              name="notes"
                              disabled={moduleType === "view"}
                              onChange={(e) =>
                                handleChangeOptions(
                                  "notes",
                                  e,
                                  item?.id,
                                  false,
                                  "garageWindowOption"
                                )
                              }
                              value={item?.notes}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "Window option - notes",
                                    item?.notes
                                  );
                                }
                              }}
                            />
                            <label htmlFor="notes">Notes</label>{" "}
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                        </Fragment>
                      );
                    })}
                  <div className={addLeadStyle.head_buttons}>
                    <AppButtons
                      buttonType="black"
                      buttonSvg="/svg/add.svg"
                      buttonSvgAlt="No_Add_Image"
                      buttonTitle="Add Another Window"
                      disabled={moduleType === "view"}
                      type="button"
                      onClick={() =>
                        handleAddAnotherOption("garageWindowOption")
                      }
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      )}
    </Fragment>
  );
};

export default GarageAndCarportAccordion;
