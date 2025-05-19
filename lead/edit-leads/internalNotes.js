import React, { forwardRef, useEffect, useState } from "react";
import styles from "@/app/[slug]/leads/edit-lead/[id]/editLead.module.scss";
import addLeadStyle from "@/app/[slug]/leads/add-lead/addLead.module.scss";
import UserRoundedSvg from "@/assets/svgs/userRoundedSvg";
import TimerSvg from "@/assets/svgs/timerSvg";
import InputEditSvg from "@/assets/svgs/inputEditSvg";
import InternalNotesCheck from "@/assets/svgs/internalNotesCheck";
import InternalNotesCrossSvg from "@/assets/svgs/internalNotesCrossSvg";
import Link from "next/link";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { formatDateOnWebSupport, whiteSpaceCheck } from "@/helper/helper";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import {
  addEditInternalNotes,
  getInternalNotesApi,
} from "@/hooks/ApisContainer/Lead";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import SkeletonButton from "@/components/shared/skeleton/buttonSkeleton";
import InternalNoteSvg from "@/assets/svgs/internalNoteSvg";
import InternalnotesRecentSvg from "@/assets/svgs/internalnotesRecentSvg";
import InternalNotesAllSvg from "@/assets/svgs/internalnotesAllSvg";
import { Dropdown } from "react-bootstrap";

const InternalNotes = forwardRef(
  (
    {
      activeInternalNotes,
      clearInternalNotes,
      errors,
      register,
      notification,
      leadId,
      internalNotes,
      setActiveInternalNotes,
      setValue,
      handelEditApi,
      watchedValues,
    },
    ref
  ) => {
    // ALL STATE
    const [visibleChangeButtons, setVisibleChangeButtons] = useState(false);
    const [internalNotesLoader, setInternalNotesLoader] = useState(false);
    const [getInternalNotesLoader, setGetInternalNotesLoader] = useState(false);
    const [internalNotesData, setInternalNotesData] = useState([]);
    const [internalNotesSortBy, setInternalNotesSortBy] = useState("desc");

    const handleFocus = () => {
      setVisibleChangeButtons(true);
    };

    const handleBlur = (e) => {
      if (e.relatedTarget && e.relatedTarget.closest(`.${styles.afterEdit}`)) {
        return;
      }
      setVisibleChangeButtons(false);
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
    };

    const handleSubmitInternalNotes = () => {
      const payloadData = {
        internalNotes: {
          message: internalNotes ?? "",
        },
        type: "add",
      };

      addEditInternalNotes(
        payloadData,
        leadId,
        notification,
        (loading, error) => {
          setInternalNotesLoader(loading);
          if (!error) {
            setValue("internalNotes", "");
            setVisibleChangeButtons(false);
            handelEditApi(watchedValues, "internal-Notes");
            setActiveInternalNotes(false);
            fetchInternalNotes();
          }
        }
      );
    };

    useEffect(() => {
      fetchInternalNotes();
    }, [internalNotesSortBy]);

    const fetchInternalNotes = (type) => {
      const requestPayload = { leadId: leadId, sortBy: internalNotesSortBy };
      getInternalNotesApi(
        requestPayload,
        notification,
        (loading, error, res) => {
          setGetInternalNotesLoader(loading);
          if (!error) {
            if (res) {
              setInternalNotesData(
                res?.internalNotes ? res?.internalNotes : []
              );
            }
          }
        }
      );
    };

    // className={styles.sorting}

    return (
      <div className={styles.notes_section}>
        <div className={addLeadStyle.lead_heading}>
          <h2>Internal Notes (Office use only)</h2>
          {!getInternalNotesLoader &&
            internalNotesData &&
            internalNotesData?.length > 0 && (
              <Dropdown>
                <Dropdown.Toggle
                  className={styles.sorting}
                  as="button"
                  bsPrefix="custom-dropdown-toggle"
                  type="button"
                >
                  <button
                    type="button"
                    className={`${styles.save_button} ${styles.save_internal_notes_button}`}
                  >
                    <span>
                      {internalNotesSortBy == "desc" ? "Recent" : "All"}
                    </span>
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles?.dropdown_custom}>
                  <Dropdown.Item className={styles?.dropdown_items}>
                    <button
                      className={styles.drop_btn_popup}
                      onClick={() => setInternalNotesSortBy("desc")}
                      type="button"
                    >
                      <InternalnotesRecentSvg />
                      Recent
                    </button>
                  </Dropdown.Item>

                  <Dropdown.Item className={styles?.dropdown_items}>
                    <button
                      type="button"
                      className={styles.drop_btn_popup}
                      onClick={() => setInternalNotesSortBy("asc")}
                    >
                      <InternalNotesAllSvg /> All
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
        </div>

        {getInternalNotesLoader ? (
          <>
            {Array(2)
              .fill("")
              .map((_, index) => {
                return (
                  <div className={styles.notes_block} key={index}>
                    <div className="mb-2">
                      <SkeletonButton height={10} width={100} percent={true} />
                    </div>
                    <div className="mb-2">
                      <SkeletonButton height={10} width={100} percent={true} />
                    </div>
                    <div className="mb-2">
                      <SkeletonButton height={10} width={100} percent={true} />
                    </div>
                    <div className={styles.notes_block_action}>
                      <ul>
                        <li>
                          <SkeletonButton height={20} width={20} />

                          <span>
                            <SkeletonButton height={20} width={20} />
                          </span>
                        </li>

                        <li>
                          <SkeletonButton height={20} width={20} />

                          <span>
                            <SkeletonButton height={20} width={300} />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {internalNotesData &&
              internalNotesData?.length > 0 &&
              internalNotesData?.map((data) => {
                return (
                  <div className={styles.notes_block} key={data?._id}>
                    <p>{data?.message ?? "-"}</p>
                    <div className={styles.notes_block_action}>
                      <ul>
                        {data?.sendedBy && (
                          <li>
                            <UserRoundedSvg />

                            <span>
                              By <Link href="">{data?.sendedBy}</Link>
                            </span>
                          </li>
                        )}
                        {data?.createdDate && (
                          <li>
                            <TimerSvg />

                            <span>
                              Edited on{" "}
                              {formatDateOnWebSupport(data?.createdDate)}{" "}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}
          </>
        )}
        <div className={styles.notes_section_new}>
          <div className={styles.form_floating}>
            <CustomizedFormFields
              type="text"
              name="internalNotes"
              id="internalNotes"
              placeholder="Enter your internal notes"
              register={{
                ...register("internalNotes", {
                  required: activeInternalNotes
                    ? ValidationMessage?.INTERNAL_NOTES_REQUIRED
                    : false,

                  validate: (value) => whiteSpaceCheck(value),
                }),
              }}
              errors={errors}
              floatingLabel="Internal Notes (Office use only) "
              className={
                internalNotesLoader
                  ? `pointer-not-allowed  ${ProfileStyle.form_control} ${styles.custom_in_height}`
                  : `${ProfileStyle.form_control} ${styles.custom_in_height}`
              }
              style={activeInternalNotes ? { border: "1px solid red" } : {}}
              ref={ref}
              onFocus={() => handleFocus()}
              onBlur={(e) => handleBlur(e)}
              maxLength={500}
              disabled={internalNotesLoader}
            />
            <div className={styles.beforeEdit}>
              <InputEditSvg />
            </div>
            {visibleChangeButtons && (
              <div
                className={styles.afterEdit}
                onMouseDown={(e) => handleMouseDown(e)}
              >
                <span
                  onClick={() => handleSubmitInternalNotes()}
                  className="pointer"
                >
                  <InternalNotesCheck />
                </span>
                <span onClick={() => clearInternalNotes()} className="pointer">
                  <InternalNotesCrossSvg />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

InternalNotes.displayName = "InternalNotes";

export default InternalNotes;
