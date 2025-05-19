"use client";
import React, { useEffect, useState } from "react";
import ManufacturerStyles from "./manufacturer.module.scss";
import { Edit, Trash2 } from "lucide-react";
import AppButtons from "@/components/shared/buttons/appButtons";
import SaveSvg from "@/assets/svgs/saveSvg";
import Pagination from "@/components/shared/pagination/page";
import { getManufacturerApi } from "@/hooks/ApisContainer/Manufacturer";
import useToastContext from "@/hooks/useToastContext";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import NoDataFound from "@/components/shared/Loader/NoDataAnimation";
import { formatDate } from "@/helper/helper";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { useForm } from "react-hook-form";
import devStyle from "@/styles/devStyle.module.scss";
import DeleteManufacturerModal from "@/components/manufacturer/deleteManufacturerModal";
import AddEditManufacturer from "@/components/manufacturer/addEditManufacturer";

const ManufacturerPage = () => {
  const notification = useToastContext();

  //****HOOK FORM******/
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();

  // ALL STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);
  const [manufacturesList, setManufacturesList] = useState([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [activeManufacturer, setActiveManufacturer] = useState({});
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [activeDeleteManufacturer, setActiveDeleteManufacturer] = useState({});

  const searchTerm = watch("search");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchManufacturerList();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (!loader) {
      const timer = setTimeout(() => {
        fetchManufacturerList(searchTerm);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const fetchManufacturerList = (searchValue) => {
    const requestPayload = {
      page: currentPage,
      pageSize: rowsPerPage,
    };

    if (searchValue) {
      requestPayload.keyword = searchValue?.trim()?.replace(/\s+/g, " ");
    }
    getManufacturerApi(requestPayload, notification, (loading, error, res) => {
      setLoader(loading);
      if (!error) {
        setManufacturesList(res?.docs ? res?.docs : []);
        setTotalPages(res?.totalDocs);
      }
    });
  };

  const toggleAddEditModal = (type, data) => {
    setModalType(type);
    if (type === "edit") {
      setActiveManufacturer(data);
    } else {
      setActiveManufacturer({});
    }
    setVisibleAddModal(!visibleAddModal);
  };
  const toggleDeleteModal = (data) => {
    setActiveDeleteManufacturer(data);
    setVisibleDeleteModal(!visibleDeleteModal);
  };

  return (
    <div className={ManufacturerStyles.manufacturer_main_div}>
      <form className={ManufacturerStyles.manufacturer_main_form}>
        <div className={ManufacturerStyles.manufacturer_field}>
          <div className={ManufacturerStyles.manufacturer_section_div}>
            <div className={ManufacturerStyles.manufacturer_heading}>
              <h2>Manufacturer Details</h2>
              <div className={ManufacturerStyles.header}>
                <div className={ProfileStyle.profile_info_details}>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="search"
                      placeholder="Search by name"
                      register={{
                        ...register("search", {
                          required: false,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      errors={errors}
                      floatingLabel="Search"
                      className={
                        loader
                          ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
                          : `${ProfileStyle.form_control}`
                      }
                      disabled={loader}
                    />
                  </div>
                  {searchTerm && (
                    <AppButtons
                      buttonType="black"
                      buttonSvg="/svg/cancel.svg"
                      buttonTitle="Reset"
                      type="button"
                      buttonSvgAlt="No_Reset_Image"
                      className="ml-2"
                      onClick={() => setValue("search", "")}
                    />
                  )}
                </div>
                <AppButtons
                  buttonType="black"
                  buttonSvg="/svg/add.svg"
                  buttonSvgAlt="No_Add_Image"
                  buttonTitle="Add Manufacturer"
                  type="button"
                  className="ml-2 w-[165px]"
                  onClick={() => toggleAddEditModal("add")}
                />
              </div>
            </div>
            <div className={ManufacturerStyles.manufacturer_info_details}>
              {loader ? (
                <div className={ManufacturerStyles.main_loader}>
                  <LottieLoader height={250} width={250} loader={true} />
                </div>
              ) : (
                <>
                  {!loader && manufacturesList?.length === 0 ? (
                    <div className={ManufacturerStyles.no_data_found_content}>
                      <NoDataFound
                        height={250}
                        width={250}
                        firstMessage={`Oops! no data found for manufacturer`}
                      />
                    </div>
                  ) : (
                    <>
                      <table className={ManufacturerStyles.table}>
                        <thead>
                          <tr>
                            <th>Manufacturer Name</th>
                            {/* <th>Full Name</th> */}
                            <th>Mobile No</th>
                            <th>Created Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {manufacturesList &&
                            manufacturesList?.length > 0 &&
                            manufacturesList?.map((manufacturer) => (
                              <tr key={manufacturer?._id}>
                                <td>{manufacturer?.fullName ?? "-"}</td>
                                {/* <td>{manufacturer?.fullName ?? "-"}</td> */}
                                <td>{manufacturer?.phone ?? "-"}</td>

                                {manufacturer?.createdAt && (
                                  <td>{formatDate(manufacturer.createdAt)}</td>
                                )}
                                <td>
                                  <div className="flex">
                                    <Edit
                                      size={19}
                                      color="currentColor"
                                      className="mr-2 pointer"
                                      onClick={() =>
                                        toggleAddEditModal("edit", manufacturer)
                                      }
                                    />
                                    <Trash2
                                      size={19}
                                      color="red"
                                      className="mr-2 pointer"
                                      onClick={() =>
                                        toggleDeleteModal(manufacturer)
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {manufacturesList && manufacturesList?.length > 0 && (
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
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </form>
      {visibleAddModal && (
        <AddEditManufacturer
          show={visibleAddModal}
          onHide={toggleAddEditModal}
          ManufacturerStyles={ManufacturerStyles}
          activeManufacturer={activeManufacturer}
          modalType={modalType}
          fetchManufacturerList={fetchManufacturerList}
        />
      )}

      {visibleDeleteModal && (
        <DeleteManufacturerModal
          onClose={setVisibleDeleteModal}
          activeManufacturer={activeDeleteManufacturer}
          fetchManufacturerList={fetchManufacturerList}
        />
      )}
    </div>
  );
};

export default ManufacturerPage;
