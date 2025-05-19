const LOGIN_PATH = "/login";

export const axiosError = (err) => {
  const { response, request, message } = err;
  console.error("response.status", response);
  if (response) {
    const errorMsg = response.data?.message || "Request Declined";
    console.error(errorMsg);

    if ([409, 401].includes(response.status)) {
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("tab-type");
        window.location.href = LOGIN_PATH;
      }, 200);
    }
    throw err;
  }

  if (request) {
    console.error(message || "No response received from server");
    throw err;
  }

  console.error(message || "An unknown error occurred");
  throw err;
};
