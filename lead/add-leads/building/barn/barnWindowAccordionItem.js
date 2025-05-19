import React, { Fragment } from "react";
import { Accordion, Tabs, Tab } from "react-bootstrap";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import AppButtons from "@/components/shared/buttons/appButtons";
import { Trash2 } from "lucide-react";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import { constantTypes } from "@/utils/constants/constant";
import { integerInput, removeMultiSpace } from "@/helper/helper";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const BarnWindowAccordionItem = ({
  optionsBarnArr,
  deleteAnotherBarnsOption,
  handleChangeBarnsOptions,
  handleAddAnotherBarnsOption,
  moduleType,
  handleAddTimeline,
}) => {
  return (
    <Accordion.Item eventKey="3" className={addLeadStyle.lead_accordian_item}>
      <Accordion.Header className={addLeadStyle.lead_accordian_header}>
        Window Options
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
              {optionsBarnArr?.windowCentralBuilding &&
                optionsBarnArr?.windowCentralBuilding?.length > 0 &&
                optionsBarnArr?.windowCentralBuilding?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div
                        className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                      >
                        Window {item?.id}
                        {item?.id !== 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteAnotherBarnsOption(
                                item?.id,
                                "windowCentralBuilding"
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
                            label={"Window"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "window",
                                e,
                                item?.id,
                                false,
                                "windowCentralBuilding"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.window
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - Central building - window"}
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
                          <SingleSelect
                            options={constantTypes?.barnWindowCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "windowCentralBuilding"
                              )
                            }
                            value={constantTypes?.barnWindowCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - Central building - window"}
                          />
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
                            name="qty"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "qty",
                                e,
                                item?.id,
                                false,
                                "windowCentralBuilding"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Window - Central building - qty",
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
                              "windowCentralBuilding"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "Window - Central building - notes",
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
                    handleAddAnotherBarnsOption("windowCentralBuilding")
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
              {optionsBarnArr?.windowLeftLeanTo &&
                optionsBarnArr?.windowLeftLeanTo?.length > 0 &&
                optionsBarnArr?.windowLeftLeanTo?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div
                        className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                      >
                        Window {item?.id}
                        {item?.id !== 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteAnotherBarnsOption(
                                item?.id,
                                "windowLeftLeanTo"
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
                            label={"Window"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "window",
                                e,
                                item?.id,
                                false,
                                "windowLeftLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.window
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - left lean-to - window"}
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
                          <SingleSelect
                            options={constantTypes?.barnWindowCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "windowLeftLeanTo"
                              )
                            }
                            value={constantTypes?.barnWindowCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - left lean-to - size"}
                          />
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
                            name="qty"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "qty",
                                e,
                                item?.id,
                                false,
                                "windowLeftLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Window - left lean-to - qty",
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
                              "windowLeftLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "Window - left lean-to - notes",
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
                    handleAddAnotherBarnsOption("windowLeftLeanTo")
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
              {optionsBarnArr?.windowRightLeanTo &&
                optionsBarnArr?.windowRightLeanTo?.length > 0 &&
                optionsBarnArr?.windowRightLeanTo?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div
                        className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                      >
                        Window {item?.id}
                        {item?.id !== 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteAnotherBarnsOption(
                                item?.id,
                                "windowRightLeanTo"
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
                            label={"Window"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "window",
                                e,
                                item?.id,
                                false,
                                "windowRightLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.window
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - right lean-to - window"}
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
                          <SingleSelect
                            options={constantTypes?.barnWindowCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "windowRightLeanTo"
                              )
                            }
                            value={constantTypes?.barnWindowCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - right lean-to - size"}
                          />
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
                            name="qty"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "qty",
                                e,
                                item?.id,
                                false,
                                "windowRightLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Window - right lean-to - qty",
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
                              "windowRightLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "Window - right lean-to - note",
                                item?.note
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
                    handleAddAnotherBarnsOption("windowRightLeanTo")
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
              {optionsBarnArr?.windowAdditionalLeanTo &&
                optionsBarnArr?.windowAdditionalLeanTo?.length > 0 &&
                optionsBarnArr?.windowAdditionalLeanTo?.map((item) => {
                  return (
                    <Fragment key={item?.id}>
                      <div
                        className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
                      >
                        Window {item?.id}
                        {item?.id !== 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteAnotherBarnsOption(
                                item?.id,
                                "windowAdditionalLeanTo"
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
                            label={"Window"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "window",
                                e,
                                item?.id,
                                false,
                                "windowAdditionalLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.window
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - additional lean-to - window"}
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
                          <SingleSelect
                            options={constantTypes?.barnWindowCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "windowAdditionalLeanTo"
                              )
                            }
                            value={constantTypes?.barnWindowCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Window - additional lean-to - size"}
                          />
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
                            name="qty"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "qty",
                                e,
                                item?.id,
                                false,
                                "windowAdditionalLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "Window - additional lean-to - qty",
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
                              "windowAdditionalLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "Window - additional lean-to - notes",
                                item?.notes
                              );
                            }
                          }}
                        />
                        <label>Notes</label>{" "}
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
                    handleAddAnotherBarnsOption("windowAdditionalLeanTo")
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

export default BarnWindowAccordionItem;
