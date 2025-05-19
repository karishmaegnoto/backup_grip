"use client";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  getLeadAllListApi,
  getUnReadLeadCountApi,
} from "../ApisContainer/Lead";
import { useRouter } from "next/navigation";

const LeadContext = createContext();

export function useAuth() {
  return useContext(LeadContext);
}

export default LeadContext;
export const LeadProvider = ({ children }) => {
  const router = useRouter();

  // ALL STATE
  const [leadOwnerDetails, setLeadOwnerDetails] = useState([]);
  const [leadSourceDetails, setLeadSourceDetails] = useState([]);
  const [leadStateDetails, setLeadStateDetails] = useState([]);
  const [leadManufacturerDetails, setLeadManufacturerDetails] = useState([]);
  const [leadStatusDetails, setLeadStatusDetails] = useState([]);
  const [leadWebFormDetails, setLeadWebFormDetails] = useState([]);
  const [leadAssistantDetails, setLeadAssistantDetails] = useState([]);
  const [allLeadDataLoader, setAllLeadDataLoader] = useState(false);
  const [unreadLeadLoader, setUnreadLeadLoader] = useState(false);
  const [unreadLeadCount, setUnreadLeadCount] = useState("");
  const [activeTab, setActiveTab] = useState("outline");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { pathname } = window.location;

    if (pathname.includes("timeline")) {
      setActiveTab("timeline");
    } else if (pathname.includes("view-lead")) {
      setActiveTab("outline");
    }
  }, [router]);

  const mapDetails = (dataArray, idField, titleField, type) => {
    return (
      dataArray?.map((el) => ({
        id: el[idField],
        value: el[idField],
        title: el[titleField],
        ...(type === "manufacturer" && {
          phone: el?.phone,
          countryCode: el?.countryCode,
        }),
      })) || []
    );
  };

  const leadAllList = (notification) => {
    getLeadAllListApi(notification, (loading, error, res) => {
      setAllLeadDataLoader(loading);
      if (!error) {
        if (res) {
          setLeadOwnerDetails(mapDetails(res?.leadOwners, "id", "name"));
          setLeadAssistantDetails(
            mapDetails(res?.leadAssistants, "id", "name")
          );
          setLeadSourceDetails(mapDetails(res?.leadSource, "_id", "name"));
          setLeadStateDetails(mapDetails(res?.leadState, "_id", "name"));
          setLeadManufacturerDetails(
            mapDetails(res?.manufacture, "_id", "fullName", "manufacturer")
          );
          setLeadStatusDetails(mapDetails(res?.leadStatus, "_id", "name"));
          setLeadWebFormDetails(mapDetails(res?.webForm, "id", "name"));
        }
      }
    });
  };

  const fetchUnreadLeadList = (notificationArg) => {
    getUnReadLeadCountApi(notificationArg, (loading, error, res) => {
      setUnreadLeadLoader(loading);
      if (!error) {
        if (res) {
          setUnreadLeadCount(res?.count ? res?.count : "");
        }
      }
    });
  };

  const contextData = useMemo(
    () => ({
      leadOwnerDetails,
      leadAssistantDetails,
      leadSourceDetails,
      leadStateDetails,
      leadManufacturerDetails,
      leadStatusDetails,
      leadWebFormDetails,
      allLeadDataLoader,
      leadAllList,
      unreadLeadCount,
      fetchUnreadLeadList,
      activeTab,
      setActiveTab,
    }),
    [
      leadOwnerDetails,
      leadAssistantDetails,
      leadSourceDetails,
      leadStateDetails,
      leadManufacturerDetails,
      leadStatusDetails,
      leadWebFormDetails,
      allLeadDataLoader,
      leadAllList,
      unreadLeadCount,
      fetchUnreadLeadList,
      activeTab,
      setActiveTab,
    ]
  );

  return (
    <LeadContext.Provider value={contextData}>{children}</LeadContext.Provider>
  );
};
