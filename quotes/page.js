"use client";
/*eslint-disable @next/next/no-img-element*/
import React, { useContext, useEffect, useState } from "react";
import styles from "./quotes.module.scss";
import TooltipFixed from "@/components/shared/tooltip/tooltip-fixed";
import FilterSvg from "@/assets/svgs/filterSvg";
import AppButtons from "@/components/shared/buttons/appButtons";
import { Dropdown } from "react-bootstrap";
import { MoreVertical, QuoteIcon, X } from "lucide-react";
import MassTransfer from "@/assets/svgs/massTransfer";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import NoDataFound from "@/components/shared/Loader/NoDataAnimation";
import QuoteListFilter from "@/components/quotes/quoteListFilter";
import AuthContext from "@/hooks/context/AuthContext";
import SkeletonButton from "@/components/shared/skeleton/buttonSkeleton";
import {
  deleteMultiQuotesApi,
  deleteQuoteApi,
  getQuotesApi,
} from "@/hooks/ApisContainer/Quotes";
import useToastContext from "@/hooks/useToastContext";
import { useRouter } from "next/navigation";
import LeadContext from "@/hooks/context/LeadContext";
import Pagination from "@/components/shared/pagination/page";
import { formatDate } from "@/helper/helper";
import SharedLead from "@/components/lead/share-lead/page";
import MassTransferComp from "@/components/lead/share-lead/massTransfer";
import DeleteQuotes from "@/components/quotes/delete-quotes/delete-quotes";

const Quotes = () => {
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

  //  ALL STATE
  const [visibleMultiDropDown, setVisibleMultiDropDown] = useState(false);
  const [loader, setLoader] = useState(false);
  const [visibleNoData, setVisibleNoData] = useState(false);
  const [quotesList, setQuotesList] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState("");
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [preventFilterData, setPreventFilterData] = useState({});
  const [isFiltered, setIsFiltered] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeShareLead, setActiveShareLead] = useState({});
  const [showShareAllLead, setShowShareAllLead] = useState(false);
  const [checkedLeadIds, setCheckedLeadIds] = useState([]);
  const [showMassTransferLead, setShowMassTransferLead] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [activeDeleteQuote, setActiveDeleteQuote] = useState({});
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [showMultiDeleteModal, setShowMultiDeleteModal] = useState(false);

  const isAllSelected =
    quotesList?.length > 0 && checkboxValue?.length === quotesList?.length;

  const toggleDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex("");
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const toggleFilter = () => {
    setVisibleFilter(!visibleFilter);
  };

  useEffect(() => {
    if (user?.role && user?.role !== "superAdmin") {
      fetchUserPermission(user.role, "quotes");
    }
  }, [user.role]);

  useEffect(() => {
    leadAllList(notification);
  }, []);

  useEffect(() => {
    if (currentPage && rowsPerPage) {
      fetchQuotesList();
    }
  }, [currentPage, rowsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCheckboxValue([]);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
    setCheckboxValue([]);
  };

  const fetchQuotesList = (data, sortBy, sortType) => {
    setIsFiltered({ ...data });
    const requestPayload = {
      page: currentPage,
      pageSize: rowsPerPage,
      // sortBy: sortBy ? sortBy : "firstName",
      // sortType: sortType ? sortType : "desc",
      ...data,
    };

    getQuotesApi(requestPayload, notification, (loading, error, res) => {
      setLoader(loading);
      if (!error) {
        setQuotesList(res?.docs ? res?.docs : []);
        setVisibleNoData(true);
        setTotalPages(res?.totalDocs);
      }
    });
  };

  const renderQuoteName = (item) => {
    return item?.type === "quoteWithLead"
      ? item?.buildingSpecInfo?.quoteName || "-"
      : item?.quickQuoteName || "-";
  };

  const navigateToAddScreen = () => {
    router.push(`/${organizationName}/quotes/add-quotes`, undefined, {
      shallow: true,
    });
  };

  const toggleShareOption = (data) => {
    setActiveShareLead(data?.leadData);
    setShowShareModal(!showShareModal);
  };

  const handleCheckboxChange = (quotes) => {
    setCheckboxValue((prev) => {
      if (prev.includes(quotes?._id)) {
        return prev.filter((item) => item !== quotes?._id);
      } else {
        return [...prev, quotes?._id];
      }
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setCheckboxValue([]);
    } else {
      if (quotesList?.length > 0) {
        setCheckboxValue(quotesList?.map((quote) => quote?._id));
      }
    }
  };

  // -----Function to handle click on a quote------------
  const handleClickOnView = (quote) => {
    router.push(
      `/${organizationName}/quotes/view-quotes/quote-id=${quote?._id}`,
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (quotesList?.length > 0) {
      const leadIds = [];

      quotesList?.map((quotes) => {
        if (checkboxValue.includes(quotes?._id)) {
          leadIds.push(quotes?.leadData?._id);
        }
      });
      const uniqueArr = [...new Set(leadIds)];
      setCheckedLeadIds(uniqueArr);
    }
  }, [checkboxValue]);

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

  const toggleVisibleDeleteModal = (data) => {
    setActiveDeleteQuote(data);
    setVisibleDeleteModal(!visibleDeleteModal);
  };

  const handleDeleteSingleQuote = () => {
    const id = activeDeleteQuote?._id;
    deleteQuoteApi(id, notification, (loading, error) => {
      setDeleteLoader(loading);
      if (!error) {
        fetchQuotesList();
        setVisibleDeleteModal(false);
      }
    });
  };

  const toggleMultiDelete = () => {
    if (checkboxValue?.length > 0) {
      setShowMultiDeleteModal(!showMultiDeleteModal);
    } else {
      notification.warning(
        "Please select at least one checkbox for the quote you want to process."
      );
    }
  };

  const handleMultiDelete = () => {
    const requestPayload = {
      quoteIds: checkboxValue,
    };
    deleteMultiQuotesApi(requestPayload, notification, (loading, error) => {
      setDeleteLoader(loading);
      if (!error) {
        setCheckboxValue([]);
        fetchQuotesList();
        setShowMultiDeleteModal(false);
      }
    });
  };

  return (
    <div className={styles.lead_main_div}>
      <div className={styles.lead_container}>
        {visibleFilter && (
          <div className={styles.lead_navigation}>
            <QuoteListFilter
              fetchQuotesList={fetchQuotesList}
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
                  {quotesList?.length > 0 && (
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
                      {quotesList?.length > 0 && (
                        <span className={styles.leadCount}>
                          ({quotesList?.length} Quotes)
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
                          buttonTitle="Add New Quote"
                          type="button"
                          className="ml-2"
                          onClick={() => navigateToAddScreen()}
                        />
                      )}
                    </>
                  )}
                  {!permissionLoader && quotesList?.length > 0 ? (
                    <Dropdown
                      show={visibleMultiDropDown}
                      onToggle={() => {
                        if (quotesList?.length > 0) {
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
                              <span className="ml-4">Delete</span>
                            </span>
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      {quotesList?.length > 0 && (
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
                  {!loader && visibleNoData && quotesList?.length === 0 ? (
                    <div className={styles.no_data_found_content}>
                      <NoDataFound
                        height={250}
                        width={250}
                        firstMessage={`Oops! no quote found.`}
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
                          <th>Quote Name</th>
                          <th>Quote Type</th>
                          <th>Lead Name</th>
                          <th>Lead Owner</th>
                          <th>Grand Total</th>
                          <th>Status</th>
                          <th>Date Added</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotesList &&
                          quotesList?.length > 0 &&
                          quotesList?.map((quotes, index) => (
                            <tr
                              key={index}
                              className="cursor-pointer"
                              onClick={() => handleClickOnView(quotes)}
                            >
                              <td
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <input
                                  type="checkbox"
                                  className={styles.checkbox}
                                  checked={checkboxValue.includes(quotes?._id)}
                                  onChange={(e) => {
                                    handleCheckboxChange(quotes);
                                  }}
                                />
                              </td>
                              <td>
                                {quotes?.type ? renderQuoteName(quotes) : "-"}
                              </td>
                              <td>
                                {{
                                  quoteWithLead: "Quote With Lead",
                                  quickQuote: "Quick Quote",
                                }[quotes?.type] || "-"}
                              </td>
                              <td>
                                {quotes?.leadData?.lastName
                                  ? `${quotes?.leadData?.firstName} ${quotes?.leadData?.lastName}`
                                  : "-"}
                              </td>
                              <td>
                                <span className={styles.span_flex}>
                                  {quotes?.leadData?.leadOwnerName ?? "-"}
                                </span>
                              </td>
                              <td>{quotes?.grandTotal ?? "0"}</td>
                              <td>
                                <span
                                  className={`${styles?.status} ${
                                    styles[
                                      quotes?.leadData?.leadStatusName
                                        ?.toLowerCase()
                                        ?.replace(" ", "")
                                    ]
                                  }`}
                                >
                                  {quotes?.leadData?.leadStatusName
                                    ? quotes?.leadData?.leadStatusName
                                    : "-"}
                                </span>
                              </td>
                              <td>
                                {quotes?.createdAt &&
                                  formatDate(quotes?.createdAt)}
                              </td>

                              <td
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Dropdown
                                  show={openDropdownIndex === index}
                                  onToggle={() => {
                                    toggleDropdown(index);
                                  }}
                                >
                                  <Dropdown.Toggle
                                    className={styles.actionButton}
                                    as="button"
                                    bsPrefix="custom-dropdown-toggle"
                                    // data-dropdown-toggle-index={index}
                                  >
                                    <MoreVertical size={16} />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu
                                    className={styles?.dropdown_custom}
                                    // data-dropdown-menu-index={index}
                                  >
                                    {permissions?.view && (
                                      <Dropdown.Item
                                        className={styles?.dropdown_items}
                                        onClick={() => {
                                          if (!permissionLoader) {
                                            setLoader(true);
                                          }
                                          router.push(
                                            `/${organizationName}/quotes/view-quotes/quote-id=${quotes?._id}`,
                                            undefined,
                                            { shallow: true }
                                          );
                                        }}
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
                                        // onClick={() => handleClickOnEdit(lead)}
                                        onClick={() => alert("Coming Soon!")}
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
                                        onClick={() =>
                                          toggleShareOption(quotes)
                                        }
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
                                            toggleVisibleDeleteModal(quotes)
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
              {!loader && quotesList?.length > 0 && (
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

      {showShareModal && (
        <SharedLead
          show={showShareModal}
          onHide={toggleShareOption}
          activeShareLead={activeShareLead}
          fetchLeadList={fetchQuotesList}
        />
      )}

      {showShareAllLead && (
        <SharedLead
          show={showShareAllLead}
          onHide={toggleShareAllLead}
          fetchLeadList={fetchQuotesList}
          type="all"
          checkboxValue={checkedLeadIds}
          setCheckboxValue={setCheckboxValue}
        />
      )}

      {showMassTransferLead && (
        <MassTransferComp
          show={showMassTransferLead}
          onHide={toggleMassTransferAllLeads}
          fetchLeadList={fetchQuotesList}
          checkboxValue={checkedLeadIds}
          setCheckboxValue={setCheckboxValue}
        />
      )}

      {visibleDeleteModal && (
        <DeleteQuotes
          visibleDeleteModal={visibleDeleteModal}
          onHide={toggleVisibleDeleteModal}
          handleDelete={handleDeleteSingleQuote}
          deleteLoader={deleteLoader}
        />
      )}

      {showMultiDeleteModal && (
        <DeleteQuotes
          visibleDeleteModal={showMultiDeleteModal}
          onHide={toggleMultiDelete}
          handleDelete={handleMultiDelete}
          deleteLoader={deleteLoader}
        />
      )}
    </div>
  );
};

export default Quotes;
