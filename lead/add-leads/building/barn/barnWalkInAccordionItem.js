import AppButtons from "@/components/shared/buttons/appButtons";
import React, { Fragment } from "react";
import { Accordion, Tabs, Tab } from "react-bootstrap";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import { Trash2 } from "lucide-react";
import { constantTypes } from "@/utils/constants/constant";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import { integerInput, removeMultiSpace } from "@/helper/helper";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const BarnWalkInAccordionItem = ({
  optionsBarnArr,
  deleteAnotherBarnsOption,
  handleChangeBarnsOptions,
  handleAddAnotherBarnsOption,
  moduleType,
  handleAddTimeline,
}) => {
  return (
    <Accordion.Item eventKey="1" className={addLeadStyle.lead_accordian_item}>
      <Accordion.Header className={addLeadStyle.lead_accordian_header}>
        Walk in Door Options
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
              {optionsBarnArr?.walkInOptionCentralBuilding &&
                optionsBarnArr?.walkInOptionCentralBuilding?.length > 0 &&
                optionsBarnArr?.walkInOptionCentralBuilding?.map((item) => {
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
                                "walkInOptionCentralBuilding"
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
                            label={"Walk-in-Door"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "walkInDoor",
                                e,
                                item?.id,
                                false,
                                "walkInOptionCentralBuilding"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.walkInDoor
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={
                              "walk in option - Central building - walk in door"
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
                          <SingleSelect
                            options={constantTypes?.barnWalkInCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "walkInOptionCentralBuilding"
                              )
                            }
                            value={constantTypes?.barnWalkInCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"Walk in door - size"}
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
                          <select
                            name="color"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "color",
                                e,
                                item?.id,
                                false,
                                "walkInOptionCentralBuilding"
                              )
                            }
                            value={item?.color}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - Central building - color",
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
                          <label> Color</label>
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
                                "walkInOptionCentralBuilding"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - Central building - qty",
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
                              "walkInOptionCentralBuilding"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "walk in option - Central building - notes",
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
                    handleAddAnotherBarnsOption("walkInOptionCentralBuilding")
                  }
                />
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="profile"
            title="Left Lean-to"
            className={addLeadStyle.tab_barn_body}
          >
            <div className={addLeadStyle.repeat_div}>
              {optionsBarnArr?.walkInOptionLeftLeanTo &&
                optionsBarnArr?.walkInOptionLeftLeanTo?.length > 0 &&
                optionsBarnArr?.walkInOptionLeftLeanTo?.map((item) => {
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
                                "walkInOptionLeftLeanTo"
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
                            label={"Walk-in-Door"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "walkInDoor",
                                e,
                                item?.id,
                                false,
                                "walkInOptionLeftLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.walkInDoor
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={
                              "walk in option - left lean-to - walk in door"
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
                          <SingleSelect
                            options={constantTypes?.barnWalkInCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "walkInOptionLeftLeanTo"
                              )
                            }
                            value={constantTypes?.barnWalkInCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"walk in option - left lean-to - size"}
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
                          <select
                            name="color"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "color",
                                e,
                                item?.id,
                                false,
                                "walkInOptionLeftLeanTo"
                              )
                            }
                            value={item.color}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - left lean-to - color",
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
                          <label> Color</label>
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
                                "walkInOptionLeftLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - left lean-to - qty",
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
                              "walkInOptionLeftLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "walk in option - left lean-to - notes",
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
                    handleAddAnotherBarnsOption("walkInOptionLeftLeanTo")
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
              {optionsBarnArr?.walkInOptionRightLeanTo &&
                optionsBarnArr?.walkInOptionRightLeanTo?.length > 0 &&
                optionsBarnArr?.walkInOptionRightLeanTo?.map((item) => {
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
                                "walkInOptionRightLeanTo"
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
                            label={"Walk-in-Door"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "walkInDoor",
                                e,
                                item?.id,
                                false,
                                "walkInOptionRightLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.walkInDoor
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={
                              "walk in option - right lean-to - walk in door"
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
                          <SingleSelect
                            options={constantTypes?.barnWalkInCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "walkInOptionRightLeanTo"
                              )
                            }
                            value={constantTypes?.barnWalkInCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={"walk in option - right lean-to - size"}
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
                          <select
                            name="color"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "color",
                                e,
                                item?.id,
                                false,
                                "walkInOptionRightLeanTo"
                              )
                            }
                            value={item.color}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - left lean-to - color",
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
                          <label> Color</label>
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
                                "walkInOptionRightLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - left lean-to - qty",
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
                              "walkInOptionRightLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "walk in option - left lean-to - notes",
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
                    handleAddAnotherBarnsOption("walkInOptionRightLeanTo")
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
              {optionsBarnArr?.walkInOptionAdditionalLeanTo &&
                optionsBarnArr?.walkInOptionAdditionalLeanTo?.length > 0 &&
                optionsBarnArr?.walkInOptionAdditionalLeanTo?.map((item) => {
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
                                "walkInOptionAdditionalLeanTo"
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
                            label={"Walk-in-Door"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "walkInDoor",
                                e,
                                item?.id,
                                false,
                                "walkInOptionAdditionalLeanTo"
                              )
                            }
                            value={constantTypes?.barnCustomLeanToSideEnd?.find(
                              (el) => el?.value === item?.walkInDoor
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={
                              "walk in option - Additional lean-to - walk in door"
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
                          <SingleSelect
                            options={constantTypes?.barnWalkInCentralSize}
                            label={"Size"}
                            onSelectionChange={(e) =>
                              handleChangeBarnsOptions(
                                "size",
                                e,
                                item?.id,
                                false,
                                "walkInOptionAdditionalLeanTo"
                              )
                            }
                            value={constantTypes?.barnWalkInCentralSize?.find(
                              (el) => el?.value === item?.size
                            )}
                            crossButton={false}
                            moduleType={moduleType}
                            handleAddTimeline={handleAddTimeline}
                            labelKey={
                              "walk in option - Additional lean-to - size"
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
                          <select
                            name="color"
                            onChange={(e) =>
                              handleChangeBarnsOptions(
                                "color",
                                e,
                                item?.id,
                                false,
                                "walkInOptionAdditionalLeanTo"
                              )
                            }
                            value={item.color}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - Additional lean-to - color",
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
                          <label> Color</label>
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
                                "walkInOptionAdditionalLeanTo"
                              )
                            }
                            value={item.qty > 0 ? item.qty : ""}
                            onKeyPress={(e) => integerInput(e)}
                            maxLength={5}
                            onBlur={() => {
                              if (moduleType) {
                                handleAddTimeline(
                                  "walk in option - Additional lean-to - qty",
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
                              "walkInOptionAdditionalLeanTo"
                            )
                          }
                          value={item?.notes}
                          onInput={removeMultiSpace}
                          onBlur={() => {
                            if (moduleType) {
                              handleAddTimeline(
                                "walk in option - Additional lean-to - notes",
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
                    handleAddAnotherBarnsOption("walkInOptionAdditionalLeanTo")
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

export default BarnWalkInAccordionItem;
