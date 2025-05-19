import React, { Fragment } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import { Accordion, Tabs, Tab } from "react-bootstrap";
import AppButtons from "@/components/shared/buttons/appButtons";
import { Trash2 } from "lucide-react";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import { constantTypes } from "@/utils/constants/constant";
import { integerInput, removeMultiSpace } from "@/helper/helper";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const BarnDoorOptionAccordionItem = ({
  optionsBarnArr,
  deleteAnotherBarnsOption,
  handleChangeBarnsOptions,
  handleAddAnotherBarnsOption,
  moduleType,
  handleAddTimeline,
}) => {
  return (
    <Accordion.Item eventKey="2" className={addLeadStyle.lead_accordian_item}>
      <Accordion.Header className={addLeadStyle.lead_accordian_header}>
        Barn Door Options
      </Accordion.Header>
      <Accordion.Body className={addLeadStyle.lead_accordian_body}>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          className={addLeadStyle.barns_tab}
        >
          <Tab
            eventKey="home"
            title="Central Building "
            className={addLeadStyle.tab_barn_body}
          >
            <div className={addLeadStyle.repeat_div}>
              {optionsBarnArr?.doorOptionCentralBuilding &&
                optionsBarnArr?.doorOptionCentralBuilding?.length > 0 &&
                optionsBarnArr?.doorOptionCentralBuilding?.map(
                  (item, index) => {
                    return (
                      <Fragment key={item?.id}>
                        <div
                          className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                        >
                          DOOR {item?.id}
                          {item?.id !== 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                deleteAnotherBarnsOption(
                                  item?.id,
                                  "doorOptionCentralBuilding"
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
                              options={constantTypes?.barnCustomLeanToSideEnd}
                              label={"Side/End"}
                              onSelectionChange={(e) =>
                                handleChangeBarnsOptions(
                                  "sideEnd",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionCentralBuilding"
                                )
                              }
                              value={constantTypes?.barnCustomLeanToSideEnd?.find(
                                (el) => el?.value === item?.sideEnd
                              )}
                              crossButton={false}
                              moduleType={moduleType}
                              handleAddTimeline={handleAddTimeline}
                              labelKey={
                                "barn door options - central building - side/end"
                              }
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
                                    handleChangeBarnsOptions(
                                      "size",
                                      e,
                                      item?.id,
                                      true,
                                      "doorOptionCentralBuilding"
                                    )
                                  }
                                  value={item?.size}
                                  onInput={removeMultiSpace}
                                  onBlur={() => {
                                    if (moduleType) {
                                      handleAddTimeline(
                                        "barn door options - central building - size",
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
                                    constantTypes?.barnDoorOptionsCentralSize
                                  }
                                  label={"Size"}
                                  onSelectionChange={(e) =>
                                    handleChangeBarnsOptions(
                                      "size",
                                      e,
                                      item?.id,
                                      false,
                                      "doorOptionCentralBuilding"
                                    )
                                  }
                                  value={constantTypes?.barnDoorOptionsCentralSize?.find(
                                    (el) => el?.value === item?.size
                                  )}
                                  crossButton={false}
                                  moduleType={moduleType}
                                  handleAddTimeline={handleAddTimeline}
                                  labelKey={
                                    "barn door options - central building - size"
                                  }
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
                              placeholder="QTY"
                              name="qty"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "qty",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionCentralBuilding"
                                )
                              }
                              value={item.qty > 0 ? item.qty : ""}
                              onKeyPress={(e) => integerInput(e)}
                              maxLength={5}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - central building - qty",
                                    item?.qty
                                  );
                                }
                              }}
                            />
                            <label>QTY</label>
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                          <div className={ProfileStyle.barn_box}>
                            <div className={ProfileStyle.form_floating}>
                              <input
                                type="text"
                                id=""
                                placeholder="Door Color"
                                name="doorColor"
                                onChange={(e) =>
                                  handleChangeBarnsOptions(
                                    "doorColor",
                                    e,
                                    item?.id,
                                    false,
                                    "doorOptionCentralBuilding"
                                  )
                                }
                                value={item.doorColor}
                                onInput={removeMultiSpace}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "barn door options - central building - door color",
                                      item?.doorColor
                                    );
                                  }
                                }}
                              />
                              <label>Door Color</label>
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div className={ProfileStyle.form_floating}>
                              <select
                                name="certification"
                                onChange={(e) =>
                                  handleChangeBarnsOptions(
                                    "certification",
                                    e,
                                    item?.id,
                                    false,
                                    "doorOptionCentralBuilding"
                                  )
                                }
                                value={item?.certification}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "barn door options - central building - certification",
                                      item?.certification
                                    );
                                  }
                                }}
                              >
                                <option value="">Select Certification </option>
                                <option value={true}>Certified </option>
                                <option value={false}>Not Certified</option>
                              </select>
                              <label>Certification</label>
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`${addLeadStyle.checkbox_lead} ${addLeadStyle.m_t_20}`}
                        >
                          <div className={addLeadStyle.checkbox_box}>
                            <input
                              type="checkbox"
                              className={addLeadStyle.checkbox}
                              name="dutch"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "dutch",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionCentralBuilding"
                                )
                              }
                              checked={item?.dutch}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - central building - dutch",
                                    item?.dutch
                                  );
                                }
                              }}
                            />
                            <label>Dutch </label>
                          </div>
                          <div className={addLeadStyle.checkbox_box}>
                            <input
                              type="checkbox"
                              className={addLeadStyle.checkbox}
                              name="chainHoist"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "chainHoist",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionCentralBuilding"
                                )
                              }
                              checked={item?.chainHoist}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - central building - chain hoist",
                                    item?.chainHoist
                                  );
                                }
                              }}
                            />
                            <label>Chain Hoist </label>
                          </div>
                          <div className={addLeadStyle.checkbox_box}>
                            <input
                              type="checkbox"
                              className={addLeadStyle.checkbox}
                              name="custom"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "custom",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionCentralBuilding"
                                )
                              }
                              checked={item?.custom}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - central building - custom",
                                    item?.custom
                                  );
                                }
                              }}
                            />
                            <label>Custom </label>
                          </div>
                        </div>
                        <div
                          className={`${ProfileStyle.form_floating} ${addLeadStyle.cmn_field_margin}`}
                        >
                          <textarea
                            id="notes"
                            name="notes"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "notes",
                                e,
                                item?.id,
                                false,
                                "doorOptionCentralBuilding"
                              )
                            }
                            value={item?.notes}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - central building - notes",
                                  item?.notes
                                );
                              }
                            }}
                          />
                          <label>Notes</label>
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                      </Fragment>
                    );
                  }
                )}
              <div className={addLeadStyle.head_buttons}>
                <AppButtons
                  buttonType="black"
                  buttonSvg="/svg/add.svg"
                  buttonSvgAlt="No_Add_Image"
                  buttonTitle="Add Another Door"
                  type="button"
                  onClick={() =>
                    handleAddAnotherBarnsOption("doorOptionCentralBuilding")
                  }
                />
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="profile"
            title="Left Lean-to "
            className={addLeadStyle.tab_barn_body}
          >
            <div className={addLeadStyle.repeat_div}>
              {optionsBarnArr?.doorOptionLeftLeanTo &&
                optionsBarnArr?.doorOptionLeftLeanTo?.length > 0 &&
                optionsBarnArr?.doorOptionLeftLeanTo?.map((item, index) => {
                  return (
                    <Fragment key={item?.id}>
                      <div
                        className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                      >
                        DOOR {item?.id}
                        {item?.id !== 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteAnotherBarnsOption(
                                item?.id,
                                "doorOptionLeftLeanTo"
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
                            options={constantTypes?.barnCustomLeanToSideEnd}
                            label={"Side/End"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "sideEnd",
                                e,
                                item?.id,
                                false,
                                "doorOptionLeftLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.sideEnd
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={
                              "barn door options - left lean-to - side/end"
                            }
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
                                  handleChangeBarnsOptions(
                                    "size",
                                    e,
                                    item?.id,
                                    true,
                                    "doorOptionLeftLeanTo"
                                  )
                                }
                                value={item?.size}
                                onInput={removeMultiSpace}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "barn door options - left lean-to - size",
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
                                  constantTypes?.barnDoorOptionsCentralSize
                                }
                                label={"Size"}
                                onSelectionChange={(e) =>
                                  handleChangeBarnsOptions(
                                    "size",
                                    e,
                                    item?.id,
                                    false,
                                    "doorOptionLeftLeanTo"
                                  )
                                }
                                value={constantTypes?.barnDoorOptionsCentralSize?.find(
                                  (el) => el?.value === item?.size
                                )}
                                crossButton={false}
                                moduleType={moduleType}
                                handleAddTimeline={handleAddTimeline}
                                labelKey={
                                  "barn door options - left lean-to - size"
                                }
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
                            placeholder="QTY"
                            name="qty"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "qty",
                                e,
                                item?.id,
                                false,
                                "doorOptionLeftLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - left lean-to - qty",
                                  item?.qty
                                );
                              }
                            }}
                          />
                          <label>QTY</label>
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.barn_box}>
                          <div className={ProfileStyle.form_floating}>
                            <input
                              type="text"
                              id=""
                              placeholder="Door Color"
                              name="doorColor"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "doorColor",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionLeftLeanTo"
                                )
                              }
                              value={item.doorColor}
                              onInput={removeMultiSpace}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - left lean-to - door color",
                                    item?.doorColor
                                  );
                                }
                              }}
                            />
                            <label>Door Color</label>
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                          <div className={ProfileStyle.form_floating}>
                            <select
                              name="certification"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "certification",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionLeftLeanTo"
                                )
                              }
                              value={item?.certification}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - left lean-to - certification",
                                    item?.certification
                                  );
                                }
                              }}
                            >
                              <option value="">Select Certification </option>
                              <option value={true}>Certified </option>
                              <option value={false}>Not Certified</option>
                            </select>
                            <label>Certification</label>
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${addLeadStyle.checkbox_lead} ${addLeadStyle.m_t_20}`}
                      >
                        <div className={addLeadStyle.checkbox_box}>
                          <input
                            type="checkbox"
                            className={addLeadStyle.checkbox}
                            name="dutch"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "dutch",
                                e,
                                item?.id,
                                false,
                                "doorOptionLeftLeanTo"
                              )
                            }
                            checked={item?.dutch}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - left lean-to - dutch",
                                  item?.dutch
                                );
                              }
                            }}
                          />
                          <label>Dutch </label>
                        </div>
                        <div className={addLeadStyle.checkbox_box}>
                          <input
                            type="checkbox"
                            className={addLeadStyle.checkbox}
                            name="chainHoist"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "chainHoist",
                                e,
                                item?.id,
                                false,
                                "doorOptionLeftLeanTo"
                              )
                            }
                            checked={item?.chainHoist}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - left lean-to - chain hoist",
                                  item?.chainHoist
                                );
                              }
                            }}
                          />
                          <label>Chain Hoist </label>
                        </div>
                        <div className={addLeadStyle.checkbox_box}>
                          <input
                            type="checkbox"
                            className={addLeadStyle.checkbox}
                            name="custom"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "custom",
                                e,
                                item?.id,
                                false,
                                "doorOptionLeftLeanTo"
                              )
                            }
                            checked={item?.custom}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - left lean-to - custom",
                                  item?.custom
                                );
                              }
                            }}
                          />
                          <label>Custom </label>
                        </div>
                      </div>
                      <div
                        className={`${ProfileStyle.form_floating} ${addLeadStyle.cmn_field_margin}`}
                      >
                        <textarea
                          id="notes"
                          name="notes"
                          onChange={(e) =>
                            handleChangeBarnsOptions(
                              "notes",
                              e,
                              item?.id,
                              false,
                              "doorOptionLeftLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "barn door options - left lean-to - notes",
                                item?.notes
                              );
                            }
                          }}
                        />
                        <label>Notes</label>
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
                  type="button"
                  onClick={() =>
                    handleAddAnotherBarnsOption("doorOptionLeftLeanTo")
                  }
                />
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="contact"
            title="Right Lean-to"
            className={addLeadStyle.tab_barn_body}
          >
            <div className={addLeadStyle.repeat_div}>
              {optionsBarnArr?.doorOptionRightLeanTo &&
                optionsBarnArr?.doorOptionRightLeanTo?.length > 0 &&
                optionsBarnArr?.doorOptionRightLeanTo?.map((item, index) => {
                  return (
                    <Fragment key={item?.id}>
                      <div
                        className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                      >
                        DOOR {item?.id}
                        {item?.id !== 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteAnotherBarnsOption(
                                item?.id,
                                "doorOptionRightLeanTo"
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
                            options={constantTypes?.barnCustomLeanToSideEnd}
                            label={"Side/End"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "sideEnd",
                                e,
                                item?.id,
                                false,
                                "doorOptionRightLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.sideEnd
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={
                              "barn door options - right lean-to - side/end"
                            }
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
                                  handleChangeBarnsOptions(
                                    "size",
                                    e,
                                    item?.id,
                                    true,
                                    "doorOptionRightLeanTo"
                                  )
                                }
                                value={item?.size}
                                onInput={removeMultiSpace}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "barn door options - right lean-to - size",
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
                                  constantTypes?.barnDoorOptionsCentralSize
                                }
                                label={"Size"}
                                onSelectionChange={(e) =>
                                  handleChangeBarnsOptions(
                                    "size",
                                    e,
                                    item?.id,
                                    false,
                                    "doorOptionRightLeanTo"
                                  )
                                }
                                value={constantTypes?.barnDoorOptionsCentralSize?.find(
                                  (el) => el?.value === item?.size
                                )}
                                crossButton={false}
                                moduleType={moduleType}
                                handleAddTimeline={handleAddTimeline}
                                labelKey={
                                  "barn door options - right lean-to - size"
                                }
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
                            placeholder="QTY"
                            name="qty"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "qty",
                                e,
                                item?.id,
                                false,
                                "doorOptionRightLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - right lean-to - qty",
                                  item?.qty
                                );
                              }
                            }}
                          />
                          <label>QTY</label>
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.barn_box}>
                          <div className={ProfileStyle.form_floating}>
                            <input
                              type="text"
                              id=""
                              placeholder="Door Color"
                              name="doorColor"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "doorColor",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionRightLeanTo"
                                )
                              }
                              value={item.doorColor}
                              onInput={removeMultiSpace}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - right lean-to - door color",
                                    item?.doorColor
                                  );
                                }
                              }}
                            />
                            <label>Door Color</label>
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                          <div className={ProfileStyle.form_floating}>
                            <select
                              name="certification"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "certification",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionRightLeanTo"
                                )
                              }
                              value={item?.certification}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - right lean-to - certification",
                                    item?.certification
                                  );
                                }
                              }}
                            >
                              <option value="">Select Certification </option>
                              <option value={true}>Certified </option>
                              <option value={false}>Not Certified</option>
                            </select>
                            <label>Certification</label>
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${addLeadStyle.checkbox_lead} ${addLeadStyle.m_t_20}`}
                      >
                        <div className={addLeadStyle.checkbox_box}>
                          <input
                            type="checkbox"
                            className={addLeadStyle.checkbox}
                            name="dutch"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "dutch",
                                e,
                                item?.id,
                                false,
                                "doorOptionRightLeanTo"
                              )
                            }
                            checked={item?.dutch}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - right lean-to - dutch",
                                  item?.dutch
                                );
                              }
                            }}
                          />
                          <label>Dutch </label>
                        </div>
                        <div className={addLeadStyle.checkbox_box}>
                          <input
                            type="checkbox"
                            className={addLeadStyle.checkbox}
                            name="chainHoist"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "chainHoist",
                                e,
                                item?.id,
                                false,
                                "doorOptionRightLeanTo"
                              )
                            }
                            checked={item?.chainHoist}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - right lean-to - chain hoist",
                                  item?.chainHoist
                                );
                              }
                            }}
                          />
                          <label>Chain Hoist </label>
                        </div>
                        <div className={addLeadStyle.checkbox_box}>
                          <input
                            type="checkbox"
                            className={addLeadStyle.checkbox}
                            name="custom"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "custom",
                                e,
                                item?.id,
                                false,
                                "doorOptionRightLeanTo"
                              )
                            }
                            checked={item?.custom}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - right lean-to - custom",
                                  item?.custom
                                );
                              }
                            }}
                          />
                          <label>Custom </label>
                        </div>
                      </div>
                      <div
                        className={`${ProfileStyle.form_floating} ${addLeadStyle.cmn_field_margin}`}
                      >
                        <textarea
                          id="notes"
                          name="notes"
                          onChange={(e) =>
                            handleChangeBarnsOptions(
                              "notes",
                              e,
                              item?.id,
                              false,
                              "doorOptionRightLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "barn door options - right lean-to - notes",
                                item?.notes
                              );
                            }
                          }}
                        />
                        <label>Notes</label>
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
                  type="button"
                  onClick={() =>
                    handleAddAnotherBarnsOption("doorOptionRightLeanTo")
                  }
                />
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="additional_Lean_to"
            title="Additional Lean-to"
            className={addLeadStyle.tab_barn_body}
          >
            <div className={addLeadStyle.repeat_div}>
              {optionsBarnArr?.doorOptionAdditionalLeanTo &&
                optionsBarnArr?.doorOptionAdditionalLeanTo?.length > 0 &&
                optionsBarnArr?.doorOptionAdditionalLeanTo?.map(
                  (item, index) => {
                    return (
                      <Fragment key={item?.id}>
                        <div
                          className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                        >
                          DOOR {item?.id}
                          {item?.id !== 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                deleteAnotherBarnsOption(
                                  item?.id,
                                  "doorOptionAdditionalLeanTo"
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
                              options={constantTypes?.barnCustomLeanToSideEnd}
                              label={"Side/End"}
                              onSelectionChange={(e) =>
                                handleChangeBarnsOptions(
                                  "sideEnd",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionAdditionalLeanTo"
                                )
                              }
                              value={constantTypes?.barnCustomLeanToSideEnd?.find(
                                (el) => el?.value === item?.sideEnd
                              )}
                              crossButton={false}
                              moduleType={moduleType}
                              handleAddTimeline={handleAddTimeline}
                              labelKey={
                                "barn door options - additional lean-to - side/end"
                              }
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
                                    handleChangeBarnsOptions(
                                      "size",
                                      e,
                                      item?.id,
                                      true,
                                      "doorOptionAdditionalLeanTo"
                                    )
                                  }
                                  value={item?.size}
                                  onInput={removeMultiSpace}
                                  onBlur={() => {
                                    if (moduleType) {
                                      handleAddTimeline(
                                        "barn door options - additional lean-to - size",
                                        item?.size
                                      );
                                    }
                                  }}
                                />
                                <label htmlFor="">Size</label>{" "}
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
                                    constantTypes?.barnDoorOptionsCentralSize
                                  }
                                  label={"Size"}
                                  onSelectionChange={(e) =>
                                    handleChangeBarnsOptions(
                                      "size",
                                      e,
                                      item?.id,
                                      false,
                                      "doorOptionAdditionalLeanTo"
                                    )
                                  }
                                  value={constantTypes?.barnDoorOptionsCentralSize?.find(
                                    (el) => el?.value === item?.size
                                  )}
                                  crossButton={false}
                                  moduleType={moduleType}
                                  handleAddTimeline={handleAddTimeline}
                                  labelKey={
                                    "barn door options - additional lean-to - size"
                                  }
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
                              placeholder="QTY"
                              name="qty"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "qty",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionAdditionalLeanTo"
                                )
                              }
                              value={item.qty > 0 ? item.qty : ""}
                              onKeyPress={(e) => integerInput(e)}
                              maxLength={5}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - additional lean-to - qty",
                                    item?.qty
                                  );
                                }
                              }}
                            />
                            <label>QTY</label>
                            {moduleType == "view" && (
                              <div className={ProfileStyle.beforeEdit}>
                                <InputEditSvg />
                              </div>
                            )}
                          </div>
                          <div className={ProfileStyle.barn_box}>
                            <div className={ProfileStyle.form_floating}>
                              <input
                                type="text"
                                id=""
                                placeholder="Door Color"
                                name="doorColor"
                                onChange={(e) =>
                                  handleChangeBarnsOptions(
                                    "doorColor",
                                    e,
                                    item?.id,
                                    false,
                                    "doorOptionAdditionalLeanTo"
                                  )
                                }
                                value={item.doorColor}
                                onInput={removeMultiSpace}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "barn door options - additional lean-to - door color",
                                      item?.doorColor
                                    );
                                  }
                                }}
                              />
                              <label>Door Color</label>
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                            <div className={ProfileStyle.form_floating}>
                              <select
                                name="certification"
                                onChange={(e) =>
                                  handleChangeBarnsOptions(
                                    "certification",
                                    e,
                                    item?.id,
                                    false,
                                    "doorOptionAdditionalLeanTo"
                                  )
                                }
                                value={item?.certification}
                                onBlur={() => {
                                  if (moduleType) {
                                    handleAddTimeline(
                                      "barn door options - additional lean-to - certification",
                                      item?.certification
                                    );
                                  }
                                }}
                              >
                                <option value="">Select Certification </option>
                                <option value={true}>Certified </option>
                                <option value={false}>Not Certified</option>
                              </select>
                              <label>Certification</label>
                              {moduleType == "view" && (
                                <div className={ProfileStyle.beforeEdit}>
                                  <InputEditSvg />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`${addLeadStyle.checkbox_lead} ${addLeadStyle.m_t_20}`}
                        >
                          <div className={addLeadStyle.checkbox_box}>
                            <input
                              type="checkbox"
                              className={addLeadStyle.checkbox}
                              name="dutch"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "dutch",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionAdditionalLeanTo"
                                )
                              }
                              checked={item?.dutch}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - additional lean-to - dutch",
                                    item?.dutch
                                  );
                                }
                              }}
                            />
                            <label>Dutch </label>
                          </div>
                          <div className={addLeadStyle.checkbox_box}>
                            <input
                              type="checkbox"
                              className={addLeadStyle.checkbox}
                              name="chainHoist"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "chainHoist",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionAdditionalLeanTo"
                                )
                              }
                              checked={item?.chainHoist}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - additional lean-to - chain hoist",
                                    item?.chainHoist
                                  );
                                }
                              }}
                            />
                            <label>Chain Hoist </label>
                          </div>
                          <div className={addLeadStyle.checkbox_box}>
                            <input
                              type="checkbox"
                              className={addLeadStyle.checkbox}
                              name="custom"
                              onChange={(e) =>
                                handleChangeBarnsOptions(
                                  "custom",
                                  e,
                                  item?.id,
                                  false,
                                  "doorOptionAdditionalLeanTo"
                                )
                              }
                              checked={item?.custom}
                              onBlur={() => {
                                if (moduleType) {
                                  handleAddTimeline(
                                    "barn door options - additional lean-to - custom",
                                    item?.custom
                                  );
                                }
                              }}
                            />
                            <label>Custom </label>
                          </div>
                        </div>
                        <div
                          className={`${ProfileStyle.form_floating} ${addLeadStyle.cmn_field_margin}`}
                        >
                          <textarea
                            id="notes"
                            name="notes"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "notes",
                                e,
                                item?.id,
                                false,
                                "doorOptionAdditionalLeanTo"
                              )
                            }
                            value={item?.notes}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "barn door options - additional lean-to - notes",
                                  item?.notes
                                );
                              }
                            }}
                          />
                          <label>Notes</label>
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                      </Fragment>
                    );
                  }
                )}
              <div className={addLeadStyle.head_buttons}>
                <AppButtons
                  buttonType="black"
                  buttonSvg="/svg/add.svg"
                  buttonSvgAlt="No_Add_Image"
                  buttonTitle="Add Another Door"
                  type="button"
                  onClick={() =>
                    handleAddAnotherBarnsOption("doorOptionAdditionalLeanTo")
                  }
                />
              </div>
            </div>
          </Tab>
        </Tabs>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default BarnDoorOptionAccordionItem;
