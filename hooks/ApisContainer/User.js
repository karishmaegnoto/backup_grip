import { pathObj } from "@/services/apiPath";
import { apiGet, apiPost, apiPut } from "@/services/httpServices";
import { set } from "react-hook-form";

const getUsersApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj.USERS, data);

    if (response?.data?.success) {
      setTimeout(() => {
        callback?.(false, false, response?.data?.results?.docs);
      }, 2000);
    } else {
      callback?.(false, true, {});
      notification.error(response?.data?.message);
    }
  } catch (error) {
    callback?.(false, true, {});
    notification.error(
      error.message || "An error occurred while get the profile"
    );
    console.error(error);
  }
};

const addAndUpdateUser = async (formData, userData, notification, callback) => {
  callback?.(true, true); // Start loading state
  try {
    let response;
    if (userData?.modeType === "add") {
      response = await apiPost(
        pathObj.ADD_USER,
        formData,
        "multipart/form-data"
      );
    } else {
      response = await apiPut(
        `${pathObj.EDIT_USER}/${userData?.id}`,
        formData,
        "multipart/form-data"
      );
    }

    const { success, message } = response?.data || {};

    if (success) {
      notification.success(message);
      callback?.(false, false); // Stop loading state
    } else {
      callback?.(false, true); // Error state
      notification.error(message || "Update Profile failed");
    }
  } catch (error) {
    callback?.(false, true); // Error state
    const errorMessage =
      error.message || "An error occurred while updating the profile.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const editUserApi = async (
  formData,
  userData,
  type,
  notification,
  callback
) => {
  callback?.(true, true);
  try {
    const response = await apiPut(
      `${pathObj.EDIT_USER}/${userData?.id}`,
      formData,
      "multipart/form-data"
    );

    const { success, message } = response?.data || {};

    if (success) {
      !type && notification.success(message);
      callback?.(false, false); // Stop loading state
    } else {
      callback?.(false, true); // Error state
      notification.error(message || "Update Profile failed");
    }
  } catch (error) {
    callback?.(false, true); // Error state
    const errorMessage =
      error.message || "An error occurred while updating the profile.";
    notification.error(errorMessage);
    console.error(error);
  }
};

export { getUsersApi, addAndUpdateUser, editUserApi };
