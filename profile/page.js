/*eslint-disable @next/next/no-img-element*/
"use client";
import withAuth from "@/hooks/withAuth"; // Adjust the path if needed
import React, { useEffect, useRef, useState } from "react";
import ProfileStyle from "./profile.module.scss";
import Image from "next/image";
import {
  getProfileApi,
  getTimezoneApi,
  updateProfileApi,
} from "@/hooks/ApisContainer/Auth";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { useForm } from "react-hook-form";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { MaxLength } from "@/utils/constants/CharactersLength";
import useToastContext from "@/hooks/useToastContext";
import { regex } from "@/utils/constants/regexVariables";
import { constantTypes, ROLE_DISPLAY_NAMES } from "@/utils/constants/constant";
import { removeUploadPath, whiteSpaceCheck } from "@/helper/helper";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import Timezone from "@/hooks/use-timezone";
import Link from "next/link";
import devStyle from "@/styles/devStyle.module.scss";
import Loader from "@/components/shared/Loader/Loader";
import SeoTags from "@/components/SeoContainer/seoTags";
import SingleSelect from "@/components/shared/FormFields/singleSearchableSelect";
import { IMAGE_BASE_URL } from "@/services/path";
import { Pencil } from "lucide-react";
import UploadCropedImage from "@/components/shared/upload/uploadCropedImage";

const Profile = () => {
  const notification = useToastContext();
  const inputRef = useRef(null);
  const fileInput = useRef();

  //****HOOK FORM******/
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();

  const defaultTimeZone = Timezone();

  // ALL STATE
  const [loader, setLoader] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [timezoneOption, setTimeZoneOption] = useState([]);
  const [updateProfileLoader, setUpdateProfileLoader] = useState(false);
  const [timeZoneValue, setTimeZoneValue] = useState({
    id: "",
    value: "",
    label: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (defaultTimeZone) {
      fetchProfile();
    }
  }, [defaultTimeZone]);

  useEffect(() => {
    if (Object.keys(profileData)?.length > 0) {
      fetchTimezone();
    }
  }, [profileData]);

  const fetchTimezone = () => {
    const data = { ...profileData, defaultZone: defaultTimeZone };
    getTimezoneApi(data, notification, (loading, error, res) => {
      if (!error) {
        const arr = [];
        if (res.length > 0) {
          res?.map((el) => {
            // arr.push({ id: el?._id, value: el?.name, title: el?.name });
            arr.push({ id: el?.name, value: el?.name, title: el?.name });
          });
          if (!data?.timeZone) {
            fetchProfile();
          }

          setTimeZoneOption(arr);
        }
      }
    });
  };

  const fetchProfile = () => {
    getProfileApi({}, notification, (loading, error, res) => {
      setLoader(loading);
      if (!error) {
        setProfileData(res);
        if (defaultTimeZone) {
          resetData(res, defaultTimeZone);
        }
      }
    });
  };

  const resetData = (res, defTimeZone) => {
    reset({
      firstName: res?.firstName,
      lastName: res?.lastName,
      mobile: res?.mobile,
      email: res?.email,
      role: res?.role,
      status: res?.status,
      userName: res?.userName,
      addressLineOne: res?.address?.line1,
      addressLineTwo: res?.address?.line2,
      city: res?.address?.city,
      state: res?.address?.state,
      country: res?.address?.country,
      zipcode: res?.address?.zipCode,
      // timezone: res?.timeZone ?? defTimeZone,
    });
    const url = res?.profilePic
      ? `${IMAGE_BASE_URL?.replace(/\/+$/, "")}/${removeUploadPath(
          res?.profilePic
        ).replace(/^\/+/, "")}`
      : "/images/profile.png";

    setImageUrl(url);
    setTimeZoneValue(
      res?.timeZone
        ? { id: res?.timeZone, value: res?.timeZone, title: res?.timeZone }
        : { id: defTimeZone, value: defTimeZone, title: defTimeZone }
    );
  };

  const onSubmit = (data) => {
    const address = {
      line1: data?.addressLineOne || "",
      line2: data?.addressLineTwo || "",
      city: data?.city || "",
      state: data?.state || "",
      country: data?.country || "",
      zipCode: data?.zipcode || "",
    };

    const formData = new FormData();

    formData.append("firstName", data?.firstName || "");
    formData.append("lastName", data?.lastName || "");
    formData.append("userEmail", data?.email || "");
    formData.append("password", data?.password || "");
    formData.append("mobile", data?.mobile || "");
    formData.append("industryName", data?.industryName || "");
    formData.append("address", JSON.stringify(address) || {});
    formData.append("profilePic", selectedFile || "");
    // formData.append("timeZone", data?.timezone || "");
    formData.append("timeZone", timeZoneValue?.value || "");
    // setTimeZoneOption({
    //   id: timeZoneValue?.value,
    //   value: timeZoneValue?.value,
    //   title: timeZoneValue?.value,
    // });

    updateProfileApi(formData, notification, (loading, error) => {
      setUpdateProfileLoader(loading);
      if (!error) {
        fetchProfile();
      }
    });
  };

  const handleTextClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // const handleChange = (selectedOption) => {
  //   setTimeZoneValue(selectedOption);
  // };

  const handleChange = (field) => (value) => {
    setTimeZoneValue(value);
  };
  // const handelFileSelect = (value) => {
  //   if (value) {
  //     const file = value;
  //     if (file) {
  //       setSelectedFile(file);
  //       const filePreview = URL.createObjectURL(file);
  //       setPreview(filePreview);
  //     }
  //   }
  // };

  const handelChangeImage = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > 200 * 1024 * 1024) {
        notification.error("File size should not exceed 200 MB.");
        return;
      }

      const acceptedFormats = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!acceptedFormats.includes(file.type)) {
        notification.error("Only image formats are allowed.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadFileTarget = () => {
    fileInput.current.click();
  };

  return (
    <div className={ProfileStyle.profile_main_div}>
      <SeoTags
        title="Manage Your Grip CRM Profile"
        description="View and update your profile information in Grip CRM. Customize your settings to enhance your experience in managing customer relationships, tracking sales, and improving overall satisfaction. Schedule a demo to explore our platform's full potential!"
      />
      <form
        action=""
        className={ProfileStyle.profile_main_form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        {loader ? (
          <div className={ProfileStyle.main_loader}>
            <LottieLoader height={250} width={250} loader={true} />
          </div>
        ) : (
          <div>
            <div className={ProfileStyle.common_div_top}>
              <button
                className={ProfileStyle.cancel_button}
                type="button"
                onClick={() => resetData(profileData)}
              >
                <img src="/svg/cancel.svg" alt="No_Cancel_Image" />
                <span>Reset</span>
              </button>
              <button
                className={ProfileStyle.save_button}
                disabled={updateProfileLoader}
              >
                {updateProfileLoader ? (
                  <Loader height="20px" width="20px" newLoader={true} />
                ) : (
                  <img src="/svg/save.svg" alt="No_Save_Image" />
                )}
                <span>Save</span>
              </button>
            </div>
            <div className={ProfileStyle.profile_main_bottom}>
              <div className={ProfileStyle.profile_info}>
                <div style={{ position: "relative" }}>
                  <input
                    type="file"
                    name="fileUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInput}
                    onChange={handelChangeImage}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <img
                    className={`${ProfileStyle.user_profile_image} ${ProfileStyle?.profileImage}`}
                    src={selectedFile?.name ? preview : imageUrl}
                    alt="No_Uploaded_Image"
                    onError={(e) =>
                      (e.currentTarget.src = "/images/noImage.jpg")
                    }
                  />
                  <Pencil
                    size={15}
                    color="#ffffff"
                    className={ProfileStyle?.pencel}
                    onClick={() => uploadFileTarget()}
                  />
                </div>
                {profileData && (
                  <div className={ProfileStyle.profile_details}>
                    <div className={ProfileStyle.profile_name}>
                      {profileData?.firstName} {profileData?.lastName}{" "}
                      <span>{ROLE_DISPLAY_NAMES[profileData?.role] || ""}</span>
                      {/* <a className={ProfileStyle.tab_name_a} href="">
                        <img src="/svg/edit.svg" alt="No_edit_Image" />
                      </a> */}
                    </div>
                    {profileData?.industryName && (
                      <div className={ProfileStyle.profile_role}>
                        {profileData?.industryName ?? ""}
                      </div>
                    )}
                    <div className={ProfileStyle.profile_email}>
                      {profileData?.email && (
                        <Link
                          href={`mailto:${profileData?.email}`}
                          className={devStyle.email_style}
                        >
                          <img src="/svg/profileEdit.svg" alt="No_Edit_Image" />
                          {profileData?.email}
                        </Link>
                      )}
                      {profileData?.mobile && (
                        <>
                          <Link
                            href=""
                            onClick={() => handleTextClick()}
                            className={devStyle.tel_style}
                          >
                            <img src="/svg/phone.svg" alt="No_Phone_Image" />
                            {profileData?.mobile}
                          </Link>
                          <input
                            ref={inputRef}
                            type="tel"
                            style={{
                              opacity: 0,
                              position: "absolute",
                              left: "-9999px",
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
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
                    />
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
                    />
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="number"
                      name="mobile"
                      placeholder="Enter your mobile no"
                      register={{
                        ...register("mobile", {
                          required: ValidationMessage.MOBILE_NUMBER_REQUIRED,
                          validate: (value) => whiteSpaceCheck(value),
                          pattern: {
                            value: regex?.regPhone,
                            message: ValidationMessage?.VALID_MOBILE_NO,
                          },
                          minLength: {
                            value: 10,
                            message: ValidationMessage?.MOBILE_NOT_LESS_10,
                          },
                          maxLength: {
                            value: 15,
                            message: ValidationMessage?.MOBILE_NOT_GRATER_15,
                          },
                        }),
                      }}
                      inputType={"number"}
                      errors={errors}
                      startLabel={true}
                      // className={ProfileStyle.form_control}
                      className={`${ProfileStyle.form_control} ${devStyle.disabled_fields}`}
                      floatingLabel="Mobile no."
                      disabled={true}
                      // style={{ cursor: "not-allowed" }}
                    />
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
                      className={`${ProfileStyle.form_control} ${devStyle.disabled_fields}`}
                      disabled={true}
                    />
                  </div>
                  <div className={`${ProfileStyle.form_floating} form_select`}>
                    <CustomizedFormFields
                      type="select"
                      name="role"
                      register={{
                        ...register("role", {
                          required: false,
                        }),
                      }}
                      // className={ProfileStyle.form_control}
                      className={`${ProfileStyle.form_control} ${devStyle.disabled_fields}`}
                      errors={errors}
                      floatingLabel="Role"
                      selectOption={constantTypes?.profileRoles}
                      selectOptionLabel="Select role"
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                      value={watch("role")}
                    />
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="userName"
                      placeholder="Enter your user name"
                      register={{
                        ...register("userName", {
                          required: ValidationMessage.USER_NAME_REQUIRED,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      className={`${ProfileStyle.form_control} ${devStyle.disabled_fields}`}
                      inputType={"text"}
                      maxLength={MaxLength.userName}
                      errors={errors}
                      floatingLabel="User Name"
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="select"
                      name="status"
                      register={{
                        ...register("status", {
                          required: false,
                        }),
                      }}
                      // className={ProfileStyle.form_control}
                      className={`${ProfileStyle.form_control} ${devStyle.disabled_fields}`}
                      errors={errors}
                      floatingLabel="Status"
                      selectOption={constantTypes?.profileStatus}
                      selectOptionLabel="Select status"
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                      value={watch("status")}
                    />
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
                    />
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="text"
                      name="addressLineTwo"
                      placeholder="Enter your line two"
                      register={{
                        ...register("addressLineTwo", {
                          required: false,
                        }),
                      }}
                      startLabel={false}
                      className={ProfileStyle.form_control}
                      floatingLabel="Address 2"
                    />
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
                    />
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
                    />
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
                    />
                  </div>
                  <div className={ProfileStyle.form_floating}>
                    <CustomizedFormFields
                      type="number"
                      name="zipcode"
                      placeholder="Enter your zip code"
                      register={{
                        ...register("zipcode", {
                          required: ValidationMessage?.ZIP_CODE_FIELD,
                          validate: (value) => whiteSpaceCheck(value),
                        }),
                      }}
                      inputType={"number"}
                      errors={errors}
                      maxLength={MaxLength.zipCode}
                      className={ProfileStyle.form_control}
                      floatingLabel="Zip Code"
                    />
                  </div>
                </div>
              </div>

              <div className={ProfileStyle.user_basic_info}>
                <div className={ProfileStyle.card_header}>
                  <h2 className={ProfileStyle.head_lead}>Timezone</h2>
                </div>
                <div className={ProfileStyle.profile_info_details}>
                  <div className={`${ProfileStyle.form_floating} form_select`}>
                    {/* <SearchableSelect
                      options={timezoneOption}
                      value={timeZoneValue}
                      onChange={handleChange}
                      placeholder="Select timeZone"
                    /> */}

                    <SingleSelect
                      options={timezoneOption}
                      label={"Timezone"}
                      onSelectionChange={handleChange()}
                      value={timeZoneValue}
                      crossButton={false}
                    />
                    <label>Timezone</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default withAuth(Profile);
