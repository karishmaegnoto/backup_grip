import { pathObj } from "@/services/apiPath";
import { apiGet, apiPost } from "@/services/httpServices";

const handelRegisterCrm = async (formData, notification, callback) => {
  callback?.(true, true);
  try {
    const response = await apiPost(
      pathObj.REGISTER_CRM,
      formData,
      "multipart/form-data"
    );
    if (response?.data?.success) {
      notification.success(response?.data?.message);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(response.data.message);
      console.error("Something went wrong");
    }
  } catch (error) {
    callback?.(false, true);
    console.error(error);
  }
};

const forgetPasswordApi = async (data, notification, callback) => {
  callback?.(true, true);
  const payloadData = data;
  try {
    const response = await apiPost(pathObj.FORGOT_PASSWORD, payloadData);

    if (response?.data?.success) {
      notification.success(response?.data?.message);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(response?.data?.message);
      console.error("Something went wrong");
    }
  } catch (error) {
    callback?.(false, true);
    console.error(error);
  }
};

const resetPasswordApi = async (data, id, notification, callback) => {
  callback?.(true, true);
  const payloadData = data;
  try {
    const response = await apiPost(
      pathObj.RESET_PASSWORD + "/" + id,
      payloadData
    );
    if (response.data.success) {
      notification.success(response?.data?.message);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(response.data.message);
      console.error("Something went wrong");
    }
  } catch (error) {
    callback?.(false, true);
    console.error(error);
  }
};

const changePasswordApi = async (data, notification, callback) => {
  callback?.(true, true);
  try {
    const response = await apiPost(pathObj.CHANGE_PASSWORD, data);

    if (response?.data?.success) {
      notification.success(response.data.message);
      ["token", "refresh_token", "tab-type"].forEach((item) =>
        localStorage.removeItem(item)
      );
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(response?.data?.message || "Password change failed");
    }
  } catch (error) {
    callback?.(false, true);
    notification.error(
      error.message || "An error occurred while changing the password"
    );
    console.error(error);
  }
};
const getProfileApi = async (data, notification, callback) => {
  callback?.(true, true, {});

  try {
    const response = await apiGet(pathObj.GET_PROFILE);

    if (response?.data?.success) {
      setTimeout(() => {
        callback?.(false, false, response?.data?.results);
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
const getTimezoneApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    let response;

    if (!data?.timeZone) {
      response = await apiGet(
        pathObj.GET_TIME_ZONE + "?currentZone=" + data?.defaultZone
      );
    } else {
      response = await apiGet(pathObj.GET_TIME_ZONE);
    }

    if (response?.data?.success) {
      callback?.(false, false, response?.data?.results);
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

const updateProfileApi = async (formData, notification, callback) => {
  callback?.(true, true);
  try {
    const response = await apiPost(
      pathObj.UPDATE_PROFILE,
      formData,
      "multipart/form-data"
    );

    if (response?.data?.success) {
      notification.success(response.data.message);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(response?.data?.message || "Update Profile failed");
    }
  } catch (error) {
    callback?.(false, true);
    notification.error(
      error.message || "An error occurred while update profile the password"
    );
    console.error(error);
  }
};

export {
  handelRegisterCrm,
  forgetPasswordApi,
  resetPasswordApi,
  changePasswordApi,
  getProfileApi,
  getTimezoneApi,
  updateProfileApi,
};
