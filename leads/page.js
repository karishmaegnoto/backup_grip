"use client";
/*eslint-disable @next/next/no-img-element*/
import React, { useContext, useEffect, useState } from "react";
import devStyle from "@/styles/devStyle.module.scss";
import { MoreVertical, X } from "lucide-react";
import styles from "./lead.module.scss";
import ListFilter from "@/components/lead/listFilter";
import AppButtons from "@/components/shared/buttons/appButtons";
import FilterSvg from "@/assets/svgs/filterSvg";
import Pagination from "@/components/shared/pagination/page";
import {
  deleteLeadApi,
  deleteMultiLeadApi,
  getLeadAllListApi,
  getLeadApi,
} from "@/hooks/ApisContainer/Lead";
import useToastContext from "@/hooks/useToastContext";
import { formatDate } from "@/helper/helper";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import NoDataFound from "@/components/shared/Loader/NoDataAnimation";
import TooltipFixed from "@/components/shared/tooltip/tooltip-fixed";
import { useRouter } from "next/navigation";
import AuthContext from "@/hooks/context/AuthContext";
import LeadContext from "@/hooks/context/LeadContext";
import { Dropdown } from "react-bootstrap";
import DeleteLead from "@/components/lead/delete-leads/page";
import MassTransfer from "@/assets/svgs/massTransfer";
import SharedLead from "@/components/lead/share-lead/page";
import MassTransferComp from "@/components/lead/share-lead/massTransfer";
import Tooltip from "@/components/shared/tooltip/page";
import SkeletonButton from "@/components/shared/skeleton/buttonSkeleton";
import DeleteDuplicateModal from "@/components/lead/deleteDuplicateModal";

const LeadPage = () => {
  const notification = useToastContext();
  const router = useRouter();
  let {
    organizationName,
    user,
    fetchUserPermission,
    permissions,
    permissionLoader,
  } = useContext(AuthContext);
  let { leadAllList } = useContext(LeadContext);

  // ALL STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [leadList, setLeadList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isFiltered, setIsFiltered] = useState({});
  const [preventFilterData, setPreventFilterData] = useState({});
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState("");
  const [activeDeleteLead, setActiveDeleteLead] = useState({});
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [visibleNoData, setVisibleNoData] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [visibleMultiDropDown, setVisibleMultiDropDown] = useState(false);
  const [showMultiDeleteModal, setShowMultiDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeShareLead, setActiveShareLead] = useState({});
  const [showShareAllLead, setShowShareAllLead] = useState(false);
  const [showMassTransferLead, setShowMassTransferLead] = useState(false);
  const [sortData, setSortData] = useState(false);
  const [visibleDeleteDuplicateModal, setVisibleDeleteDuplicateModal] =
    useState(false);
  const [activeDeleteDuplicateId, setActiveDeleteDuplicateId] = useState("");

  const isAllSelected =
    leadList?.length > 0 && checkboxValue?.length === leadList?.length;

  const toggleFilter = () => {
    setVisibleFilter(!visibleFilter);
  };
  //

  useEffect(() => {
    if (user?.role && user?.role !== "superAdmin") {
      fetchUserPermission(user.role, "leads");
      handelRemoveTimeLine();
    }
  }, [user.role]);

  const handelRemoveTimeLine = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("timeline-active-page");
    }
  };

  useEffect(() => {
    leadAllList(notification);
  }, []);

  useEffect(() => {
    if (currentPage && rowsPerPage) {
      fetchLeadList();
    }
  }, [currentPage, rowsPerPage]);

  const fetchLeadList = (data, sortBy, sortType) => {
    setIsFiltered({ ...data });
    const requestPayload = {
      page: currentPage,
      pageSize: rowsPerPage,
      // sortBy: sortBy ? sortBy : "firstName",
      // sortType: sortType ? sortType : "desc",
      ...data,
    };

    getLeadApi(requestPayload, notification, (loading, error, res) => {
      setLoader(loading);
      if (!error) {
        setLeadList(res?.docs ? res?.docs : []);
        setVisibleNoData(true);
        setTotalPages(res?.totalDocs);
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCheckboxValue([]);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
    setCheckboxValue([]);
  };

  const getKeysAsString = (obj) => {
    return Object?.keys(obj)?.join(", ");
  };

  const navigateToAddScreen = () => {
    router.push(`/${organizationName}/leads/add-lead`, undefined, {
      shallow: true,
    });
  };

  const toggleVisibleDeleteModal = (data) => {
    setActiveDeleteLead(data);
    setVisibleDeleteModal(!visibleDeleteModal);
  };

  const toggleDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex("");
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const handleDeleteSingleLead = () => {
    const id = activeDeleteLead?._id;
    deleteLeadApi(id, notification, (loading, error) => {
      setDeleteLoader(loading);
      if (!error) {
        fetchLeadList();
        setVisibleDeleteModal(false);
      }
    });
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

  const toggleMultiDelete = () => {
    if (checkboxValue?.length > 0) {
      setShowMultiDeleteModal(!showMultiDeleteModal);
    } else {
      notification.warning(
        "Please select at least one checkbox for the lead you want to process."
      );
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
        setShowMultiDeleteModal(false);
      }
    });
  };

  const toggleShareOption = (data) => {
    setActiveShareLead(data);
    setShowShareModal(!showShareModal);
  };

  const toggleShareAllLead = () => {
    setShowShareAllLead(!showShareAllLead);
  };

  const toggleMassTransferAllLeads = () => {
    if (checkboxValue?.length > 0) {
      setShowMassTransferLead(!showMassTransferLead);
    } else {
      notification.warning(
        "Please select at least one checkbox for the lead you want to process."
      );
    }
  };

  const handleClickOnEdit = (item) => {
    router.push(
      `/${organizationName}/leads/edit-lead/${item?._id}`,
      undefined,
      { shallow: true }
    );
  };

  const handleClickOnView = (item) => {
    router.push(
      `/${organizationName}/leads/view-lead/${item?._id}`,
      undefined,
      { shallow: true }
    );
  };

  const shareWithList = (data) => {
    if (data?.length > 0) {
      const uniqueNames = [...new Set(data?.map((person) => person.name))];
      const commaSeparatedNames = uniqueNames.join(", ");
      return commaSeparatedNames;
    }
  };

  const toggleDeleteDuplicateModal = (data) => {
    setActiveDeleteDuplicateId(data);
    setVisibleDeleteDuplicateModal(!visibleDeleteDuplicateModal);
  };

  return (
    <div className={styles.lead_main_div}>
      <div className={styles.lead_container}>
        {visibleFilter && (
          <div className={styles.lead_navigation}>
            <ListFilter
              fetchLeadList={fetchLeadList}
              setVisibleFilter={setVisibleFilter}
              setPreventFilterData={setPreventFilterData}
              preventFilterData={preventFilterData}
            />
          </div>
        )}

        <div className={styles.permission_field}>
          <div className={styles?.container_main}>
            <div className={styles.container}>
              <div className={styles.header}>
                <div className={styles.rightHeader}>
                  {leadList?.length > 0 && (
                    <div className="flex justify-center items-center">
                      {!visibleFilter ? (
                        <TooltipFixed
                          content={
                            Object?.keys(isFiltered)?.length > 0 &&
                            getKeysAsString(isFiltered)
                          }
                          position="bottom"
                        >
                          <button
                            className="pointer flex close_filter"
                            onClick={() => toggleFilter()}
                          >
                            <FilterSvg
                              fillColor={
                                Object?.keys(isFiltered)?.length > 0
                                  ? "#fff"
                                  : ""
                              }
                            />
                            <b
                              className="mr-2 ml-2"
                              style={
                                Object?.keys(isFiltered)?.length > 0
                                  ? { color: "#ffffff" }
                                  : {}
                              }
                            >
                              Filter By
                            </b>
                          </button>
                        </TooltipFixed>
                      ) : (
                        <button
                          className="mr-2 ml-2 pointer close_filter"
                          onClick={() => toggleFilter()}
                        >
                          <span className="flex close_filter">
                            <X /> <b>Close Filter</b>
                          </span>
                        </button>
                      )}
                      {leadList?.length > 0 && (
                        <span className={styles.leadCount}>
                          ({leadList?.length} Leads)
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className={styles?.head_buttons}>
                  {permissionLoader ? (
                    <SkeletonButton />
                  ) : (
                    <>
                      {permissions?.add && (
                        <AppButtons
                          buttonType="black"
                          buttonSvg="/svg/add.svg"
                          buttonSvgAlt="No_Add_Image"
                          buttonTitle="Add New Lead"
                          type="button"
                          className="ml-2"
                          onClick={() => navigateToAddScreen()}
                        />
                      )}
                    </>
                  )}
                  {!permissionLoader && leadList?.length > 0 ? (
                    <Dropdown
                      show={visibleMultiDropDown}
                      onToggle={() => {
                        if (leadList?.length > 0) {
                          setVisibleMultiDropDown(!visibleMultiDropDown);
                        }
                      }}
                      className={`${styles?.head_buttons}`}
                    >
                      <Dropdown.Toggle
                        className={`${styles.actionButton}`}
                        as="button"
                        bsPrefix="custom-dropdown-toggle"
                      >
                        <div className={styles.moreButton}>
                          <MoreVertical size={20} />
                        </div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={styles?.dropdown_custom}>
                        {permissions?.massTransfer && (
                          <Dropdown.Item
                            className={styles?.dropdown_items}
                            onClick={() => toggleMassTransferAllLeads()}
                          >
                            <span className="flex justify-start item-center">
                              <MassTransfer />

                              <span className="ml-4"> Mass Transfer </span>
                            </span>
                          </Dropdown.Item>
                        )}
                        {permissions?.share && (
                          <Dropdown.Item
                            className={styles?.dropdown_items}
                            onClick={() => toggleShareAllLead()}
                          >
                            <span className="flex justify-start item-center">
                              <img src="/svg/share-icon.svg" alt="" />
                              <span className="ml-4">Share</span>
                            </span>
                          </Dropdown.Item>
                        )}
                        {permissions?.delete && (
                          <Dropdown.Item
                            onClick={() => toggleMultiDelete()}
                            className={styles?.dropdown_items}
                          >
                            <span className="flex justify-start item-center">
                              <img src="/svg/delete-icon.svg" alt="" />
                              <span className="ml-4">Delete </span>
                            </span>
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      {leadList?.length > 0 && (
                        <span className="ml-4">
                          <SkeletonButton height={40} width={40} />
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
              {loader ? (
                <div className={styles.main_loader}>
                  <LottieLoader height={250} width={250} loader={true} />
                </div>
              ) : (
                <>
                  {!loader && visibleNoData && leadList?.length === 0 ? (
                    <div className={styles.no_data_found_content}>
                      <NoDataFound
                        height={250}
                        width={250}
                        firstMessage={`Oops! no leads found.`}
                      />
                    </div>
                  ) : (
                    <table className={styles.leadsTable}>
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={isAllSelected}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th>Lead Name</th>
                          <th>Email</th>
                          <th>Lead Status</th>
                          <th>Source Form</th>
                          <th>State</th>
                          <th>Lead Owner</th>
                          <th>Created Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadList &&
                          leadList?.length > 0 &&
                          leadList?.map((lead, index) => (
                            <tr
                              key={index}
                              className={`${
                                !lead?.isReadLead
                                  ? `${styles.is_read} cursor-pointer`
                                  : "cursor-pointer"
                              } ${
                                !lead?.duplicateMerge
                                  ? devStyle.duplicate_merge
                                  : ""
                              }`.trim()}
                              onClick={() => {
                                if (lead?.duplicateMerge) {
                                  if (permissions?.view) {
                                    handleClickOnView(lead);
                                  }
                                } else {
                                  toggleDeleteDuplicateModal(lead);
                                }
                              }}
                            >
                              <td
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <input
                                  type="checkbox"
                                  className={styles.checkbox}
                                  checked={checkboxValue.includes(lead?._id)}
                                  onChange={(e) => {
                                    handleCheckboxChange(lead?._id);
                                  }}
                                />
                              </td>
                              <td>
                                {lead?.firstName || lead?.lastName
                                  ? `${lead?.firstName || ""} ${
                                      lead?.lastName || ""
                                    }`.trim()
                                  : "-"}
                              </td>
                              <td>
                                <span className={styles.span_flex}>
                                  {lead?.email ? lead?.email : "-"}

                                  {lead?.sharedWith?.length > 0 && (
                                    <Tooltip
                                      content={shareWithList(lead?.sharedWith)}
                                      position="top"
                                    >
                                      <img src="/svg/share.svg" alt="" />
                                    </Tooltip>
                                  )}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`${styles?.status} ${
                                    styles[
                                      lead?.leadStatusData?.name
                                        ?.toLowerCase()
                                        ?.replace(" ", "")
                                    ]
                                  }`}
                                >
                                  {lead?.leadStatusData?.name
                                    ? lead?.leadStatusData?.name
                                    : "-"}
                                </span>
                              </td>
                              <td>
                                {lead?.leadSourceData?.name
                                  ? lead?.leadSourceData?.name
                                  : "-"}
                              </td>
                              <td>
                                {lead?.address?.state
                                  ? lead?.address?.state
                                  : "-"}
                              </td>
                              <td>
                                {lead?.leadOwnerData
                                  ? `${lead?.leadOwnerData?.firstName} ${lead?.leadOwnerData?.lastName}`
                                  : "-"}
                              </td>
                              <td>
                                {lead?.createdAt && formatDate(lead?.createdAt)}
                              </td>
                              <td
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Dropdown
                                  show={openDropdownIndex === index}
                                  onToggle={() => {
                                    if (lead?.duplicateMerge) {
                                      toggleDropdown(index);
                                    } else {
                                      notification.warning(
                                        `Duplicate lead detected!!  A lead with the same email or phone number already exists. Please delete the duplicate before proceeding.`
                                      );
                                    }
                                  }}
                                >
                                  <Dropdown.Toggle
                                    className={styles.actionButton}
                                    as="button"
                                    bsPrefix="custom-dropdown-toggle"
                                  >
                                    <MoreVertical size={16} />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu
                                    className={styles?.dropdown_custom}
                                  >
                                    {permissions?.view && (
                                      <Dropdown.Item
                                        className={styles?.dropdown_items}
                                        onClick={() => handleClickOnView(lead)}
                                      >
                                        <span className="flex justify-start item-center">
                                          <img
                                            src="/svg/view-icon.svg"
                                            alt=""
                                          />
                                          <span className="ml-4">View</span>
                                        </span>
                                      </Dropdown.Item>
                                    )}

                                    {permissions?.edit && (
                                      <Dropdown.Item
                                        className={styles?.dropdown_items}
                                        onClick={() => handleClickOnEdit(lead)}
                                      >
                                        <span className="flex justify-start item-center">
                                          <img
                                            src="/svg/edit-icon.svg"
                                            alt=""
                                          />
                                          <span className="ml-4">Edit</span>
                                        </span>
                                      </Dropdown.Item>
                                    )}
                                    {permissions?.share && (
                                      <Dropdown.Item
                                        className={styles?.dropdown_items}
                                        onClick={() => toggleShareOption(lead)}
                                      >
                                        <span className="flex justify-start item-center">
                                          <img
                                            src="/svg/share-icon.svg"
                                            alt=""
                                          />
                                          <span className="ml-4">Share</span>
                                        </span>
                                      </Dropdown.Item>
                                    )}
                                    {permissions?.delete && (
                                      <>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                          onClick={() =>
                                            toggleVisibleDeleteModal(lead)
                                          }
                                          className={styles?.dropdown_items}
                                        >
                                          <span className="flex justify-start item-center">
                                            <img
                                              src="/svg/delete-icon.svg"
                                              alt=""
                                            />
                                            <span className="ml-4">Delete</span>
                                          </span>
                                        </Dropdown.Item>
                                      </>
                                    )}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
              {!loader && leadList?.length > 0 && (
                <div className="flex w-full align-center justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {visibleDeleteModal && (
        <DeleteLead
          visibleDeleteModal={visibleDeleteModal}
          onHide={toggleVisibleDeleteModal}
          handleDeleteSingleLead={handleDeleteSingleLead}
          deleteLoader={deleteLoader}
        />
      )}
      {showMultiDeleteModal && (
        <DeleteLead
          visibleDeleteModal={showMultiDeleteModal}
          onHide={toggleMultiDelete}
          handleDeleteSingleLead={handleMultiDelete}
          deleteLoader={deleteLoader}
        />
      )}
      {showShareModal && (
        <SharedLead
          show={showShareModal}
          onHide={toggleShareOption}
          activeShareLead={activeShareLead}
          fetchLeadList={fetchLeadList}
        />
      )}
      {showShareAllLead && (
        <SharedLead
          show={showShareAllLead}
          onHide={toggleShareAllLead}
          fetchLeadList={fetchLeadList}
          type="all"
          checkboxValue={checkboxValue}
          setCheckboxValue={setCheckboxValue}
        />
      )}
      {showMassTransferLead && (
        <MassTransferComp
          show={showMassTransferLead}
          onHide={toggleMassTransferAllLeads}
          fetchLeadList={fetchLeadList}
          checkboxValue={checkboxValue}
          setCheckboxValue={setCheckboxValue}
        />
      )}
      {visibleDeleteDuplicateModal && (
        <DeleteDuplicateModal
          show={visibleDeleteDuplicateModal}
          onHide={toggleDeleteDuplicateModal}
          leadId={activeDeleteDuplicateId?._id}
          fetchLeadList={fetchLeadList}
        />
      )}
    </div>
  );
};

export default LeadPage;
