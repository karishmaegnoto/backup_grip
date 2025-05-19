import React, { useEffect, useState } from "react";
import styles from "@/app/[slug]/leads/edit-lead/[id]/editLead.module.scss";
import LeadOwnerSvg from "@/assets/svgs/leadOwnerSvg";
import EmailSvg from "@/assets/svgs/emailSvg";
import MobileSvg from "@/assets/svgs/mobileSvg";
import ManufecturerSvg from "@/assets/svgs/manufecturerSvg";
import PhoneSvg from "@/assets/svgs/phoneSvg";
import LogoutSpinner from "@/components/shared/Loader/logout-spinner";
import SkeletonButton from "@/components/shared/skeleton/buttonSkeleton";

const EditHighlightedTop = ({
  editLeadData,
  emailValue,
  mobileValue,
  countryCode,
  addValues,
  leadManufacturerDetails,
  manufactureLoader,
}) => {
  return (
    <div className={styles.top_logsec}>
      <ul>
        {addValues?.leadOwner && (
          <li>
            <LeadOwnerSvg />
            <div className={styles.top_log_dtl}>
              <span>Lead Owner</span>
              <p>{addValues?.leadOwner?.title}</p>
            </div>
          </li>
        )}
        {emailValue && (
          <li>
            <EmailSvg />
            <div className={styles.top_log_dtl}>
              <span>Email</span>
              <p>{emailValue} </p>
            </div>
          </li>
        )}
        {mobileValue && (
          <li>
            <MobileSvg />
            <div className={styles.top_log_dtl}>
              <span>Mobile No</span>
              <p>{`${countryCode}-${mobileValue}`}</p>
            </div>
          </li>
        )}
      </ul>
      {editLeadData?.manufacture &&
        Object.keys(editLeadData?.manufacture)?.length > 0 && (
          <div className={styles.top_logsec_manufacture}>
            <ul>
              <li>
                <div className={styles.user_manufacture_view}>
                  <ManufecturerSvg />
                  <div className={styles.top_log_dtl}>
                    <span>Manufacturer</span>
                    {manufactureLoader ? (
                      <SkeletonButton height={15} width={100} percent={true} />
                    ) : (
                      <p>{editLeadData?.manufacture?.fullName}</p>
                    )}
                  </div>
                </div>
                <div className={styles.phone_lead_view}>
                  <PhoneSvg />
                  {manufactureLoader ? (
                    <SkeletonButton height={10} width={120} />
                  ) : (
                    <p>{`+${editLeadData?.manufacture?.countryCode}-${editLeadData?.manufacture?.phone}`}</p>
                  )}
                </div>
              </li>
            </ul>
          </div>
        )}
    </div>
  );
};

export default EditHighlightedTop;
