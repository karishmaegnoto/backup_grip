import { pathObj } from "@/services/apiPath";
import { apiDelete, apiGet, apiPost, apiPut } from "@/services/httpServices";

const getManufacturerApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj.MANUFACTURER, data);

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
      error.message || "An error occurred while get the manufacturer"
    );
    console.error(error);
  }
};

const addAndUpdateManufacturer = async (
  requestPayload,
  details,
  notification,
  callback
) => {
  callback?.(true, true);
  try {
    let response;
    if (details?.modeType === "add") {
      response = await apiPost(pathObj.MANUFACTURER_ADD, requestPayload);
    } else {
      response = await apiPut(
        `${pathObj.MANUFACTURER_EDIT}/${details?.id}`,
        requestPayload
      );
    }

    const { success, message } = response?.data || {};

    if (success) {
      notification.success(message);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "add or update manufacturer failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while add or update manufacturer.";
    notification.error(errorMessage);
    console.error(error);
  }
};
const deleteManufacturerApi = async (id, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiDelete(`${pathObj.MANUFACTURER_DELETE}/${id}`);

    const { success, message } = response?.data || {};

    if (success) {
      setTimeout(() => {
        notification.success(message);
      }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "delete manufacturer failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while delete manufacturer.";
    notification.error(errorMessage);
    console.error(error);
  }
};

export { getManufacturerApi, addAndUpdateManufacturer, deleteManufacturerApi };
