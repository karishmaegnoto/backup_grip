/*eslint-disable @next/next/no-img-element*/
import React from "react";
import UserStyle from "@/app/[slug]/user/user.module.scss";
import { constantTypes, ROLE_DISPLAY_NAMES } from "@/utils/constants/constant";
import NoDataFound from "../shared/Loader/NoDataAnimation";
import { removeUploadPath } from "@/helper/helper";
import { IMAGE_BASE_URL } from "@/services/path";

const UserLeftSection = ({
  toggleAddEditModal,
  userData,
  handleSelectActiveUser,
  activeUser,
  handleFilter,
  filterRoleSelected,
  loader,
}) => {
  return (
    <div className={UserStyle.user_list}>
      <div className={UserStyle.user_search}>
        <select onChange={(e) => handleFilter(e)} value={filterRoleSelected}>
          <option value="">Filter By All</option>
          {constantTypes?.profileRoles?.map((el) => {
            return (
              <option key={el?.id} value={el?.value}>
                {el?.title}
              </option>
            );
          })}
        </select>
        <button
          className={UserStyle.add_user_btn}
          onClick={() => toggleAddEditModal("add")}
        >
          <img src="/svg/add.svg" alt="No_Cancel_Image" />
          <span>Add User</span>
        </button>
      </div>

      {!loader && Object.keys(activeUser).length === 0 ? (
        <NoDataFound
          height={180}
          width={180}
          // firstMessage={`Oops! It looks like there are no ${ROLE_DISPLAY_NAMES[
          //   filterRoleSelected
          // ]?.toLocaleLowerCase()}`}
          // message={"users in the system."}
          className={UserStyle.user_list_listing}
        />
      ) : (
        <div className={UserStyle.user_list_listing}>
          <ul>
            {userData &&
              userData?.length > 0 &&
              userData?.map((item, index) => {
                const imageUrl = item?.profilePic
                  ? `${IMAGE_BASE_URL?.replace(/\/+$/, "")}/${removeUploadPath(
                      item?.profilePic
                    ).replace(/^\/+/, "")}`
                  : "/images/profile.png";
                return (
                  <li
                    className={
                      activeUser._id == item?._id
                        ? UserStyle.user_list_active
                        : ""
                    }
                    key={index}
                    onClick={() => handleSelectActiveUser(item)}
                  >
                    <span>
                      <img
                        className={`${UserStyle.user_profile_image} ${UserStyle?.profileImage}`}
                        src={imageUrl}
                        alt="No_PROFILE_IMAGE"
                        onError={(e) =>
                          (e.currentTarget.src = "/images/noImage.jpg")
                        }
                      />
                    </span>
                    <div className={UserStyle.user_listing_tab}>
                      <p className={UserStyle.user_listing_name}>
                        {item?.firstName} {item.lastName}
                      </p>
                      <p className={UserStyle.user_listing_role}>
                        {ROLE_DISPLAY_NAMES[item?.role] || ""}
                      </p>
                      <div className={UserStyle.profile_email}>
                        <div className="flex w-full">
                          <img src="/svg/email.svg" alt="No_Cancel_Image" />
                          <span className="ml-2">{item?.email}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserLeftSection;
