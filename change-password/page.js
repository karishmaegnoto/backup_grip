/*eslint-disable @next/next/no-img-element*/
"use client";
import React, { useEffect, useState } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";
import { useForm } from "react-hook-form";
import useToastContext from "@/hooks/useToastContext";
import { useRouter } from "next/navigation";
import CustomizedFormFields from "@/components/shared/FormFields/CustomizedFormFields";
import { ValidationMessage } from "@/utils/constants/validationMessage";
import { regex } from "@/utils/constants/regexVariables";
import { matchesNewPassword, whiteSpaceCheck } from "@/helper/helper";
import { changePasswordApi } from "@/hooks/ApisContainer/Auth";
import Loader from "@/components/shared/Loader/Loader";
import SeoTags from "@/components/SeoContainer/seoTags";

const ChangePassword = () => {
  const notification = useToastContext();
  const router = useRouter();

  //******** HOOK FORM ********/
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  // ALL STATE
  const [oldPasswordToggleEye, setOldPasswordToggleEye] = useState(false);
  const [newPasswordToggleEye, setNewPasswordToggleEye] = useState(false);
  const [confirmPasswordToggleEye, setConfirmPasswordToggleEye] =
    useState(false);
  const [loader, setLoader] = useState(false);

  const onSubmit = (data) => {
    changePasswordApi(data, notification, (loading, error) => {
      setLoader(loading);
      if (!error) {
        router.push("/login");
        reset();
      }
    });
  };

  return (
    <div className={ProfileStyle.profile_main_div}>
      <SeoTags
        title="Change Your Grip CRM Password"
        description="Update your password to ensure the security of your Grip CRM account. A strong password helps protect your information as you manage customer relationships, track sales, and enhance overall satisfaction. Schedule a demo to discover more features of our platform!"
      />
      <form
        action=""
        className={ProfileStyle.profile_main_form}
        onSubmit={handleSubmit(onSubmit)}
        // noValidate
        // autoComplete="off"
      >
        <div className={ProfileStyle.common_div_top}>
          <button
            className={ProfileStyle.cancel_button}
            onClick={() => reset()}
            type="button"
          >
            <div>
              <img src="/svg/cancel.svg" alt="No_Cancel_Svg" />
            </div>
            Reset
          </button>
          <button className={ProfileStyle.save_button}>
            <div>
              <img src="/svg/save.svg" alt="No_Save_Svg" />
            </div>
            Save {loader && <Loader height="15px" width="15px" />}
          </button>
        </div>
        <div className={ProfileStyle.profile_main_bottom}>
          <div className={ProfileStyle.user_basic_info}>
            <div className={ProfileStyle.card_header}>
              <h2 className={ProfileStyle.head_lead}>Change Password</h2>
            </div>
            <div className={ProfileStyle.profile_info_details}>
              <div className={ProfileStyle.form_floating}>
                <CustomizedFormFields
                  type="password"
                  name="oldPassword"
                  placeholder="Enter old password"
                  startLabelClass="input-label block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                  register={{
                    ...register("oldPassword", {
                      required: ValidationMessage.PASSWORD_REQUIRED,
                      pattern: {
                        value: regex.regPassword,
                        message: ValidationMessage.PASSWORD_VALID,
                      },
                      validate: (value) => whiteSpaceCheck(value),
                    }),
                  }}
                  setToggleEye={setOldPasswordToggleEye}
                  toggleEye={oldPasswordToggleEye}
                  inputType={"text"}
                  className={ProfileStyle.form_control}
                  errors={errors}
                  floatingLabel="Old password *"
                />
              </div>
              <div className={ProfileStyle.form_floating}>
                <CustomizedFormFields
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  startLabelClass="input-label block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                  register={{
                    ...register("newPassword", {
                      required: ValidationMessage.PASSWORD_REQUIRED,
                      pattern: {
                        value: regex.regPassword,
                        message: ValidationMessage.PASSWORD_VALID,
                      },
                      validate: (value) => whiteSpaceCheck(value),
                    }),
                  }}
                  setToggleEye={setNewPasswordToggleEye}
                  toggleEye={newPasswordToggleEye}
                  inputType={"text"}
                  className={ProfileStyle.form_control}
                  errors={errors}
                  floatingLabel="New password *"
                />
              </div>
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
                          watch("newPassword"),
                          value,
                          ValidationMessage.CONFIRM_PASSWORD_VALID
                        );
                      },
                    }),
                  }}
                  setToggleEye={setConfirmPasswordToggleEye}
                  toggleEye={confirmPasswordToggleEye}
                  inputType={"text"}
                  errors={errors}
                  className={ProfileStyle.form_control}
                  floatingLabel="Confirm password *"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
