"use client";
import Link from "next/link";
import styles from "@/styles/404.module.scss";
import NotFoundLottie from "@/components/shared/Loader/NotFound";
import { constantTypes } from "@/utils/constants/constant";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { decryptData } from "@/helper/helper";

export default function NotFound() {
  const router = useRouter();

  let pathname = usePathname();
  let pathArray = pathname.split("/");
  if (pathArray[1] == "reset-password") {
    pathname = "/reset-password";
  }

  const handleNavigateHome = () => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      const orgName =
        window.localStorage.getItem("org_name") &&
        window.localStorage.getItem("org_name");
      // decryptData(window.localStorage.getItem("org_name"));

      if (token && orgName) {
        router.push(`${orgName}/dashboard`);
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div className={`${styles.container}`}>
      <div className={styles.content}>
        <div>
          <NotFoundLottie
            width={230}
            height={230}
            message=" Oops! The page you are looking for can not be found."
          />
          <button
            className={styles.not_found_link}
            onClick={() => handleNavigateHome()}
          >
            Go back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
