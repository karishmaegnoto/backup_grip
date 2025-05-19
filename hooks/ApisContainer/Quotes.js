import { pathObj } from "@/services/apiPath";
import { apiDelete, apiGet, apiPost, apiPut } from "@/services/httpServices";
import axios from "axios";

const getQuotesApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.QUOTES_LIST, data);

    if (response?.data?.success) {
      setTimeout(() => {
        callback?.(false, false, response?.data?.results);
      }, 1500);
    } else {
      callback?.(false, true, {});
      notification.error(response?.data?.message);
    }
  } catch (error) {
    callback?.(false, true, {});
    notification.error(
      error.message || "An error occurred while get the quotes"
    );
    console.error(error);
  }
};

const deleteQuoteApi = async (id, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiDelete(`${pathObj.DELETE_QUOTES}/${id}`);

    const { success, message } = response?.data || {};

    if (success) {
      setTimeout(() => {
        notification.success(message);
      }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "delete quote failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while delete quote.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const deleteMultiQuotesApi = async (data, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiPost(`${pathObj.DELETE_MULTI_QUOTES}`, data);
    const { success, message } = response?.data || {};
    if (success) {
      setTimeout(() => {
        notification.success(message);
      }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "delete multi quotes failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while delete multi quotes.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const addQuoteApi = async (formData, notification, callback) => {
  callback?.({ loading: true, error: false, newQuoteId: null, leadId: null });

  try {
    const response = await apiPost(pathObj.CRM_ADD_QUOTE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const newQuoteId = response?.data?.results[0]?._id;
    const leadId = response?.data?.results[0]?.leadId;

    if (newQuoteId && leadId) {
      const message = response?.data?.message || "Quote added successfully!";
      notification.success(message);
      callback?.({ loading: false, error: false, newQuoteId, leadId });
    } else {
      callback?.({
        loading: false,
        error: true,
        newQuoteId: null,
        leadId: null,
      });
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while adding the quote.";
    notification.error(errorMessage);
    callback?.({ loading: false, error: true, newQuoteId: null, leadId: null });
  }
};

const editQuoteApi = async (id, formData, notification, callback) => {
  callback?.({ loading: true, error: false });

  try {
    const response = await apiPut(`${pathObj.QUOTE_BY_ID}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response?.data?.success) {
      const message = response?.data?.message || "Quote updated successfully!";
      notification.success(message);
      callback?.({ loading: false, error: false });
    } else {
      callback?.({ loading: false, error: true });
      notification.error(response?.data?.message || "Failed to update quote.");
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while updating the quote.";
    notification.error(errorMessage);
    callback?.({ loading: false, error: true });
  }
};

const getQuoteDataByIdApi = async (id, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.QUOTE_BY_LEAD_ID + "/" + id);
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
      error.message || "An error occurred while get the quote by id api"
    );
  }
};

export const getQuoteDataByQuoteIdApi = async (id, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.QUOTE_BY_ID + "/" + id);
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
      error.message || "An error occurred while getting the quote by id api"
    );
  }
};

const generatePdfApi = async (quote, fileName, notification, callback) => {
  callback?.(true, true);
  try {
    const response = await apiPost(pathObj.GENERATE_PDF, { quote, fileName });

    if (response?.data?.success) {
      callback?.(false, false, response?.data);
    } else {
      callback?.(false, true, {});
      notification.error(response?.data?.message || "Failed to generate PDF");
    }
  } catch (error) {
    callback?.(false, true, {});
    notification.error(
      error.message || "An error occurred while generating the PDF"
    );
  }
};

export {
  getQuotesApi,
  deleteQuoteApi,
  deleteMultiQuotesApi,
  addQuoteApi,
  getQuoteDataByIdApi,
  generatePdfApi,
  editQuoteApi,
};
