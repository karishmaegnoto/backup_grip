import { pathObj } from "@/services/apiPath";
import { apiDelete, apiGet, apiPost, apiPut } from "@/services/httpServices";

const getLeadApi = async (data, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.LEAD, data);

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
    notification.error(error.message || "An error occurred while get the lead");
    console.error(error);
  }
};
const getLeadAllListApi = async (notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.LEAD_ALL_LIST);
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
      error.message || "An error occurred while get the lead all list"
    );
    console.error(error);
  }
};

const getStateByZipApi = async (requestPayload, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiPost(pathObj?.STATE_BY_ZIP, requestPayload);
    if (response?.data?.success) {
      setTimeout(() => {
        callback?.(false, false, response?.data?.results);
      }, 2000);
    } else {
      callback?.(false, true, {});
      // notification.error(response?.data?.message);
    }
  } catch (error) {
    callback?.(false, true, {});
    notification.error(
      error.message || "An error occurred while get the state by zip all list"
    );
    console.error(error);
  }
};

// const addLeadApi = async (formData, notification, callback) => {
//   callback?.(true, true);
//   try {
//     let response = await apiPost(
//       pathObj.CRM_ADD_LEAD,
//       formData,
//       "multipart/form-data"
//     );

//     const { success, message } = response?.data || {};

//     if (success) {
//       notification.success(message);
//       callback?.(false, false);
//     } else {
//       callback?.(false, true);
//       notification.error(message || "Add lead failed");
//     }
//   } catch (error) {
//     callback?.(false, true);
//     const errorMessage = error.message || "An error occurred while add lead.";
//     notification.error(errorMessage);
//     console.error(error);
//   }
// };

const addLeadApi = async (formData, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiPost(
      pathObj.CRM_ADD_LEAD,
      formData,
      "multipart/form-data"
    );

    console.log("addLeadApi response:", response);

    const newLeadId = response?.data?._id;

    console.log("addLeadApi values :", newLeadId);

    if (newLeadId) {
      // notification.success(message); // message is undefined, so skip notification
      callback?.(false, false, newLeadId); //  Pass the new lead ID
    } else {
      console.error("Add lead failed response data:", response?.data);
      callback?.(false, true);
      notification.error("Add lead failed");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage = error.message || "An error occurred while add lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const deleteLeadApi = async (id, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiDelete(`${pathObj.DELETE_LEAD}/${id}`);

    const { success, message } = response?.data || {};

    if (success) {
      setTimeout(() => {
        notification.success(message);
      }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "delete lead failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while delete lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const deleteMultiLeadApi = async (data, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiPost(`${pathObj.DELETE_MULTI_LEAD}`, data);

    const { success, message } = response?.data || {};

    if (success) {
      setTimeout(() => {
        notification.success(message);
      }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "delete multi lead failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while delete multi lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const shareLeadWithLeadOwnersApi = async (
  data,
  notification,
  type,
  callback
) => {
  callback?.(true, true);
  try {
    let response;
    if (type == "all") {
      response = await apiPost(`${pathObj.SHARE_ALL_LEAD}`, data);
    } else {
      response = await apiPost(`${pathObj.SHARE_LEAD}`, data);
    }

    const { success, message } = response?.data || {};

    if (success) {
      setTimeout(() => {
        notification.success(message);
      }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "share lead failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage = error.message || "An error occurred while share lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const massTransferMultiLeadApi = async (data, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiPost(`${pathObj.MASS_TRANSFER_MULTI_LEAD}`, data);

    const { success, message } = response?.data || {};

    if (success) {
      setTimeout(() => {
        notification.success(message);
      }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "mass transfer multi lead failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while mass transfer multi lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const getLeadDataByIdApi = async (id, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.LEAD_BY_ID + "/" + id);
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
      error.message || "An error occurred while get the lead by id api"
    );
    console.error(error);
  }
};

const editLeadApi = async (formData, leadId, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiPut(
      pathObj.CRM_EDIT_LEAD + "/" + leadId,
      formData,
      "multipart/form-data"
    );

    const { success, message } = response?.data || {};

    if (success) {
      notification.success(message);
      callback?.(false, false);
    } else {
      callback?.(false, true);

      notification.error(message || "edit lead failed");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage = error.message || "An error occurred while edit lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const getMergedLeadByLeadIdApi = async (id, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.MERGED_LEADS + "/" + id);
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
      error.message || "An error occurred while get the merge lead by id api"
    );
    console.error(error);
  }
};

const deleteLeadAttachmentApi = async (
  id,
  attachmentName,
  notification,
  callback
) => {
  callback?.(true, true);
  try {
    let response = await apiDelete(
      `${pathObj.DELETE_LEAD_ATTACHMENT}/${id}?attachmentUrl=${attachmentName}`
    );

    const { success, message } = response?.data || {};

    if (success) {
      // setTimeout(() => {
      //   notification.success(message);
      // }, 2000);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "delete lead attachment failed.");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message || "An error occurred while delete attachment lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const editLeadRenderApi = async (formData, leadId, notification, callback) => {
  callback?.(true, true);
  try {
    let response = await apiPut(
      pathObj.CRM_EDIT_LEAD + "/" + leadId,
      formData,
      "multipart/form-data"
    );

    console.log("Calling edit API with leadId:", leadId);

    const { success, message } = response?.data || {};

    if (success) {
      // notification.success(message);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "edit lead failed");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage = error.message || "An error occurred while edit lead.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const addEditInternalNotes = async (
  payloadData,
  leadId,
  notification,
  callback
) => {
  callback?.(true, true);
  try {
    let response = await apiPut(
      pathObj.INTERNAL_NOTES + "/" + leadId,
      payloadData
    );

    const { success, message } = response?.data || {};

    if (success) {
      // notification.success(message);
      callback?.(false, false);
    } else {
      callback?.(false, true);
      notification.error(message || "add and edit lead internal notes failed");
    }
  } catch (error) {
    callback?.(false, true);
    const errorMessage =
      error.message ||
      "An error occurred while lead add and edit internal notes.";
    notification.error(errorMessage);
    console.error(error);
  }
};

const getInternalNotesApi = async (requestPayload, notification, callback) => {
  callback?.(true, true, {});
  const payload = { sortBy: requestPayload?.sortBy };
  try {
    const response = await apiGet(
      pathObj?.GET_INTERNAL_NOTES + "/" + requestPayload?.leadId,
      payload
    );
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
      error.message ||
        "An error occurred while get the lead internal notes by id api"
    );
    console.error(error);
  }
};

const getUnReadLeadCountApi = async (notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.UN_READ_LEAD_COUNT);

    if (response?.data?.success) {
      callback?.(false, false, response?.data?.results);
    } else {
      callback?.(false, true, {});
      notification.error(response?.data?.message);
    }
  } catch (error) {
    callback?.(false, true, {});
    notification.error(
      error.message || "An error occurred while get the unread lead count"
    );
    console.error(error);
  }
};

const addLeadTimeLineApi = async (requestPayload, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiPost(pathObj?.ADD_LEAD_TIMELINE, requestPayload);
    if (response?.data?.success) {
      setTimeout(() => {
        callback?.(false, false, response?.data?.results);
      }, 2000);
    } else {
      callback?.(false, true, {});
    }
  } catch (error) {
    callback?.(false, true, {});
    notification.error(
      error.message || "An error occurred while add lead timeline"
    );
    console.error(error);
  }
};

const getLeadTimeLineApi = async (leadId, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.GET_LEAD_TIMELINE + "/" + leadId);

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
      error.message || "An error occurred while get the lead timeline"
    );
    console.error(error);
  }
};

const getDuplicateLeadApi = async (leadId, notification, callback) => {
  callback?.(true, true, {});
  try {
    const response = await apiGet(pathObj?.DUPLICATE_LEAD_LIST + "/" + leadId);

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
      error.message || "An error occurred while get the duplicate lead timeline"
    );
    console.error(error);
  }
};

export {
  getLeadApi,
  getLeadAllListApi,
  getStateByZipApi,
  addLeadApi,
  deleteLeadApi,
  deleteMultiLeadApi,
  shareLeadWithLeadOwnersApi,
  massTransferMultiLeadApi,
  getLeadDataByIdApi,
  editLeadApi,
  getMergedLeadByLeadIdApi,
  deleteLeadAttachmentApi,
  editLeadRenderApi,
  addEditInternalNotes,
  getInternalNotesApi,
  getUnReadLeadCountApi,
  addLeadTimeLineApi,
  getLeadTimeLineApi,
  getDuplicateLeadApi,
};
