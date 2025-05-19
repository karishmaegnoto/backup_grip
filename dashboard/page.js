"use client";
import React from "react";
import styles from "./dashboard.module.scss";
import withAuth from "@/hooks/withAuth";
import SeoTags from "@/components/SeoContainer/seoTags";

const Dashboard = ({ params }) => {
  return (
    <div className={styles.dashboardContainer}>
      <SeoTags
        title="Your Grip CRM Dashboard"
        description="Welcome to your Grip CRM Dashboard! Get an overview of your customer relationships, track sales performance, and access key insights to enhance overall satisfaction. Discover features and tools designed to help you manage your business effectively. Schedule a demo for a guided tour!"
      />
      <h1 className={styles.title}>Dummy Dashboard</h1>
      {/* Statistics Cards */}
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h2>Leads</h2>
          <p>9,538</p>
        </div>
        <div className={styles.card}>
          <h2>Quote</h2>
          <p>242</p>
        </div>
        <div className={styles.card}>
          <h2>Contracts</h2>
          <p>82</p>
        </div>
        <div className={styles.card}>
          <h2>Customer</h2>
          <p>77</p>
        </div>
      </div>
      {/* Chart Section */}
      <div className={styles.chartContainer}>
        <h2>Performance Overview</h2>
        <div className={styles.chart}>
          {/* Placeholder for a chart */}
          <p>Chart goes here</p>
        </div>
      </div>
      {/* Recent Activities */}
      <div className={styles.activityContainer}>
        <h2>Recent Activities</h2>
        <ul className={styles.activityList}>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s,
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s,
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s,
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s,
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
