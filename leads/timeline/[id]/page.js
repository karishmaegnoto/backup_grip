"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./timeline.module.scss";
import editStyles from "@/app/[slug]/leads/edit-lead/[id]/editLead.module.scss";
import LeadContext from "@/hooks/context/LeadContext";
import AuthContext from "@/hooks/context/AuthContext";
import { getLeadTimeLineApi } from "@/hooks/ApisContainer/Lead";
import useToastContext from "@/hooks/useToastContext";
import TimelineEditSvg from "@/assets/svgs/timelineEditSvg";
import moment from "moment";
import LottieLoader from "@/components/shared/Loader/lottieLoader";

const LeadTimeline = ({ params }) => {
  const notification = useToastContext();
  let { activeTab, setActiveTab } = useContext(LeadContext);
  let { organizationName } = useContext(AuthContext);

  const { id: leadId } = params;

  // ALL STATE
  const [timelineData, setTimelineData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageType, setPageType] = useState("");

  useEffect(() => {
    fetchLeadTimeline();
    if (typeof window !== "undefined") {
      setPageType(localStorage.getItem("timeline-active-page"));
    }
  }, []);

  const fetchLeadTimeline = () => {
    getLeadTimeLineApi(leadId, notification, (loading, error, res) => {
      setLoader(loading);
      if (!error) {
        if (res) {
          setTimelineData(res ? res : []);
        }
      }
    });
  };

  return (
    <div className={styles.timeline_page}>
      {loader ? (
        <div className={editStyles.main_loader}>
          <LottieLoader height={250} width={250} loader={true} />
        </div>
      ) : (
        <>
          <div className={styles.timeline_header}>
            <div className={styles.pull_left}>
              <ul>
                <li className={activeTab == "outline" ? styles.active : ""}>
                  <Link
                    href={`/${organizationName}/leads/${pageType}/${leadId}`}
                    onClick={() => setActiveTab("outline")}
                    prefetch={true}
                  >
                    Overview
                  </Link>
                </li>
                <li className={activeTab == "timeline" ? styles.active : ""}>
                  <Link
                    href={`/${organizationName}/leads/timeline/${leadId}`}
                    onClick={() => setActiveTab("timeline")}
                    prefetch={true}
                  >
                    Timeline
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.timeline_sec}>
            <div className={styles.timeline_heading}>
              <h2>History</h2>
            </div>
            {timelineData &&
              timelineData?.length > 0 &&
              timelineData?.map((item, index) => {
                return (
                  <div className={styles.timeline_dtl} key={index}>
                    <div className={styles.cmn_timeline_date}>{item?.date}</div>
                    {item?.timeLineData &&
                      item?.timeLineData?.length > 0 &&
                      item?.timeLineData?.map((data) => {
                        return (
                          <div
                            className={styles.timeline_layout}
                            key={data?._id}
                          >
                            <div className={styles.date_timeline}>
                              {data?.formattedTime}
                            </div>
                            <div className={styles.icon_timeline}>
                              <div
                                className={`${styles.icon_timeline_thumbnail} ${styles.edit_icon}`}
                              >
                                <TimelineEditSvg />
                              </div>
                            </div>
                            <div className={styles.timeline_modify}>
                              <h6>{data?.details}</h6>
                              <p>
                                by {data?.user?.name}&nbsp;{" "}
                                {data?.formattedDate}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default LeadTimeline;
