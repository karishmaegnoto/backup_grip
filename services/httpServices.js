import { axiosInstance } from "../services/axiosInstance";

function apiGet(url, params = {}) {
  return axiosInstance.get(url, { params });
}

function apiPost(url, body, contentType = "application/json") {
  const isFormData = body instanceof FormData;

  const headers = isFormData
    ? {} // ------axios set Content-Type with boundary automatically
    : { "Content-Type": contentType };

  return axiosInstance.post(url, body, {
    headers,
  });
}

// export const apiPost = async (url, data, contentType = "application/json") => {
//   try {
//     console.log("apiPost calling:", url);
//     const response = await axios.post(url, data, {
//       headers: {
//         "Content-Type": contentType,
//       },
//     });
//     console.log(" apiPost success:", response);
//     return response;
//   } catch (error) {
//     console.error(" apiPost error:", error.response || error);
//     throw error;
//   }
// };

function apiPut(url, body, contentType = "application/json") {
  const headers = {
    "Content-Type": contentType,
  };

  return axiosInstance.put(url, body, {
    headers,
  });
}

function apiPatch(url, body) {
  return axiosInstance.patch(url, body);
}

function apiDelete(url) {
  return axiosInstance.delete(url);
}

export { apiPost, apiGet, apiPut, apiPatch, apiDelete };
