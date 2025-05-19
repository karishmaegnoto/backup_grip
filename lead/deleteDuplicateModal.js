import React, { useContext, useEffect, useState } from "react";
import styles from "./lead-comp.module.scss";
import CustomModal from "../shared/modal/customizedModal";
import ModalButton from "../shared/buttons/modalButton";
import { X } from "lucide-react";
import checkStyles from "@/app/[slug]/leads/lead.module.scss";
import {
  deleteMultiLeadApi,
  getDuplicateLeadApi,
} from "@/hooks/ApisContainer/Lead";
import useToastContext from "@/hooks/useToastContext";
import SkeletonButton from "../shared/skeleton/buttonSkeleton";
import LeadContext from "@/hooks/context/LeadContext";
import { formatDate } from "@/helper/helper";

const DeleteDuplicateModal = ({ show, onHide, leadId, fetchLeadList }) => {
  const notification = useToastContext();
  let { leadStatusDetails, leadSourceDetails } = useContext(LeadContext);

  // ALL STATE
  const [leadList, setLeadList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const isAllSelected =
    leadList?.length > 0 && checkboxValue?.length === leadList?.length;

  useEffect(() => {
    if (leadId) {
      fetchMergeLeads(leadId);
    }
  }, []);

  const fetchMergeLeads = () => {
    getDuplicateLeadApi(leadId, notification, (loading, error, res) => {
      setLoader(loading);
      if (!error) {
        if (res) {
          setLeadList(res ? res : []);
        }
      }
    });
  };

  const getTitleByData = (id, data) => {
    const item = data?.find((el) => el?.id == id);
    return item ? item.title : "-";
  };

  const handleCheckboxChange = (id) => {
    setCheckboxValue((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setCheckboxValue([]);
    } else {
      setCheckboxValue(leadList?.map((lead) => lead._id));
    }
  };

  const handleMultiDelete = () => {
    const requestPayload = {
      leadIds: checkboxValue,
    };
    deleteMultiLeadApi(requestPayload, notification, (loading, error) => {
      setDeleteLoader(loading);
      if (!error) {
        setCheckboxValue([]);
        fetchLeadList();
        onHide();
      }
    });
  };

  return (
    <CustomModal
      showModal={show}
      handleClose={() => onHide()}
      size="xl"
      footer={true}
      header={true}
    >
      <div className={styles.leadmerge}>
        <div className={styles.leadmerge_head}>
          <div>
            <h2>Delete Duplicate Lead</h2>
            <p>Please select lead to move with Delete</p>
          </div>
          <div onClick={() => onHide()}>
            <X color="lightGray" className="cursor-pointer" />
          </div>
        </div>
        <div className={styles.leadmerge_table}>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className={
                      loader
                        ? `${checkStyles.checkbox} cursor-not-allowed`
                        : checkStyles.checkbox
                    }
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Lead Name</th>
                <th>Email</th>
                <th>Lead Status</th>
                <th>Source Form</th>
                <th>Created Date</th>
              </tr>
            </thead>

            <tbody>
              {loader ? (
                <>
                  {Array(10)
                    .fill("")
                    .map((_, ind) => {
                      return (
                        <tr key={ind}>
                          <td>
                            <SkeletonButton height={15} width={15} />
                          </td>
                          {Array(5)
                            .fill("")
                            .map((_, index) => {
                              return (
                                <td key={index}>
                                  <SkeletonButton
                                    height={10}
                                    width={index == 4 ? 170 : 100}
                                  />
                                </td>
                              );
                            })}
                        </tr>
                      );
                    })}
                </>
              ) : (
                <>
                  {leadList &&
                    leadList?.length > 0 &&
                    leadList?.map((item) => {
                      return (
                        <tr
                          key={item?._id}
                          className="cursor-pointer"
                          onClick={(e) => {
                            if (e.target.type !== "checkbox") {
                              handleCheckboxChange(item._id);
                            }
                          }}
                        >
                          <td>
                            <input
                              type="checkbox"
                              className={checkStyles.checkbox}
                              checked={checkboxValue.includes(item?._id)}
                              onChange={(e) => handleCheckboxChange(item?._id)}
                            />
                          </td>

                          <td>{`${item?.firstName} ${item?.lastName}`}</td>
                          <td>{item?.email}</td>
                          <td>
                            {item?.leadStatus &&
                              getTitleByData(
                                item?.leadStatus?._id
                                  ? item?.leadStatus?._id
                                  : item?.leadStatus,
                                leadStatusDetails
                              )}
                          </td>
                          <td>
                            {item?.leadSource &&
                              getTitleByData(
                                item?.leadSource?._id
                                  ? item?.leadSource?._id
                                  : item?.leadSource,
                                leadSourceDetails
                              )}
                          </td>
                          <td>
                            {item?.createdAt && formatDate(item?.createdAt)}
                          </td>
                        </tr>
                      );
                    })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.popup_btn}>
        <ModalButton
          buttonType="cancel"
          buttonTitle="Cancel"
          type="button"
          onClick={() => onHide()}
        />

        <ModalButton
          buttonType="submit"
          buttonTitle="Submit"
          type="button"
          onClick={() => handleMultiDelete()}
          loader={deleteLoader}
          disabled={deleteLoader}
          className={deleteLoader ? "pointer-not-allowed ml-2" : "ml-2"}
        />
      </div>
    </CustomModal>
  );
};

export default DeleteDuplicateModal;
