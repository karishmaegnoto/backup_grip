import React, { Fragment } from "react";
import AppButtons from "@/components/shared/buttons/appButtons";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import { Trash2 } from "lucide-react";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import { constantTypes } from "@/utils/constants/constant";
import { integerInput } from "@/helper/helper";
import InputEditSvg from "@/assets/svgs/inputEditSvg";

const BarnCustomLeanTo = ({
  optionsBarnArr,
  setOptionsBarnArr,
  deleteAnotherBarnsOption,
  handleAddAnotherBarnsOption,
  handleChangeBarnsOptions,
  moduleType,
  handleAddTimeline,
}) => {
  return (
    <div className={addLeadStyle.barn_div_style}>
      {optionsBarnArr?.customLeanTo &&
        optionsBarnArr?.customLeanTo?.length > 0 &&
        optionsBarnArr?.customLeanTo.map((item) => {
          return (
            <Fragment key={item?.id}>
              <div
                className={`${addLeadStyle.header_option} flex w-full justify-between items-center`}
              >
                Custom Lean-to{" "}
                {item?.id !== 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      deleteAnotherBarnsOption(item?.id, "customLeanTo")
                    }
                  >
                    <Trash2 color="lightGray" />
                  </button>
                )}
              </div>
              <div className={addLeadStyle.barn_div_inner}>
                <div className={`${ProfileStyle.form_floating} form_select`}>
                  <SingleSelect
                    options={constantTypes?.barnCustomLeanToSideEnd}
                    label={"Side/End"}
                    onSelectionChange={(e) =>
                      handleChangeBarnsOptions(
                        "sideEnd",
                        e,
                        item?.id,
                        false,
                        "customLeanTo"
                      )
                    }
                    value={constantTypes?.barnCustomLeanToSideEnd?.find(
                      (el) => el?.value === item?.sideEnd
                    )}
                    crossButton={false}
                    moduleType={moduleType}
                    handleAddTimeline={handleAddTimeline}
                    labelKey={"Custom lean-to - side/end"}
                  />{" "}
                  {moduleType == "view" && (
                    <div className={ProfileStyle.beforeEdit}>
                      <InputEditSvg />
                    </div>
                  )}
                </div>
                <div className={ProfileStyle.form_floating}>
                  <input
                    type="text"
                    placeholder="width"
                    name="width"
                    onChange={(e) =>
                      handleChangeBarnsOptions(
                        "width",
                        e,
                        item?.id,
                        false,
                        "customLeanTo"
                      )
                    }
                    value={item.width > 0 ? item.width : ""}
                    onKeyPress={(e) => integerInput(e)}
                    maxLength={5}
                    onBlur={() => {
                      if (moduleType) {
                        handleAddTimeline("Custom lean-to - width", item.width);
                      }
                    }}
                  />
                  <label>Width</label>
                  {moduleType == "view" && (
                    <div className={ProfileStyle.beforeEdit}>
                      <InputEditSvg />
                    </div>
                  )}
                </div>
                <div className={ProfileStyle.form_floating}>
                  <input
                    type="text"
                    placeholder="length"
                    name="length"
                    onChange={(e) =>
                      handleChangeBarnsOptions(
                        "length",
                        e,
                        item?.id,
                        false,
                        "customLeanTo"
                      )
                    }
                    value={item.length > 0 ? item.length : ""}
                    onKeyPress={(e) => integerInput(e)}
                    maxLength={5}
                    onBlur={() => {
                      if (moduleType) {
                        handleAddTimeline(
                          "Custom lean-to - length",
                          item?.length
                        );
                      }
                    }}
                  />
                  <label>length</label>
                  {moduleType == "view" && (
                    <div className={ProfileStyle.beforeEdit}>
                      <InputEditSvg />
                    </div>
                  )}
                </div>
                <div className={ProfileStyle.form_floating}>
                  <input
                    type="text"
                    placeholder="height"
                    name="height"
                    onChange={(e) =>
                      handleChangeBarnsOptions(
                        "height",
                        e,
                        item?.id,
                        false,
                        "customLeanTo"
                      )
                    }
                    value={item.height > 0 ? item.height : ""}
                    onKeyPress={(e) => integerInput(e)}
                    maxLength={5}
                    onBlur={() => {
                      if (moduleType) {
                        handleAddTimeline(
                          "Custom lean-to - height",
                          item?.height
                        );
                      }
                    }}
                  />
                  <label>Height</label>
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
      <div className={addLeadStyle.head_buttons}>
        <AppButtons
          buttonType="black"
          buttonSvg="/svg/add.svg"
          buttonSvgAlt="No_Add_Image"
          buttonTitle="Add Custom Lean-to"
          type="button"
          onClick={() => handleAddAnotherBarnsOption("customLeanTo")}
        />
      </div>
    </div>
  );
};

export default BarnCustomLeanTo;
