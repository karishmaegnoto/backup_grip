"use client";
import React, { useEffect, useState } from "react";
import PermissionStyle from "./permission.module.scss";
import LeadStyle from "@/app/[slug]/leads/lead.module.scss";
import { Accordion } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DashSvg from "@/assets/svgs/dashSvg";
import useToastContext from "@/hooks/useToastContext";
import { constantTypes } from "@/utils/constants/constant";
import {
  getPermissionsApi,
  updatePermissionsApi,
} from "@/hooks/ApisContainer/Premissions";
import {
  capitalizeFirstLetter,
  getCommaSeparatedLowerCaseNames,
} from "@/helper/helper";
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import Loader from "@/components/shared/Loader/Loader";
import devStyle from "@/styles/devStyle.module.scss";
import NoDataFound from "@/components/shared/Loader/NoDataAnimation";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";

const Permission = () => {
  const notification = useToastContext();

  // ALL STATE
  const [permissionsUser, setPermissionUser] = useState([]);
  const [activePermissionUser, setActivePermissionUser] = useState({});
  const [permissionList, setPermissionList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activePermission, setActivePermission] = useState("");
  const [updatePermissionLoader, setUpdatePermissionLoader] = useState(false);
  const [defaultPermissionList, setDefaultPermissionList] = useState([]);

  useEffect(() => {
    setPermissionUser(constantTypes?.permissionsRoles);
    setActivePermissionUser(constantTypes?.permissionsRoles[0]);

    const excludeNames = ["Users", "Permissions"];
    const commaSeparatedString = getCommaSeparatedLowerCaseNames(
      constantTypes.sidebarData,
      excludeNames
    );
    const requestPayload = {
      role: constantTypes?.permissionsRoles[0]?.slug,
      manager: commaSeparatedString,
    };
    fetchPermissionList(requestPayload, "first");
  }, [constantTypes?.sidebarData, constantTypes?.permissionsRoles]);

  const fetchPermissionList = (data, type) => {
    getPermissionsApi(data, notification, (loading, error, res) => {
      setLoader(loading);
      if (!error) {
        const fetchedPermissions = res[0]?.permission ? res[0]?.permission : [];
        setPermissionList(fetchedPermissions);
        setDefaultPermissionList(fetchedPermissions);

        if (type === "first" && fetchedPermissions.length > 0) {
          setActivePermission(fetchedPermissions[0]?._id);
        }
      }
    });
  };

  const handleChangeUser = (item) => {
    if (!loader) {
      const excludeNames = ["Users", "Permissions"];
      const commaSeparatedString = getCommaSeparatedLowerCaseNames(
        constantTypes.sidebarData,
        excludeNames
      );
      setActivePermissionUser(item);
      const requestPayload = {
        role: item?.slug,
        manager: commaSeparatedString,
      };
      fetchPermissionList(requestPayload, "first");
    }
  };

  const handleChangePermission = (data) => {
    setActivePermission((prev) => (prev === data._id ? "" : data._id));
  };

  // const handlePermissionChange = (permissionId, property, checked) => {
  //   const updatedPermissions = permissionList.map((permission) => {
  //     if (permission._id === permissionId) {
  //       if (property === "all") {
  //         return {
  //           ...permission,
  //           all: checked,
  //           view: checked,
  //           edit: checked,
  //           delete: checked,
  //           add: checked,
  //         };
  //       } else {
  //         const updatedPermission = {
  //           ...permission,
  //           [property]: checked,
  //         };
  //         const allPermissionsEnabled =
  //           updatedPermission.view &&
  //           updatedPermission.edit &&
  //           updatedPermission.delete &&
  //           updatedPermission.add;

  //         return {
  //           ...updatedPermission,
  //           all: allPermissionsEnabled,
  //         };
  //       }
  //     }
  //     return permission;
  //   });

  //   setPermissionList(updatedPermissions);
  // };

  const handlePermissionChange = (permissionId, property, checked) => {
    const updatedPermissions = permissionList.map((permission) => {
      if (permission._id === permissionId) {
        if (property === "all") {
          return {
            ...permission,
            all: checked,
            view: checked,
            edit: checked,
            delete: checked,
            add: checked,
            massTransfer: checked,
            share: checked,
          };
        } else {
          const updatedPermission = {
            ...permission,
            [property]: checked,
          };

          let allPermissionsEnabled;
          if (property === "massTransfer" || property === "share") {
            allPermissionsEnabled =
              updatedPermission.view &&
              updatedPermission.edit &&
              updatedPermission.delete &&
              updatedPermission.add &&
              updatedPermission.massTransfer &&
              updatedPermission.share;
          } else {
            allPermissionsEnabled =
              updatedPermission.view &&
              updatedPermission.edit &&
              updatedPermission.delete &&
              updatedPermission.add;
          }

          return {
            ...updatedPermission,
            all: allPermissionsEnabled,
          };
        }
      }
      return permission;
    });

    setPermissionList(updatedPermissions);
  };

  const handleUpdatePermissions = () => {
    const requestPayload = {
      role: activePermissionUser?.slug,
      permission: permissionList,
    };
    updatePermissionsApi(
      requestPayload,
      notification,
      (loading, error, res) => {
        setUpdatePermissionLoader(loading);
        if (!error) {
          setPermissionList(res?.permission ? res?.permission : []);
        }
      }
    );
  };

  const handleCancel = () => {
    setPermissionList(defaultPermissionList);
  };

  console.log("permissionList", permissionList);

  return (
    <div className={LeadStyle.lead_main_div}>
      <div className={LeadStyle.lead_container}>
        <div className={LeadStyle.lead_navigation}>
          <ul>
            {permissionsUser?.map((item) => (
              <button
                key={item?.id}
                className={
                  activePermissionUser?.id === item?.id
                    ? `${LeadStyle.active} ${PermissionStyle?.user_Button}`
                    : PermissionStyle?.user_Button
                }
                style={loader ? { cursor: "not-allowed" } : {}}
                type="button"
                onClick={() => handleChangeUser(item)}
              >
                {item?.title}
              </button>
            ))}
          </ul>
        </div>
        {loader ? (
          <div className={devStyle?.page_lottie_loader}>
            <LottieLoader height={250} width={250} loader={true} />
          </div>
        ) : (
          <>
            {!loader && permissionList?.length === 0 ? (
              <div className={devStyle?.page_lottie_loader}>
                <NoDataFound
                  height={250}
                  width={250}
                  firstMessage={`Oops! no data found for permissions`}
                />
              </div>
            ) : (
              <div className={PermissionStyle.permission_field}>
                <form action="" className={LeadStyle.lead_main_form}>
                  <div className={ProfileStyle.common_div_top}>
                    <button
                      className={ProfileStyle.cancel_button}
                      onClick={() => handleCancel()}
                      type="button"
                    >
                      <img src="/svg/cancel.svg" alt="NO_Cancel_Image" />
                      <span>Cancel</span>
                    </button>
                    <button
                      className={ProfileStyle.save_button}
                      type="button"
                      onClick={() => handleUpdatePermissions()}
                      disabled={updatePermissionLoader}
                    >
                      {updatePermissionLoader ? (
                        <Loader height="20px" width="20px" newLoader={true} />
                      ) : (
                        <img src="/svg/save.svg" alt="No_Save_Image" />
                      )}
                      <span>Save</span>
                    </button>
                  </div>
                  <div className={PermissionStyle.permission_section_div}>
                    <div className={LeadStyle.lead_heading}>
                      <h2>Permission Details</h2>
                    </div>
                    <div className={PermissionStyle.permission_info_details}>
                      <div
                        className={PermissionStyle.permission_accordian_details}
                      >
                        <Accordion activeKey={activePermission} flush>
                          {permissionList?.length > 0 &&
                            permissionList?.map((permissions) => (
                              <Accordion.Item
                                eventKey={permissions._id}
                                key={permissions._id}
                              >
                                <Accordion.Header
                                  className={PermissionStyle?.accordion_button}
                                  onClick={() =>
                                    handleChangePermission(permissions)
                                  }
                                >
                                  {constantTypes?.sidebarData.map((el) => {
                                    if (
                                      el?.name?.toLocaleLowerCase() ===
                                      permissions?.manager
                                    ) {
                                      return el?.svgs;
                                    }
                                    return null;
                                  })}

                                  <span>
                                    {permissions?.manager &&
                                      capitalizeFirstLetter(
                                        permissions?.manager
                                      )}
                                  </span>
                                </Accordion.Header>
                                <Accordion.Body
                                  className={
                                    PermissionStyle?.accordion_main_body
                                  }
                                >
                                  <div
                                    className={PermissionStyle.accordion_body}
                                  >
                                    <h3>Partial Access</h3>
                                    <ul>
                                      {["view", "edit", "delete", "add"].map(
                                        (action) => (
                                          <li key={action}>
                                            <Form.Check
                                              type="switch"
                                              id={`${permissions._id}-${action}`}
                                              checked={permissions[action]}
                                              onChange={(e) =>
                                                handlePermissionChange(
                                                  permissions._id,
                                                  action,
                                                  e.target.checked
                                                )
                                              }
                                              label={
                                                <div
                                                  className={
                                                    PermissionStyle.accordion_label
                                                  }
                                                >
                                                  <label>
                                                    {capitalizeFirstLetter(
                                                      action
                                                    )}
                                                  </label>
                                                  <p>
                                                    Select the desired user role
                                                    to {action} the permissions.
                                                  </p>
                                                </div>
                                              }
                                            />
                                          </li>
                                        )
                                      )}
                                      {(permissions?.manager === "leads" ||
                                        permissions?.manager ===
                                          "customers") && (
                                        <>
                                          <li>
                                            <Form.Check
                                              type="switch"
                                              id={`${permissions._id}-mass-transfer`}
                                              checked={
                                                permissions?.massTransfer
                                              }
                                              onChange={(e) =>
                                                handlePermissionChange(
                                                  permissions._id,
                                                  "massTransfer",
                                                  e.target.checked
                                                )
                                              }
                                              label={
                                                <div
                                                  className={
                                                    PermissionStyle.accordion_label
                                                  }
                                                >
                                                  <label>Mass Transfer</label>
                                                  <p>
                                                    Select to allow mass
                                                    transfer of data.
                                                  </p>
                                                </div>
                                              }
                                            />
                                          </li>
                                          <li>
                                            <Form.Check
                                              type="switch"
                                              id={`${permissions._id}-share`}
                                              checked={permissions?.share}
                                              onChange={(e) =>
                                                handlePermissionChange(
                                                  permissions._id,
                                                  "share",
                                                  e.target.checked
                                                )
                                              }
                                              label={
                                                <div
                                                  className={
                                                    PermissionStyle.accordion_label
                                                  }
                                                >
                                                  <label>Share</label>
                                                  <p>
                                                    Select to allow sharing of
                                                    data.
                                                  </p>
                                                </div>
                                              }
                                            />
                                          </li>
                                        </>
                                      )}
                                    </ul>
                                    <h3>Full Access</h3>
                                    <ul>
                                      <li>
                                        <Form.Check
                                          type="switch"
                                          id={`${permissions._id}-all`}
                                          checked={permissions?.all}
                                          onChange={(e) =>
                                            handlePermissionChange(
                                              permissions._id,
                                              "all",
                                              e.target.checked
                                            )
                                          }
                                          label={
                                            <div
                                              className={
                                                PermissionStyle.accordion_label
                                              }
                                            >
                                              <label>Full Access</label>
                                              <p>
                                                Select the desired user role to
                                                view the permissions.
                                              </p>
                                            </div>
                                          }
                                        />
                                      </li>
                                    </ul>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            ))}
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Permission;
