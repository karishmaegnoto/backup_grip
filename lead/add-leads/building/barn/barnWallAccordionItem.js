import React, { Fragment } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { MaxLength } from "@/utils/constants/CharactersLength";
import { removeMultiSpace } from "@/helper/helper";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const BarnWallAccordionItem = ({
  register,
  errors,
  optionsBarnArr,
  handleChangeBarnsOptions,
  moduleType,
  handleAddTimeline,
  watchedValues,
}) => {
  return (
    <Accordion.Item eventKey="0" className={addLeadStyle.lead_accordian_item}>
      <Accordion.Header className={addLeadStyle.lead_accordian_header}>
        Wall
      </Accordion.Header>
      <Accordion.Body className={addLeadStyle.lead_accordian_body}>
        <div className={addLeadStyle.repeat_div}>
          <div className={addLeadStyle.cmn_padding}>
            <div
              className={`${ProfileStyle.form_floating} ${addLeadStyle.barn_top_field}`}
            >
              <CustomizedFormFields
                type="text"
                name="biBarnWallSiding"
                placeholder="Enter wall siding."
                register={{
                  ...register("biBarnWallSiding", {
                    required: false,
                  }),
                }}
                inputType={"text"}
                onKeyPress={false}
                maxLength={MaxLength?.unKnownFields}
                errors={errors}
                className={ProfileStyle.form_control}
                floatingLabel="Wall Siding"
                onInput={removeMultiSpace}
                onBlur={() => {
                  if (moduleType) {
                    handleAddTimeline(
                      "Wall Siding",
                      watchedValues?.biBarnWallSiding
                    );
                    handelEditApi(watchedValues);
                  }
                }}
              />{" "}
              {moduleType == "view" && (
                <div className={ProfileStyle.beforeEdit}>
                  <InputEditSvg />
                </div>
              )}
            </div>
          </div>

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
              {optionsBarnArr?.wallCentralBuilding &&
                optionsBarnArr?.wallCentralBuilding?.length > 0 &&
                optionsBarnArr?.wallCentralBuilding?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div className={addLeadStyle.header_option}>
                        Central Building
                      </div>
                      <div className={ProfileStyle.barn_box}>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="frontEnd"
                            name="frontEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "frontEnd",
                                e,
                                item?.id,
                                false,
                                "wallCentralBuilding"
                              )
                            }
                            value={item?.frontEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - central building - front end",
                                  item?.frontEnd
                                );
                              }
                            }}
                          />
                          <label>Front End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="backEnd"
                            name="backEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "backEnd",
                                e,
                                item?.id,
                                false,
                                "wallCentralBuilding"
                              )
                            }
                            value={item?.backEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - central building - back end",
                                  item?.backEnd
                                );
                              }
                            }}
                          />
                          <label>Back End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="leftSide"
                            name="leftSide"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "leftSide",
                                e,
                                item?.id,
                                false,
                                "wallCentralBuilding"
                              )
                            }
                            value={item?.leftSide}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - central building - left side",
                                  item?.leftSide
                                );
                              }
                            }}
                          />
                          <label>Left Side</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="rightSide"
                            name="rightSide"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "rightSide",
                                e,
                                item?.id,
                                false,
                                "wallCentralBuilding"
                              )
                            }
                            value={item?.rightSide}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - central building - right side",
                                  item?.rightSide
                                );
                              }
                            }}
                          />
                          <label>Right Side</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
            </Tab>
            <Tab
              eventKey="profile"
              title="Left Lean-to"
              className={addLeadStyle.tab_barn_body}
            >
              {optionsBarnArr?.wallLeftLeanTo &&
                optionsBarnArr?.wallLeftLeanTo?.length > 0 &&
                optionsBarnArr?.wallLeftLeanTo?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div className={addLeadStyle.header_option}>
                        Left Lean-to
                      </div>
                      <div className={ProfileStyle.barn_box}>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="frontEnd"
                            name="frontEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "frontEnd",
                                e,
                                item?.id,
                                false,
                                "wallLeftLeanTo"
                              )
                            }
                            value={item?.frontEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - left lean-to - front end",
                                  item?.frontEnd
                                );
                              }
                            }}
                          />
                          <label>Front End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="backEnd"
                            name="backEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "backEnd",
                                e,
                                item?.id,
                                false,
                                "wallLeftLeanTo"
                              )
                            }
                            value={item?.backEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - left lean-to - back end",
                                  item?.backEnd
                                );
                              }
                            }}
                          />
                          <label>Back End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="leftSide"
                            name="leftSide"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "leftSide",
                                e,
                                item?.id,
                                false,
                                "wallLeftLeanTo"
                              )
                            }
                            value={item?.leftSide}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - left lean-to - left side",
                                  item?.leftSide
                                );
                              }
                            }}
                          />
                          <label>Left Side</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
            </Tab>
            <Tab
              eventKey="contact"
              title="Right Lean-to"
              className={addLeadStyle.tab_barn_body}
            >
              {optionsBarnArr?.wallRightLeanTo &&
                optionsBarnArr?.wallRightLeanTo?.length > 0 &&
                optionsBarnArr?.wallRightLeanTo?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div className={addLeadStyle.header_option}>
                        Right Lean-to
                      </div>
                      <div className={ProfileStyle.barn_box}>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="frontEnd"
                            name="frontEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "frontEnd",
                                e,
                                item?.id,
                                false,
                                "wallRightLeanTo"
                              )
                            }
                            value={item?.frontEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - Right lean-to - front end",
                                  item?.frontEnd
                                );
                              }
                            }}
                          />
                          <label>Front End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="backEnd"
                            name="backEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "backEnd",
                                e,
                                item?.id,
                                false,
                                "wallRightLeanTo"
                              )
                            }
                            value={item?.backEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - Right lean-to - back end",
                                  item?.backEnd
                                );
                              }
                            }}
                          />
                          <label>Back End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="rightSide"
                            name="rightSide"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "rightSide",
                                e,
                                item?.id,
                                false,
                                "wallRightLeanTo"
                              )
                            }
                            value={item?.rightSide}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - Right lean-to - right side",
                                  item?.rightSide
                                );
                              }
                            }}
                          />
                          <label>Right Side</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
            </Tab>
            <Tab
              eventKey="additional_Lean_to"
              title="Additional Lean-to"
              className={addLeadStyle.tab_barn_body}
            >
              {optionsBarnArr?.wallAdditionalLeanTo &&
                optionsBarnArr?.wallAdditionalLeanTo?.length > 0 &&
                optionsBarnArr?.wallAdditionalLeanTo?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div className={addLeadStyle.header_option}>
                        Additional Lean-to
                      </div>
                      <div className={ProfileStyle.barn_box}>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="frontEnd"
                            name="frontEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "frontEnd",
                                e,
                                item?.id,
                                false,
                                "wallAdditionalLeanTo"
                              )
                            }
                            value={item?.frontEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - additional lean-to - front end",
                                  item?.frontEnd
                                );
                              }
                            }}
                          />
                          <label>Front End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="backEnd"
                            name="backEnd"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "backEnd",
                                e,
                                item?.id,
                                false,
                                "wallAdditionalLeanTo"
                              )
                            }
                            value={item?.backEnd}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - additional lean-to - back end",
                                  item?.backEnd
                                );
                              }
                            }}
                          />
                          <label>Back End</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="leftSide"
                            name="leftSide"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "leftSide",
                                e,
                                item?.id,
                                false,
                                "wallAdditionalLeanTo"
                              )
                            }
                            value={item?.leftSide}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - additional lean-to - left side",
                                  item?.leftSide
                                );
                              }
                            }}
                          />
                          <label>Left Side</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                        <div className={ProfileStyle.form_floating}>
                          <input
                            type="text"
                            placeholder="rightSide"
                            name="rightSide"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "rightSide",
                                e,
                                item?.id,
                                false,
                                "wallAdditionalLeanTo"
                              )
                            }
                            value={item?.rightSide}
                            maxLength={MaxLength?.unKnownFields}
                            onInput={removeMultiSpace}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Wall - additional lean-to - right side",
                                  item?.rightSide
                                );
                              }
                            }}
                          />
                          <label>Right Side</label>{" "}
                          {moduleType == "view" && (
                            <div className={ProfileStyle.beforeEdit}>
                              <InputEditSvg />
                            </div>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
            </Tab>
          </Tabs>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default BarnWallAccordionItem;
