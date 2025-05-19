/*eslint-disable @next/next/no-img-element*/
import React, { useEffect, useState } from "react";
import styles from "./styles/addUser.module.scss";
import CustomizedFormFields from "../shared/FormFields/CustomizedFormFields";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import {
  decryptData,
  matchesNewPassword,
  removeUploadPath,
  whiteSpaceCheck,
} from "@/helper/helper";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { MaxLength } from "@/utils/constants/CharactersLength";
import { useForm } from "react-hook-form";
import UserStyle from "@/app/[slug]/user/user.module.scss";
import { regex } from "@/utils/constants/regexVariables";
import { constantTypes } from "@/utils/constants/constant";
import UploadFileButton from "../shared/buttons/uploadFileButton";
import { addAndUpdateUser } from "@/hooks/ApisContainer/User";
import Loader from "../shared/Loader/Loader";
import PhoneInputField from "../shared/FormFields/PhoneInputField";
import useToastContext from "@/hooks/useToastContext";
import devStyle from "@/styles/devStyle.module.scss";
import CropEasy from "../shared/upload/Crop/cropEasy";
import UploadCropedImage from "../shared/upload/uploadCropedImage";
import { IMAGE_BASE_URL } from "@/services/path";

const AddEditUserModal = ({ onClose, activeUser, modalType, fetchUsers }) => {
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
  const [newPasswordToggleEye, setNewPasswordToggleEye] = useState(false);
  const [confirmPasswordToggleEye, setConfirmPasswordToggleEye] =
    useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [addUpdateUserLoader, setAddUpdateUserLoader] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (Object.keys(activeUser).length !== 0 && modalType !== "add") {
      resetData(activeUser);
    }
  }, [activeUser]);

  useEffect(() => {
    if (Object.keys(activeUser)?.length) {
      const isSupAdmin = checkEmailsAndMode(
        activeUser?.parentEmail,
        activeUser?.email,
        modalType
      );

      setIsSuperAdmin(isSupAdmin);
    }
  }, [activeUser]);

  const onSubmit = (data) => {
    const formData = new FormData();

    const countryCode = data?.countryCode
      ? data?.countryCode.replace("+", "")
      : "";

    formData.append("firstName", data?.firstName || "");
    formData.append("lastName", data?.lastName || "");
    formData.append("mobile", data?.mobile || "");
    formData.append("countryCode", countryCode || "");
    formData.append("userEmail", data?.email || "");
    formData.append("password", data?.password || "");
    formData.append("role", data.role || "");
    modalType === "edit" && formData.append("status", data?.status || "");
    if (selectedFile) {
      formData.append("profilePic", selectedFile);
    }

    const userData = { id: activeUser?._id, modeType: modalType };

    addAndUpdateUser(formData, userData, notification, (loading, error) => {
      setAddUpdateUserLoader(loading);
      if (!error) {
        fetchUsers({});
        onClose("close");
      }
    });
  };

  function getModalTitle(modalType) {
    if (modalType === "add") return "Add User";
    if (modalType === "edit") return "Edit User";
    return "";
  }

  function checkEmailsAndMode(email1, email2, mode) {
    return email1 === email2 && mode === "edit";
  }

  const resetData = (res) => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(window?.localStorage.getItem("Check-data"));

      reset({
        firstName: res?.firstName,
        lastName: res?.lastName,
        mobile: res?.mobile,
        countryCode: "+" + res.countryCode,
        email: res?.email,
        role: res?.role,
        status: res?.status,
        password: res?.userPassword
          ? res?.userPassword
          : decryptData(localData?.password),
      });

      const url = res?.profilePic
        ? `${IMAGE_BASE_URL?.replace(/\/+$/, "")}/${removeUploadPath(
            res?.profilePic
          ).replace(/^\/+/, "")}`
        : "/images/profile.png";

      setImageUrl(url);
      setPhone("+" + res?.countryCode + res?.mobile);
    }
  };

  const handelFileSelect = (value) => {
    if (value) {
      const file = value;
      if (file) {
        setSelectedFile(file);
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.share_lead_head}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M12 4C12.9889 4 13.9556 4.29324 14.7779 4.84265C15.6001 5.39206 16.241 6.17295 16.6194 7.08658C16.9978 8.00021 17.0969 9.00555 16.9039 9.97545C16.711 10.9454 16.2348 11.8363 15.5355 12.5355C14.8363 13.2348 13.9454 13.711 12.9755 13.9039C12.0056 14.0969 11.0002 13.9978 10.0866 13.6194C9.17296 13.241 8.39206 12.6001 7.84266 11.7779C7.29325 10.9556 7 9.98891 7 9C7 7.67392 7.52679 6.40215 8.46447 5.46447C9.40215 4.52678 10.6739 4 12 4ZM12 2C10.6155 2 9.26216 2.41054 8.11101 3.17971C6.95987 3.94888 6.06266 5.04213 5.53285 6.32122C5.00303 7.6003 4.86441 9.00776 5.13451 10.3656C5.4046 11.7235 6.07129 12.9708 7.05026 13.9497C8.02922 14.9287 9.2765 15.5954 10.6344 15.8655C11.9922 16.1356 13.3997 15.997 14.6788 15.4672C15.9579 14.9373 17.0511 14.0401 17.8203 12.889C18.5895 11.7378 19 10.3845 19 9C19 7.14348 18.2625 5.36301 16.9498 4.05025C15.637 2.7375 13.8565 2 12 2ZM32 14H28V10H26V14H22V16H26V20H28V16H32V14ZM20 30H22V25C22 23.1435 21.2625 21.363 19.9497 20.0503C18.637 18.7375 16.8565 18 15 18H9C7.14348 18 5.36301 18.7375 4.05025 20.0503C2.7375 21.363 2 23.1435 2 25V30H4V25C4 23.6739 4.52678 22.4021 5.46447 21.4645C6.40215 20.5268 7.67392 20 9 20H15C16.3261 20 17.5979 20.5268 18.5355 21.4645C19.4732 22.4021 20 23.6739 20 25V30Z"
              fill="#12182B"
            ></path>
          </svg>
          <h2 className={styles.modalTitle}>{getModalTitle(modalType)}</h2>
          <p className={styles.modalSubtitle}>
            Select the lead owner you want to share this lead with
          </p>
        </div>
        <form
          className={UserStyle.user_list_details}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={ProfileStyle.user_basic_info}>
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
              <div
                className={`${ProfileStyle.form_floating} ${ProfileStyle.mobile_fields}`}
              >
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
                />
                <label className={ProfileStyle.check_mobile}>Mobile No.</label>
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
                />
              </div>
              <div className={ProfileStyle.form_floating}>
                <CustomizedFormFields
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  startLabelClass="input-label block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                  register={{
                    ...register("password", {
                      required: ValidationMessage.PASSWORD_REQUIRED,
                      pattern: {
                        value: regex.regPassword,
                        message: ValidationMessage.PASSWORD_VALID,
                      },
                      validate: (value) => whiteSpaceCheck(value),
                    }),
                  }}
                  setToggleEye={(e) => {
                    if (!isSuperAdmin) {
                      setNewPasswordToggleEye(e);
                    }
                  }}
                  toggleEye={newPasswordToggleEye}
                  inputType={"text"}
                  errors={errors}
                  floatingLabel="Password"
                  className={
                    isSuperAdmin
                      ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
                      : `${ProfileStyle.form_control}`
                  }
                  disabled={isSuperAdmin}
                />
              </div>
              {modalType !== "edit" && (
                <div className={ProfileStyle.form_floating}>
                  <CustomizedFormFields
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Enter confirm password"
                    startLabelClass="input-label block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                    register={{
                      ...register("confirmNewPassword", {
                        required: ValidationMessage.CONFIRM_NEW_PASSWORD_VALID,
                        validate: (value) => {
                          return matchesNewPassword(
                            watch("password"),
                            value,
                            ValidationMessage.CONFIRM_PASSWORD_VALID_NEW
                          );
                        },
                      }),
                    }}
                    setToggleEye={setConfirmPasswordToggleEye}
                    toggleEye={confirmPasswordToggleEye}
                    inputType={"text"}
                    errors={errors}
                    floatingLabel="Confirm Password"
                    className={
                      isSuperAdmin
                        ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
                        : `${ProfileStyle.form_control}`
                    }
                    disabled={isSuperAdmin}
                  />
                </div>
              )}
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
                />
              </div>
              {modalType !== "add" && (
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
                    style={{ cursor: "not-allowed" }}
                    value={watch("status")}
                    className={
                      isSuperAdmin
                        ? `${ProfileStyle.form_control} ${devStyle.disabled_fields}`
                        : `${ProfileStyle.form_control}`
                    }
                    disabled={isSuperAdmin}
                  />
                </div>
              )}
            </div>
          </div>
          {/* <UploadFileButton handleOnChange={handelFileSelect} /> */}
          <UploadCropedImage
            handleOnChange={handelFileSelect}
            previewImage={preview}
          />
          {modalType !== "add" ? (
            <div className={styles.profilePhotoPreview}>
              {preview ? (
                <img
                  className={styles?.uploadedImage}
                  src={
                    selectedFile.type == "application/pdf"
                      ? "https://i.pinimg.com/736x/81/97/55/81975517a51651e8f8940759360d01da.jpg"
                      : selectedFile.type ==
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      ? "https://image.similarpng.com/very-thumbnail/2021/09/Microsoft-Excel-icon-design-on-transparent-background-PNG.png"
                      : preview
                  }
                  alt="No_Uploaded_Image"
                />
              ) : (
                <>
                  <img
                    className={styles?.uploadedImage}
                    src={imageUrl}
                    alt="No_Uploaded_Image"
                    onError={(e) =>
                      (e.currentTarget.src = "/images/noImage.jpg")
                    }
                  />
                </>
              )}
            </div>
          ) : (
            <div className={styles.profilePhotoPreview}>
              {preview && (
                <img
                  className={styles?.uploadedImage}
                  src={
                    selectedFile.type == "application/pdf"
                      ? "https://i.pinimg.com/736x/81/97/55/81975517a51651e8f8940759360d01da.jpg"
                      : selectedFile.type ==
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      ? "https://image.similarpng.com/very-thumbnail/2021/09/Microsoft-Excel-icon-design-on-transparent-background-PNG.png"
                      : preview
                  }
                  alt="No_Uploaded_Image"
                />
              )}
            </div>
          )}

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={() => onClose("close")}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              className={`${styles.saveButton} ${
                addUpdateUserLoader ? "pointer-not-allowed" : ""
              }`}
              disabled={addUpdateUserLoader}
            >
              <span className="flex justify-center items-center">
                Save
                {addUpdateUserLoader && <Loader height="23px" width="23px" />}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditUserModal;
