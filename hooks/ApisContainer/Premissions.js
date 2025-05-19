import { pathObj } from "@/services/apiPath";
import { apiDelete, apiGet, apiPost, apiPut } from "@/services/httpServices";

const getPermissionsApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj.PERMISSION_LIST, data);

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
      error.message || "An error occurred while get the permission"
    );
    console.error(error);
  }
};
const getPermissionsByManagerApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj.PERMISSION_BY_MANAGER, data);

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
      error.message || "An error occurred while get the permission by manager"
    );
    console.error(error);
  }
};

const updatePermissionsApi = async (requestPayload, notification, callback) => {
  callback?.(true, true, {});
  try {
    let response = await apiPut(`${pathObj.PERMISSION_EDIT}`, requestPayload);

    const { success, message } = response?.data || {};

    if (success) {
      notification.success(message);
      callback?.(false, false, response?.data?.results);
    } else {
      callback?.(false, true, {});
      notification.error(message || "update permissions failed.");
    }
  } catch (error) {
    callback?.(false, true, {});
    const errorMessage =
      error.message || "An error occurred while update permissions.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const getAllPermissionsApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj.ALL_PERMISSION_LIST, data);

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
      error.message || "An error occurred while get the all permission"
    );
    console.error(error);
  }
};

export {
  getPermissionsApi,
  updatePermissionsApi,
  getPermissionsByManagerApi,
  getAllPermissionsApi,
};
