"use client";
import React, { createContext, useState, useMemo, useEffect } from "react";
import useToastContext from "../useToastContext";
import { jwtDecode } from "jwt-decode";
import { pathObj } from "@/services/apiPath";
import { apiPost, apiPut } from "@/services/httpServices";
import { useRouter } from "next/navigation";
import { useTimer } from "../use-time";
import { encryptData, getCommaSeparatedLowerCaseNames } from "@/helper/helper";
import {
  getAllPermissionsApi,
  getPermissionsApi,
  getPermissionsByManagerApi,
} from "../ApisContainer/Premissions";
import { constantTypes } from "@/utils/constants/constant";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
export const AuthProvider = ({ children }) => {
  const notification = useToastContext();
  const router = useRouter();
  const [seconds, startTimer, reset] = useTimer(30);

  //*****  ALL STATE *********//
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [visibleResendOtp, setVisibleResendOtp] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [permissions, setPermissions] = useState({
    add: true,
    edit: true,
    view: true,
    delete: true,
    massTransfer: true,
    share: true,
    all: true,
  });
  const [permissionLoader, setPermissionLoader] = useState(false);
  const [userAllPermissions, setUserAllPermissions] = useState([]);
  const [userAllPermissionLoader, setAllPermissionLoader] = useState(false);

  //**** CALL ON PAGE RENDER ******/

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== null) {
        setToken(token ?? null);
        const userDetails = jwtDecode(token);
        if (userDetails) {
          const orgName = userDetails?.businessName?.replace(/\s+/g, "-");
          setOrganizationName(orgName);
          setUser(userDetails);
        }
      } else {
        setToken(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user.role && user.role !== "superAdmin") {
      fetchAllUserPermissionsList(user.role);
    }
  }, [user.role]);

  const sendOtp = async (data, type) => {
    type !== "resend" && setLoading(true);
    try {
      const payloadData = data;
      startTimer();
      const response = await apiPost(pathObj.SEND_OTP, payloadData);
      if (response?.data?.success) {
        if (type !== "resend") {
          handleSetCheckData(data);
          router.push("/verify-otp");
        }
        setLoading(false);
        type == "resend"
          ? notification?.success(response?.data?.message)
          : setTimeout(() => {
              notification?.success(response?.data?.message);
            }, 500);
      } else {
        setLoading(false);
        notification?.error(response?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      notification?.error(error.message);
      console.error("Error in sendOtp:", error);
    }
  };

  const handleSetCheckData = (data) => {
    let loginDetails;
    if (data?.email && data?.password && data?.businessName) {
      loginDetails = {
        email: encryptData(data?.email),
        password: encryptData(data?.password),
        businessName: encryptData(data?.businessName),
      };
    } else {
      loginDetails = {
        email: encryptData(data?.email),
        password: encryptData(data?.password),
      };
    }

    if (typeof window !== "undefined" && Object.keys(loginDetails).length > 0) {
      localStorage.setItem("Check-data", JSON.stringify(loginDetails));
    }
  };

  let verifyAndLogin = async (data) => {
    try {
      setLoading(true);
      const response = await apiPost(pathObj.VERIFY_AND_LOGIN, data);

      if (!response?.data?.success) {
        notification?.error(response?.data?.message || "Login failed");
        setLoading(false);
        return;
      }

      const {
        token: localToken,
        refresh_token,
        businessName,
      } = response?.data?.results || {};

      if (!localToken) {
        notification?.error("Invalid token received");
        setLoading(false);
        return;
      }

      const userDetails = jwtDecode(localToken);
      if (!userDetails) {
        notification?.error("Failed to decode user information");
        setLoading(false);
        return;
      }

      if (userDetails?.businessName) {
        const orgName = userDetails?.businessName?.replace(/\s+/g, "-") || "";
        setUser(userDetails);
        setOrganizationName(orgName);

        localStorage.setItem("token", localToken);
        localStorage.setItem("refresh_token", refresh_token);
        const businessNameFormat = businessName?.replace(/\s+/g, "-") || "";
        // localStorage.setItem("org_name", encryptData(businessNameFormat));
        localStorage.setItem("org_name", businessNameFormat);

        router.push(`/${orgName}/dashboard`);
        setTimeout(() => {
          notification?.success(response?.data?.message);
          setLoading(false);
        }, 1500);
      } else {
        notification.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error during login:", error);
      notification?.error(error?.data?.message);
      setLoading(false);
    }
  };

  let logoutApi = async () => {
    setLoading(true);
    try {
      const response = await apiPut(pathObj.LOGOUT, {});

      if (response?.data?.success) {
        notification?.success(response?.data?.message);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("tab-type");
        setOrganizationName("");
        setUser({});
        setLoading(false);
        router.push("/login");
      } else {
        setLoading(false);
        notification?.error(response?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Logout Error");
      notification?.error(error.data.message);
      x;
    }
  };

  const fetchAllUserPermissionsList = (userRole) => {
    const requestPayload = {
      role: userRole,
    };

    getAllPermissionsApi(
      requestPayload,
      notification,
      (loading, error, res) => {
        setAllPermissionLoader(loading);
        if (!error) {
          const fetchedPermissions = res?.permission ? res?.permission : [];
          setUserAllPermissions(fetchedPermissions);
        }
      }
    );
  };

  const fetchUserPermission = (userRole, userManager) => {
    const requestPayload = { role: userRole, manager: userManager };
    getPermissionsByManagerApi(
      requestPayload,
      notification,
      (loading, error, res) => {
        setPermissionLoader(loading);
        if (!error) {
          // setPermissions(res?.permission ? res?.permission[0] : {});
          setPermissions(
            res?.permission
              ? res?.permission[0]
              : {
                  add: true,
                  edit: true,
                  view: true,
                  delete: true,
                  massTransfer: true,
                  share: true,
                  all: true,
                }
          );
        }
      }
    );
  };

  let contextData = useMemo(() => ({
    // registerUser,
    sendOtp,
    verifyAndLogin,
    user,
    loading,
    token,
    setSidebarToggle,
    sidebarToggle,
    seconds,
    startTimer,
    reset,
    visibleResendOtp,
    setVisibleResendOtp,
    logoutApi,
    organizationName,
    fetchUserPermission,
    permissions,
    permissionLoader,
    userAllPermissions,
    userAllPermissionLoader,
  }));

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
