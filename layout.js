"use client";
import React, { Suspense, lazy } from "react";
import { Manrope } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.scss";
import { usePathname } from "next/navigation";
import { constantTypes } from "@/utils/constants/constant";
import Footer from "@/components/footer/page";
import { appWithTranslation } from "next-i18next";
import { ToastContextProvider } from "@/hooks/context/ToastContext";
import { AuthProvider } from "@/hooks/context/AuthContext";
import { useEffect, useState } from "react";
import Header from "@/components/headers/page";
import Sidebar from "@/components/sidebar/page";
import { useRouter } from "next/navigation";
import RenderPageLoader from "@/components/shared/Loader/renderPageLoader";
import ConnectionsLost from "@/components/shared/connectionLost";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { decryptData } from "@/helper/helper";
import SeoTags from "@/components/SeoContainer/seoTags";
import InstallPWA from "@/components/shared/buttons/installPwa";
import "bootstrap/dist/css/bootstrap.min.css";
import { LeadProvider } from "@/hooks/context/LeadContext";

const manrope = Manrope({
  subsets: ["latin"], /// Choose a valid subset
  weight: ["300", "400", "500", "600", "700", "800"],
});

function RootLayout({ children, session }) {
  let pathname = usePathname();
  let pathArray = pathname.split("/");
  const router = useRouter();
  const isOnline = useOnlineStatus();

  // ALL STATE
  const [loading, setLoading] = useState(true);

  if (pathArray[1] == "reset-password") {
    pathname = "/reset-password";
  }

  useEffect(() => {
    const parentElement = document.getElementById("parentElement");
    const childElement = document.getElementById("childElement");

    if (parentElement && childElement) {
      parentElement.removeChild(childElement);
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("token");
        const orgName =
          window.localStorage.getItem("org_name") &&
          window.localStorage.getItem("org_name");
        // decryptData(window.localStorage.getItem("org_name"));

        if (token && constantTypes?.authPage?.includes(pathname)) {
          if (pathArray[1] !== "reset-password") {
            orgName && router.push(`${orgName}/dashboard`);
          } else {
            router.push(`/not-found`);
          }
        }

        if (!constantTypes?.authPage?.includes(pathname)) {
          if (token && pathArray[1] !== orgName) {
            router.push(`/not-found`);
          }
        }
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  return (
    <html lang="en">
      <SeoTags
        title="Grip CRM"
        description="Take control of your customer relationships with Grip CRM. Our intuitive platform provides the tools you need to manage interactions, track sales, and enhance customer satisfaction."
      />
      {/* <Head>
        <title>Grip-CRM</title>
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head> */}
      <body className={manrope.className}>
        <InstallPWA />
        <ToastContextProvider>
          <AuthProvider>
            <LeadProvider>
              {!isOnline ? (
                <ConnectionsLost />
              ) : (
                <>
                  {loading ? (
                    <div>
                      <RenderPageLoader />
                    </div>
                  ) : (
                    <main>
                      <div
                        className={
                          !constantTypes?.authPage?.includes(pathname)
                            ? "grip_crm"
                            : ""
                        }
                      >
                        {!constantTypes?.authPage?.includes(pathname) &&
                        !pathname.includes("quotes/quote-form") ? (
                          <Sidebar />
                        ) : null}

                        <div
                          className={
                            !constantTypes?.authPage?.includes(pathname) &&
                            !pathname.includes("quotes/quote-form")
                              ? "right_container"
                              : ""
                          }
                        >
                          {!constantTypes?.authPage?.includes(pathname) &&
                          !pathname.includes("quotes/quote-form") ? (
                            <Header />
                          ) : null}
                          <div
                            className={
                              !constantTypes?.authPage?.includes(pathname) &&
                              !pathname.includes("quotes/quote-form")
                                ? "right_main_div"
                                : ""
                            }
                          >
                            {children}
                          </div>
                          {!constantTypes?.authPage?.includes(pathname) &&
                          !pathname.includes("quotes/quote-form") ? (
                            <Footer />
                          ) : null}
                        </div>
                      </div>
                    </main>
                  )}
                </>
              )}
            </LeadProvider>
          </AuthProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
export default appWithTranslation(RootLayout);
