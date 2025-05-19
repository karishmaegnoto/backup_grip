/*eslint-disable @next/next/no-img-element*/
"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import SidebarStyle from "./Sidebar.module.scss";
import Link from "next/link";
import AuthContext from "@/hooks/context/AuthContext";
import { constantTypes } from "@/utils/constants/constant";
import { usePathname } from "next/navigation";
import SkeletonButton from "../shared/skeleton/buttonSkeleton";
import LogoutSpinner from "../shared/Loader/logout-spinner";
import devStyle from "@/styles/devStyle.module.scss";
import useToastContext from "@/hooks/useToastContext";
import LeadContext from "@/hooks/context/LeadContext";

const Sidebar = () => {
  const notification = useToastContext();
  let { unreadLeadCount, fetchUnreadLeadList } = useContext(LeadContext);
  let { organizationName } = useContext(AuthContext);

  const pathname = usePathname();
  let { sidebarToggle, user, userAllPermissions, userAllPermissionLoader } =
    useContext(AuthContext);

  let sidebarArray = [...constantTypes?.sidebarData];

  if (user && user?.role !== "superAdmin") {
    sidebarArray = sidebarArray.filter((item) => item?.name !== "Users");
  }
  if (user && user?.role !== "superAdmin") {
    sidebarArray = sidebarArray.filter((item) => item?.name !== "Permissions");
  }

  let filteredSidebarData = [...sidebarArray];

  if (
    user?.role !== "superAdmin" &&
    sidebarArray?.length > 0 &&
    userAllPermissions?.length > 0
  ) {
    filteredSidebarData = sidebarArray.filter((sidebarItem) => {
      const permissionItem = userAllPermissions.find(
        (perm) => perm.manager.toLowerCase() === sidebarItem.name.toLowerCase()
      );
      return permissionItem ? permissionItem.all !== false : true;
    });
  }

  const isActiveLink = (linkHref) => {
    const link = `/${organizationName}${linkHref}`;
    return pathname.startsWith(link);
  };

  useEffect(() => {
    fetchUnreadLeadList(notification);
  }, []);

  return (
    <div
      className={
        sidebarToggle === true
          ? `${SidebarStyle.crm_sidebar} ${SidebarStyle.sidebar_toggle}`
          : SidebarStyle.crm_sidebar
      }
    >
      <div className={SidebarStyle.Sidebar_top}>
        <div className={SidebarStyle.crm_logo}>
          <img src="/svg/vss-logo.svg" alt="No_Vss_Logo_Image" />
          <img
            src="/svg/vss-name-logo.svg"
            alt="No_VSS_Name_Logo_Image"
            className={SidebarStyle.hidelogo}
          />
        </div>
        <div className={SidebarStyle.sidebar_nav}>
          <ul>
            {filteredSidebarData &&
              filteredSidebarData?.length > 0 &&
              filteredSidebarData?.map((data) => {
                return (
                  <li key={data?.id}>
                    {userAllPermissionLoader ? (
                      <Link href="" style={{ cursor: "not-allowed" }}>
                        <LogoutSpinner />
                        <span>
                          <SkeletonButton height={15} width={100} />
                        </span>
                      </Link>
                    ) : (
                      <Link
                        className={
                          isActiveLink(data?.href)
                            ? SidebarStyle?.nav_active
                            : ""
                        }
                        prefetch={true}
                        href={
                          organizationName &&
                          `/${organizationName}${data?.href}`
                        }
                      >
                        {data?.svgs}
                        <span>{data?.name ?? ""}</span>
                        {data?.id == 2 && unreadLeadCount > 0 && (
                          <span className={devStyle?.read_counter}>
                            {unreadLeadCount}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
