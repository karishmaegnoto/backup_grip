/*eslint-disable @next/next/no-img-element*/
"use client";
import withAuth from "@/hooks/withAuth";
import React, { useEffect, useState } from "react";
import UserStyle from "./user.module.scss";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import Image from "next/image";
import UserLeftSection from "@/components/users/userLeftSection";
import {
  addAndUpdateUser,
  editUserApi,
  getUsersApi,
} from "@/hooks/ApisContainer/User";
import useToastContext from "@/hooks/useToastContext";
import { constantTypes, ROLE_DISPLAY_NAMES } from "@/utils/constants/constant";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import {
  checkEmailsAndMode,
  decryptData,
  removeUploadPath,
  whiteSpaceCheck,
} from "@/helper/helper";
import { MaxLength } from "@/utils/constants/CharactersLength";
import { useForm } from "react-hook-form";
import { regex } from "@/utils/constants/regexVariables";
import NoDataFound from "@/components/shared/Loader/NoDataAnimation";
import AddEditUserModal from "@/components/users/addEditUserModal";
import devStyle from "@/styles/devStyle.module.scss";
import PhoneInputField from "@/components/shared/FormFields/PhoneInputField";
import SeoTags from "@/components/SeoContainer/seoTags";
import { IMAGE_BASE_URL } from "@/services/path";

const Users = () => {
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

  const watchedValues = watch();

  // ALL STATE
  const [visibleAddEditModal, setVisibleAddEditModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [filterRoleSelected, setFilterRoleSelected] = useState("superAdmin");
  const [modalType, setModalType] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [filterValues, setFilterValues] = useState("");

  useEffect(() => {
    fetchUsers({});
  }, []);

  useEffect(() => {
    if (Object.keys(activeUser)?.length) {
      const isSupAdmin = activeUser?.parentEmail === activeUser?.email;
      setIsSuperAdmin(isSupAdmin);
      resetData(activeUser);
    }
  }, [activeUser]);

  const toggleAddEditModal = (type) => {
    setModalType(type);
    setVisibleAddEditModal(!visibleAddEditModal);
  };

  const fetchUsers = (data, type) => {
    getUsersApi(data, notification, (loading, error, res) => {
      !type && setLoader(loading);
      if (!error) {
        let sortedUsers = [];
        if (res?.length > 0) {
          sortedUsers = res.sort((a, b) => {
            if (a?.role === "superAdmin") return -1;
            if (b?.role === "superAdmin") return 1;
            return 0;
          });
        }

        if (sortedUsers?.length > 0) {
          if (Object.keys(activeUser).length == 0) {
            setActiveUser(sortedUsers[0]);
            resetData(sortedUsers[0]);
          } else {
            const temp =
              sortedUsers?.find((el) => el?._id === activeUser?._id) || {};
            setActiveUser(temp);
          }
        } else {
          setActiveUser({});
        }
        setUserData(sortedUsers);
      }
    });
  };

  const handleSelectActiveUser = (data) => {
    setActiveUser(data);
    resetData(data);
  };

  const resetData = (res) => {
    reset({
      firstName: res?.firstName || "",
      lastName: res?.lastName || "",
      mobile: res?.mobile || "",
      email: res?.email || "",
      role: res?.role || "",
      status: res?.status || "",
      userName: res?.userName || "",
      addressLineOne: res?.address?.line1 || "",
      addressLineTwo: res?.address?.line2 || "",
      city: res?.address?.city || "",
      state: res?.address?.state || "",
      country: res?.address?.country || "",
      zipcode: res?.address?.zipCode || "",
      countryCode: "+" + res.countryCode || "",
    });
    setPhone("+" + res?.countryCode + res?.mobile);
  };

  const onSubmit = (data, type) => {
    const formData = new FormData();

    const countryCode = data?.countryCode
      ? data?.countryCode.replace("+", "")
      : "";

    const address = {
      line1: data?.addressLineOne || "",
      line2: data?.addressLineTwo || "",
      city: data?.city || "",
      state: data?.state || "",
      country: data?.country || "",
      zipCode: data?.zipcode || "",
    };

    formData.append("firstName", data?.firstName || "");
    formData.append("lastName", data?.lastName || "");
    formData.append("mobile", data?.mobile || "");
    formData.append("countryCode", countryCode || "");
    formData.append("userEmail", data?.email || "");
    formData.append("password", data?.password || "");
    formData.append("role", data.role || "");
    formData.append("userName", data.userName || "");
    formData.append("address", JSON.stringify(address) || {});
    formData.append("status", data?.status || "");

    const userData = { id: activeUser?._id, modeType: modalType };

    editUserApi(formData, userData, type, notification, (loading, error) => {
      if (!error) {
        fetchUsers({}, type);
      }
    });
  };

  useEffect(() => {
    fetchUsers(filterValues);
  }, [filterValues]);

  const handleFilter = (event) => {
    setFilterRoleSelected(event.target.value);
    const data = { role: event.target.value || "" };
    setActiveUser({});
    setFilterValues(data);
    // fetchUsers(data);
  };

  useEffect(() => {
    if (activeUser) {
      const url = activeUser?.profilePic
        ? `${IMAGE_BASE_URL?.replace(/\/+$/, "")}/${removeUploadPath(
            activeUser?.profilePic
          ).replace(/^\/+/, "")}`
        : "/images/profile.png";
      setImageUrl(url);
    }
  }, [activeUser]);

  return (
    <div>
      <SeoTags
        title="User Management in Grip CRM"
        description="Efficiently manage user accounts in Grip CRM. Create, edit, and deactivate user profiles to streamline your team's access and collaboration. Monitor user activity and customize permissions to enhance your workflow. Schedule a demo to explore the powerful user management features available!"
      />
      {loader ? (
        <div className={ProfileStyle.main_loader}>
          <LottieLoader height={250} width={250} loader={true} />
        </div>
      ) : (
        <div className={UserStyle.user_main}>
          <UserLeftSection
            toggleAddEditModal={toggleAddEditModal}
            userData={userData}
            activeUser={activeUser}
            handleSelectActiveUser={handleSelectActiveUser}
            handleFilter={handleFilter}
            filterRoleSelected={filterRoleSelected}
            loader={loader}
          />
          {!loader && Object.keys(activeUser).length === 0 ? (
            <NoDataFound
              height={250}
              width={250}
              firstMessage={`Oops! It looks like there are no ${ROLE_DISPLAY_NAMES[
                filterRoleSelected
              ]?.toLocaleLowerCase()}`}
              message={"users in the system."}
              className={UserStyle.user_list_details}
            />
          ) : (
            <form
              className={UserStyle.user_list_details}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={ProfileStyle.profile_info}>
                <img
                  className={`${ProfileStyle.user_profile_image} ${UserStyle?.profileImage}`}
                  src={imageUrl}
                  alt="No_PROFILE_IMAGE"
                  onError={(e) => (e.currentTarget.src = "/images/noImage.jpg")}
                />
                <div className={ProfileStyle.profile_details}>
                  <div className={ProfileStyle.profile_name}>
                    {activeUser?.firstName} {activeUser?.lastName}
                    {activeUser?.role && (
                      <span>{ROLE_DISPLAY_NAMES[activeUser?.role] || ""}</span>
                    )}
                    <button
                      className={ProfileStyle.tab_name_a}
                      onClick={() => toggleAddEditModal("edit")}
                      type="button"
                    >
                      <img src="/svg/edit.svg" alt="No_Edit_Image" />
                    </button>
                  </div>
                  <div className={ProfileStyle.profile_email}>
                    <button className="flex" type="button">
                      <img src="/svg/email.svg" alt="No_Cancel_Image" />
                      <span className="ml-2">{activeUser?.email}</span>
                    </button>
                    <button className="flex" type="button">
                      <img src="/svg/phone.svg" alt="No_Phone_Image" />
                      <span className="ml-2">8778013263</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className={ProfileStyle.user_basic_info}>
                <div className={ProfileStyle.card_header}>
                  <h2 className={ProfileStyle.head_lead}>
                    Personal Information
                  </h2>
                </div>
                <div className={ProfileStyle.profile_info_details}>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      register={{
                        ...register("firstName", {
                          required: ValidationMessage.FIRST_NAME_REQUIRED,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      className={ProfileStyle.form_control}
                      inputType={"text"}
                      maxLength={MaxLength.nameLen}
                      errors={errors}
                      floatingLabel="First Name"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button className={ProfileStyle.edit_icon} type="button">
                      <img src="/svg/edit.svg" alt="No_Edit_Image" />
                    </button>
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      register={{
                        ...register("lastName", {
                          required: ValidationMessage?.LAST_NAME_REQUIRED,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      inputType={"text"}
                      maxLength={MaxLength.nameLen}
                      errors={errors}
                      className={ProfileStyle.form_control}
                      floatingLabel="Last Name"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button type="button">
                      <img
                        className={ProfileStyle.edit_icon}
                        src="/svg/edit.svg"
                        alt="No_Edit_Image"
                      />
                    </button>
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <PhoneInputField
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      name="mobile"
                      validationMessage={ValidationMessage}
                      regex={regex}
                      countryCode="+91"
                      initialPhone=""
                      setPhone={setPhone}
                      phone={phone}
                      className={""}
                      height={"49px"}
                      disabled={isSuperAdmin}
                      backgroundColor={isSuperAdmin ? "rgb(249, 249, 249)" : ""}
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    {!isSuperAdmin && (
                      <button type="button">
                        <img
                          className={ProfileStyle.edit_icon}
                          src="/svg/edit.svg"
                          alt="No_Edit_Image"
                        />
                      </button>
                    )}
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      register={{
                        ...register("email", {
                          required: ValidationMessage?.EMAIL_REQUIRED,
                          pattern: {
                            value: regex?.regEmail,
                            message: ValidationMessage?.ENTER_VALID_EMAIL,
                          },
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      errors={errors}
                      inputType="email"
                      floatingLabel="Email"
                      className={
                        isSuperAdmin
                          ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
                          : `${ProfileStyle.form_control}`
                      }
                      disabled={isSuperAdmin}
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    {!isSuperAdmin && (
                      <button type="button">
                        <img
                          className={ProfileStyle.edit_icon}
                          src="/svg/edit.svg"
                          alt="No_Edit_Image"
                        />
                      </button>
                    )}
                  </div>
                  <div className={`${ProfileStyle.form_floating} form_select`}>
                    <CustomizedFormFields
                      type="select"
                      name="role"
                      register={{
                        ...register("role", {
                          required: ValidationMessage?.ROLE_REQUIRED_FIELD,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      errors={errors}
                      floatingLabel="Role"
                      selectOption={constantTypes?.profileRoles}
                      selectOptionLabel="Select role"
                      value={watch("role")}
                      className={
                        isSuperAdmin
                          ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
                          : `${ProfileStyle.form_control}`
                      }
                      disabled={isSuperAdmin}
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    {!isSuperAdmin && (
                      <button type="button">
                        <img
                          className={ProfileStyle.edit_icon}
                          src="/svg/edit.svg"
                          alt="No_Edit_Image"
                        />
                      </button>
                    )}
                  </div>

                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="userName"
                      placeholder="Enter your first name"
                      register={{
                        ...register("userName", {
                          required: ValidationMessage.USER_NAME_REQUIRED,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      inputType={"text"}
                      maxLength={MaxLength.nameLen}
                      errors={errors}
                      className={`${ProfileStyle.form_control} ${devStyle.disabled_fields}`}
                      floatingLabel="User Name"
                      disabled={true}
                    />
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="select"
                      name="status"
                      register={{
                        ...register("status", {
                          required: ValidationMessage?.STATUS_REQUIRED,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      errors={errors}
                      floatingLabel="Status"
                      selectOption={constantTypes?.profileStatus}
                      selectOptionLabel="Select status"
                      value={watch("status")}
                      className={
                        isSuperAdmin
                          ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
                          : `${ProfileStyle.form_control}`
                      }
                      disabled={isSuperAdmin}
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    {!isSuperAdmin && (
                      <button type="button">
                        <img
                          className={ProfileStyle.edit_icon}
                          src="/svg/edit.svg"
                          alt="No_Edit_Image"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className={ProfileStyle.user_basic_info}>
                <div className={ProfileStyle.card_header}>
                  <h2 className={ProfileStyle.head_lead}>Other Information</h2>
                </div>
                <div className={ProfileStyle.profile_info_details}>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="addressLineOne"
                      placeholder="Enter your line one"
                      register={{
                        ...register("addressLineOne", {
                          required: false,
                        }),
                      }}
                      errors={errors}
                      className={ProfileStyle.form_control}
                      floatingLabel="Address 1"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button type="button">
                      <img
                        className={ProfileStyle.edit_icon}
                        src="/svg/edit.svg"
                        alt="No_Edit_Image"
                      />
                    </button>
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="addressLineTwo"
                      placeholder="Enter your line one"
                      register={{
                        ...register("addressLineTwo", {
                          required: false,
                        }),
                      }}
                      startLabel={false}
                      className={ProfileStyle.form_control}
                      floatingLabel="Address 2"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button type="button">
                      <img
                        className={ProfileStyle.edit_icon}
                        src="/svg/edit.svg"
                        alt="No_Edit_Image"
                      />
                    </button>
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      register={{
                        ...register("city", {
                          required: false,
                        }),
                      }}
                      inputType={"text"}
                      startLabel={false}
                      className={ProfileStyle.form_control}
                      floatingLabel="City"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button type="button">
                      <img
                        className={ProfileStyle.edit_icon}
                        src="/svg/edit.svg"
                        alt="No_Edit_Image"
                      />
                    </button>
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="state"
                      placeholder="Enter your state"
                      register={{
                        ...register("state", {
                          required: false,
                        }),
                      }}
                      inputType={"text"}
                      startLabel={false}
                      className={ProfileStyle.form_control}
                      floatingLabel="State"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button type="button">
                      <img
                        className={ProfileStyle.edit_icon}
                        src="/svg/edit.svg"
                        alt="No_Edit_Image"
                      />
                    </button>
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="country"
                      placeholder="Enter your country"
                      register={{
                        ...register("country", {
                          required: false,
                        }),
                      }}
                      inputType={"text"}
                      startLabel={false}
                      className={ProfileStyle.form_control}
                      floatingLabel="Country"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button type="button">
                      <img
                        className={ProfileStyle.edit_icon}
                        src="/svg/edit.svg"
                        alt="No_Edit_Image"
                      />
                    </button>
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="number"
                      name="zipcode"
                      placeholder="Enter your zip code"
                      register={{
                        ...register("zipcode", {
                          // required: ValidationMessage?.ZIP_CODE_FIELD,
                          required: false,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      inputType={"number"}
                      errors={errors}
                      maxLength={MaxLength.zipCode}
                      className={ProfileStyle.form_control}
                      floatingLabel="Zip Code"
                      onBlur={() => {
                        onSubmit(watchedValues, "editByOnBlur");
                      }}
                    />
                    <button type="button">
                      <img
                        className={ProfileStyle.edit_icon}
                        src="/svg/edit.svg"
                        alt="No_Edit_Image"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
      {visibleAddEditModal && (
        <AddEditUserModal
          onClose={toggleAddEditModal}
          activeUser={activeUser}
          modalType={modalType}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
};

export default withAuth(Users);
