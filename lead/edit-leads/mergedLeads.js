import React, { useContext, useEffect, useState } from "react";
import styles from "@/app/[slug]/leads/edit-lead/[id]/editLead.module.scss";
import EmailSvg from "@/assets/svgs/emailSvg";
import MobileSvg from "@/assets/svgs/mobileSvg";
import { getMergedLeadByLeadIdApi } from "@/hooks/ApisContainer/Lead";
import useToastContext from "@/hooks/useToastContext";
import SkeletonButton from "@/components/shared/skeleton/buttonSkeleton";
import moment from "moment";
import AuthContext from "@/hooks/context/AuthContext";
import { useRouter } from "next/navigation";
import devStyle from "@/styles/devStyle.module.scss";
import LeadContext from "@/hooks/context/LeadContext";

const MergedLeads = ({
  editLeadData,
  leadId,
  toggleVisibleDeleteModal,
  hitMerge,
  setMergeLeadListDetails,
  setVisibleQuoteSkeleton,
}) => {
  const notification = useToastContext();
  const router = useRouter();
  let { organizationName } = useContext(AuthContext);
  let { leadStatusDetails, leadSourceDetails } = useContext(LeadContext);

  // ALL STATE
  const [mergedLeadList, setMergedLeadList] = useState([]);
  const [mergeLeadLoader, setMergeLeadLoader] = useState(false);

  useEffect(() => {
    if (leadId) {
      fetchMergeLeads();
    }
  }, [leadId, hitMerge]);

  const fetchMergeLeads = () => {
    getMergedLeadByLeadIdApi(leadId, notification, (loading, error, res) => {
      setMergeLeadLoader(loading);
      setVisibleQuoteSkeleton(loading);
      if (!error) {
        if (res) {
          // Sort so that current lead is first
          res?.sort((a, b) => {
            if (a._id === leadId) return -1;
            if (b._id === leadId) return 1;
            return 0;
          });

          // Filter to show only the most recent lead and duplicates by email or mobile
          const currentLead = res.find((lead) => lead._id === leadId);
          if (currentLead) {
            // Find the most recent lead by createdAt
            const mostRecentLead = res.reduce((latest, lead) => {
              return new Date(lead.createdAt) > new Date(latest.createdAt)
                ? lead
                : latest;
            }, res[0]);

            // Filter leads that have same email or mobile as currentLead and are not deleted
            const filteredLeads = res.filter((lead) => {
              if (lead.deleted) return false; // Exclude deleted leads
              if (lead._id === mostRecentLead._id) return true;
              if (
                (lead.email &&
                  currentLead.email &&
                  lead.email === currentLead.email) ||
                (lead.mobile &&
                  currentLead.mobile &&
                  lead.mobile === currentLead.mobile)
              ) {
                return true;
              }
              return false;
            });

            setMergedLeadList(filteredLeads);
            setMergeLeadListDetails(filteredLeads);
          } else {
            setMergedLeadList(res ? res : []);
            setMergeLeadListDetails(res ? res : []);
          }
        }
      }
    });
  };

  const formateCreateDate = (createdAt) => {
    const formattedDate = moment(createdAt).format("ddd, DD MMM YYYY, hh:mm A");
    return formattedDate;
  };

  const handleClickOnMergeList = (data) => {
    router.push(`/${organizationName}/leads/edit-lead/${data?._id}`);
  };

  const getTitleByData = (id, data) => {
    const item = data?.find((el) => el?.id == id);
    return item ? item.title : "-";
  };

  return (
    <div className={styles.marge_leads}>
      <div className={styles.mail_box_lead}>
        {editLeadData?.email ? (
          <div className={styles.lead_box_list}>
            <EmailSvg />
            <span className="">Email</span>
            <p>{editLeadData?.email ?? "-"}</p>
          </div>
        ) : (
          <div className={styles.lead_box_list}>
            <MobileSvg />
            <span className="">Mobile no.</span>
            <p>
              {editLeadData?.mobile
                ? `+${editLeadData?.countryCode} ${editLeadData?.mobile}`
                : "-"}
            </p>
          </div>
        )}

        {mergeLeadLoader ? (
          <ul>
            {Array(3)
              .fill("")
              .map((_, index) => {
                return (
                  <li key={index}>
                    <div className={styles.leadstatus_fill}>
                      <SkeletonButton height={20} width={80} />
                    </div>
                    <span>
                      <SkeletonButton height={10} width={120} />
                    </span>
                    <h3>
                      <SkeletonButton height={25} width={150} />
                    </h3>
                    <span>
                      <SkeletonButton height={10} width={200} />
                    </span>
                  </li>
                );
              })}
          </ul>
        ) : (
          <ul>
            {mergedLeadList &&
              mergedLeadList?.length > 0 &&
              mergedLeadList.map((item) => {
                return (
                  <li
                    className={
                      item?._id === leadId
                        ? `${styles.active} ${devStyle?.lead_merge_container}`
                        : `${devStyle?.lead_merge_container}`
                    }
                    key={item?._id}
                    onClick={() => handleClickOnMergeList(item)}
                  >
                    <div className={styles.leadstatus_fill}>
                      {/* {item?.leadStatus?.name ?? "-"} */}
                      {item?.leadStatus &&
                        getTitleByData(
                          item?.leadStatus?._id
                            ? item?.leadStatus?._id
                            : item?.leadStatus,
                          leadStatusDetails
                        )}
                    </div>
                    {item?._id !== leadId && (
                      <div
                        className={devStyle.lead_merge_delete_icon}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVisibleDeleteModal(item);
                        }}
                      >
                        <img src="/svg/delete-icon.svg" alt="No_Save_Image" />
                      </div>
                    )}
                    <span>
                      {item?.leadSource &&
                        getTitleByData(
                          item?.leadSource?._id
                            ? item?.leadSource?._id
                            : item?.leadSource,
                          leadSourceDetails
                        )}
                    </span>
                    <h3>{`${item?.firstName} ${item?.lastName}`}</h3>
                    <p>
                      {item?.createdAt && formateCreateDate(item?.createdAt)}
                    </p>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MergedLeads;
