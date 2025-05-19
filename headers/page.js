/*eslint-disable @next/next/no-img-element*/
"use client";
import React, { useContext, useEffect } from "react";
import HeaderStyle from "./headers.module.scss";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "@/hooks/context/AuthContext";
import LogoutSpinner from "../shared/Loader/logout-spinner";
import { getProfileApi } from "@/hooks/ApisContainer/Auth";
import useToastContext from "@/hooks/useToastContext";
import { usePathname } from "next/navigation";
import { matchPathName } from "@/helper/helper";

const Header = () => {
  const notification = useToastContext();
  let pathname = usePathname();
  let pathArray = pathname.split("/");
  let pageObj = matchPathName(pathname);
  let {
    setSidebarToggle,
    sidebarToggle,
    logoutApi,
    loading,
    user,
    organizationName,
  } = useContext(AuthContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    getProfileApi({}, notification, (loading, error, res) => {});
  };

  return (
    <div className={HeaderStyle.crm_header}>
      <div className={HeaderStyle.crm_header_left}>
        <button
          className={HeaderStyle.side_panel_action}
          onClick={() => setSidebarToggle(!sidebarToggle)}
        >
          <img src="/svg/hamburger-menu.svg" alt="No_Hamburger_Image" />
        </button>
        <div className={HeaderStyle.breadcrumb}>{pageObj?.name || ""}</div>
      </div>
      <div className={HeaderStyle.crm_header_right}>
        <div className={HeaderStyle.crm_header_action}>
          <img src="/svg/search.svg" alt="No_Search_Image" />
          <img src="/svg/chat.svg" alt="No_Chat_Image" />
          <img src="/svg/hard-refresh.svg" alt="No_Heard_refresh_Image" />
          <img src="/svg/notification.svg" alt="No_Notification_Image" />
        </div>
        <div className={HeaderStyle.user_profile_div}>
          <Image
            className={HeaderStyle.user_profile_image}
            src="/images/user.png"
            alt="Description of the image"
            width={40}
            height={40}
            priority
          />
          <ul className={HeaderStyle.user_profile_menu}>
            <li>
              <Link
                href={`/${organizationName}/profile`}
                className={pathArray[2] === "profile" ? HeaderStyle.active : ""}
                prefetch={true}
              >
                <img src="/svg/profile.svg" alt="No_Profile_Image" />

                <span>Profile</span>
              </Link>
            </li>
            {user && user?.role === "superAdmin" && (
              <li>
                <Link
                  href={`/${organizationName}/change-password`}
                  className={
                    pathArray[2] == "change-password" ? HeaderStyle.active : ""
                  }
                  prefetch={true}
                >
                  <img
                    src="/svg/change-password.svg"
                    alt="No_Change_Password_Image"
                  />
                  <span>Change password</span>
                </Link>
              </li>
            )}
            {/* <li>
              <Link href="" prefetch={true}>
                <img src="/svg/setting.svg" alt="No_Setting_Image" />

                <span>Setting</span>
              </Link>
            </li> */}
            <li>
              <Link
                href=""
                onClick={() => {
                  if (!loading) {
                    logoutApi();
                  }
                }}
              >
                {!loading ? (
                  <img src="/svg/logout.svg" alt="No_Logout_Image" />
                ) : (
                  <LogoutSpinner />
                )}
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
