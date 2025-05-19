import CustomerSvg from "@/assets/svgs/customerSvg";
import DashboardSvg from "@/assets/svgs/dashboardSvg";
import InvoicesSvg from "@/assets/svgs/invoicesSvg";
import LeadSvg from "@/assets/svgs/leadSvg";
import ManufacturerSvg from "@/assets/svgs/manufacturerSvg";
import OrdersSvg from "@/assets/svgs/ordersSvg";
import PermissionsSvg from "@/assets/svgs/permissionsSvg";
import PriceBookSvg from "@/assets/svgs/priceBookSvg";
import QuotesSvg from "@/assets/svgs/quotesSvg";
import ReportsSvg from "@/assets/svgs/reportsSvg";
import TaskActivitySvg from "@/assets/svgs/taskActivitySvg";
import UsersSvg from "@/assets/svgs/usersSvg";

// let orgName = "";
// if (typeof window !== "undefined") {
//   const storedOrgName = localStorage.getItem("org_name");
//   if (storedOrgName) {
//     try {
//       orgName = storedOrgName;
//     } catch (error) {
//       console.error("Error decrypting org_name:", error);
//       orgName = "";
//     }
//   }
// }

export const constantTypes = {
  authPage: [
    "/login",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
    "/book-a-demo",
    "/",
    "/verify-card",
  ],
  tagColors: ["purple", "family", "local"],
  profileRoles: [
    { id: 1, value: "superAdmin", title: "Super Admin" },
    { id: 2, value: "admin", title: "Admin" },
    { id: 3, value: "manager", title: "Manager" },
    { id: 4, value: "leadOwner", title: "Lead Owner" },
    { id: 5, value: "leadOwnerAssist", title: "Lead Owner Assist" },
  ],
  profileStatus: [
    { id: 1, value: "active", title: "Active" },
    { id: 2, value: "inactive", title: "Inactive" },
  ],
  sidebarData: [
    {
      id: 1,
      name: "Dashboard",
      svgs: <DashboardSvg />,
      href: `/dashboard`,
    },
    {
      id: 2,
      name: "Leads",
      svgs: <LeadSvg />,
      href: `/leads`,
    },
    {
      id: 3,
      name: "Quotes",
      svgs: <QuotesSvg />,
      href: "/quotes",
    },
    {
      id: 4,
      name: "Customers",
      svgs: <CustomerSvg />,
      href: "/customers",
    },
    {
      id: 5,
      name: "Orders",
      svgs: <OrdersSvg />,
      href: "/orders",
    },
    {
      id: 6,
      name: "Tasks Activity",
      svgs: <TaskActivitySvg />,
      href: "/task-activity",
    },
    {
      id: 7,
      name: "Invoices",
      svgs: <InvoicesSvg />,
      href: "/invoices",
    },
    {
      id: 8,
      name: "Reports",
      svgs: <ReportsSvg />,
      href: "/reports",
    },
    {
      id: 9,
      name: "Price Books",
      svgs: <PriceBookSvg />,
      href: "/price-books",
    },
    {
      id: 10,
      name: "Users",
      svgs: <UsersSvg />,
      href: `/user`,
    },
    {
      id: 11,
      name: "Permissions",
      svgs: <PermissionsSvg />,
      href: `/permissions`,
    },
    {
      id: 12,
      name: "Manufacturer",
      svgs: <ManufacturerSvg />,
      href: `/manufacturer`,
    },
  ],
  permissionsRoles: [
    {
      id: 1,
      title: "Lead Owner Assist",
      slug: "leadOwnerAssist",
    },
    {
      id: 2,
      title: "Lead Owner",
      slug: "leadOwner",
    },
    {
      id: 3,
      title: "Manager",
      slug: "manager",
    },
    {
      id: 4,
      title: "Admin",
      slug: "admin",
    },
  ],
  leadDateFilterData: [
    { id: 1, value: "on", title: "On" },
    { id: 2, value: "before", title: "Before" },
    { id: 3, value: "after", title: "After" },
    { id: 4, value: "between", title: "Between" },
    { id: 5, value: "today", title: "Today" },
    { id: 6, value: "yesterday", title: "Yesterday" },
    { id: 7, value: "this_week", title: "This Week" },
    { id: 8, value: "last_week", title: "Last Week" },
    { id: 9, value: "this_month", title: "This Month" },
    { id: 10, value: "last_month", title: "Last Month" },
    { id: 11, value: "this_year", title: "This Year" },
    { id: 12, value: "last_year", title: "Last Year" },
  ],
  leadSidebarItems: [
    {
      id: 1,
      value: "lead_details",
      title: "Lead Details",
    },
    {
      id: 2,
      value: "address_information",
      title: "Address Information",
    },
    {
      id: 3,
      value: "product_information",
      title: "Product Information",
    },
    {
      id: 4,
      value: "building_information",
      title: "Building Information",
    },
    {
      id: 5,
      value: "all_quotes",
      title: "All Quotes",
    },
    {
      id: 6,
      value: "all_contracts",
      title: "All Contracts",
    },
    {
      id: 7,
      value: "task_activities",
      title: "Task/Activities",
    },
    {
      id: 8,
      value: "attachments",
      title: "Attachments",
    },
    {
      id: 9,
      value: "all_emails",
      title: "All Emails",
    },
    // {
    //   id: 8,
    //   value: "price_books",
    //   title: "Price Books",
    // },
  ],
  buildingType: [
    { id: 1, value: "garage", title: "Garage" },
    { id: 2, value: "carport", title: "Carport" },
    { id: 3, value: "barn", title: "Barn" },
  ],
  barnStyle: [
    { id: 1, value: "carolinaBarn", title: "Carolina Barn" },
    { id: 2, value: "horseBarn", title: "Horse Barn" },
    { id: 3, value: "senecaBarn", title: "Seneca Barn" },
  ],
  garageDoorOptionsSideEnd: [
    { id: 1, value: "Left Side", title: "Left Side" },
    { id: 2, value: "Right Side", title: "Right Side" },
    { id: 3, value: "Front End", title: "Front End" },
    { id: 4, value: "Back End", title: "Back End" },
  ],
  garageDoorOptionsSize: [
    { id: 1, value: "6x6", title: "6'x6'" },
    { id: 2, value: "8x8", title: "8'x8'" },
    { id: 3, value: "9x8", title: "9'x8'" },
    { id: 4, value: "10x8", title: "10'x8'" },
    { id: 5, value: "10x10", title: "10'x10'" },
    { id: 6, value: "12x12", title: "12'x12'" },
    { id: 7, value: "14x14", title: "14'x14'" },
    { id: 8, value: "16x16", title: "16'x16'" },
    { id: 9, value: "6x6frame", title: "6'x6' frame" },
    { id: 10, value: "8x8frame", title: "8'x8' frame" },
    { id: 11, value: "9x8frame", title: "9'x8' frame" },
    { id: 12, value: "10x8frame", title: "10'x8' frame" },
    { id: 13, value: "10x10frame", title: "10'x10' frame" },
    { id: 14, value: "12x12frame", title: "12'x12' frame" },
    { id: 15, value: "16x16frame", title: "16'x16' frame" },
  ],
  garageWalkInDoorOptionsSize: [
    { id: 1, value: "36x80", title: "36'x80'" },
    { id: 2, value: "36x80frame", title: "36'x80' frame" },
  ],
  garageWalkInDoorOptionsColor: [
    { id: 1, value: "With Window", title: "With Window" },
    { id: 2, value: "Without Window", title: "Without Window" },
  ],
  garageWindowOptionsSize: [
    { id: 1, value: "30x36", title: "30'x36'" },
    { id: 2, value: "30x36frame", title: "30'x36' frame" },
  ],
  barnCustomLeanToSideEnd: [
    { id: 1, value: "Left Side", title: "Left Side" },
    { id: 2, value: "Right Side", title: "Right Side" },
    { id: 3, value: "Front End", title: "Front End" },
    { id: 4, value: "Back End", title: "Back End" },
  ],
  barnWalkInCentralSize: [
    { id: 1, value: "36x80", title: "36'x80'" },
    { id: 2, value: "36x80frame", title: "36'x80' frame" },
  ],
  barnDoorOptionsCentralSize: [
    { id: 1, value: "36x80", title: "36'x80'" },
    { id: 2, value: "36x80frame", title: "36'x80' frame" },
  ],
  barnWindowCentralSize: [
    { id: 1, value: "30x36", title: "30'x36'" },
    { id: 2, value: "30x36frame", title: "30'x36' frame" },
  ],
};
export const ROLES = {
  superAdmin: "superAdmin",
  admin: "admin",
  manager: "manager",
  leadOwner: "leadOwner",
  leadOwnerAssist: "leadOwnerAssist",
};

export const ROLE_DISPLAY_NAMES = {
  [ROLES.superAdmin]: "Super Admin",
  [ROLES.admin]: "Admin",
  [ROLES.manager]: "Manager",
  [ROLES.leadOwner]: "Lead Owner",
  [ROLES.leadOwnerAssist]: "Lead Owner Assist",
};

export const defaultBarnOptions = {
  customLeanTo: [
    {
      id: 1,
      sideEnd: "Left Side",
      width: 0,
      height: 0,
      length: 0,
    },
  ],
  wallCentralBuilding: [
    {
      id: 1,
      frontEnd: "",
      backEnd: "",
      leftSide: "",
      rightSide: "",
    },
  ],
  wallLeftLeanTo: [
    {
      id: 1,
      frontEnd: "",
      backEnd: "",
      leftSide: "",
    },
  ],
  wallRightLeanTo: [
    {
      id: 1,
      frontEnd: "",
      backEnd: "",
      rightSide: "",
    },
  ],
  wallAdditionalLeanTo: [
    {
      id: 1,
      frontEnd: "",
      backEnd: "",
      leftSide: "",
      rightSide: "",
    },
  ],
  walkInOptionCentralBuilding: [
    {
      id: 1,
      walkInDoor: "Right Side",
      size: "36x80",
      color: "With Window",
      qty: 0,
      notes: "",
    },
  ],
  walkInOptionLeftLeanTo: [
    {
      id: 1,
      walkInDoor: "Right Side",
      size: "36x80",
      color: "With Window",
      qty: 0,
      notes: "",
    },
  ],
  walkInOptionRightLeanTo: [
    {
      id: 1,
      walkInDoor: "Right Side",
      size: "36x80",
      color: "With Window",
      qty: 0,
      notes: "",
    },
  ],
  walkInOptionAdditionalLeanTo: [
    {
      id: 1,
      walkInDoor: "Right Side",
      size: "36x80",
      color: "With Window",
      qty: 0,
      notes: "",
    },
  ],
  doorOptionCentralBuilding: [
    {
      id: 1,
      sideEnd: "Left Side",
      size: "36x80",
      qty: 0,
      doorColor: "",
      certification: true,
      dutch: false,
      chainHoist: false,
      custom: false,
      notes: "",
    },
  ],
  doorOptionLeftLeanTo: [
    {
      id: 1,
      sideEnd: "Left Side",
      size: "36x80",
      qty: 0,
      doorColor: "",
      certification: true,
      dutch: false,
      chainHoist: false,
      custom: false,
      notes: "",
    },
  ],
  doorOptionRightLeanTo: [
    {
      id: 1,
      sideEnd: "Left Side",
      size: "36x80",
      qty: 0,
      doorColor: "",
      certification: true,
      dutch: false,
      chainHoist: false,
      custom: false,
      notes: "",
    },
  ],
  doorOptionAdditionalLeanTo: [
    {
      id: 1,
      sideEnd: "Left Side",
      size: "36x80",
      qty: 0,
      doorColor: "",
      certification: true,
      dutch: false,
      chainHoist: false,
      custom: false,
      notes: "",
    },
  ],
  windowCentralBuilding: [
    {
      id: 1,
      window: "Right Side",
      size: "30x36",
      qty: 0,
      custom: false,
      notes: "",
    },
  ],
  windowLeftLeanTo: [
    {
      id: 1,
      window: "Right Side",
      size: "30x36",
      qty: 0,
      custom: false,
      notes: "",
    },
  ],
  windowRightLeanTo: [
    {
      id: 1,
      window: "Right Side",
      size: "30x36",
      qty: 0,
      custom: false,
      notes: "",
    },
  ],
  windowAdditionalLeanTo: [
    {
      id: 1,
      window: "Right Side",
      size: "30x36",
      qty: 0,
      custom: false,
      notes: "",
    },
  ],
};
