"use client";
import devStyle from "@/styles/devStyle.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-100 via-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
      <div className="z-10 max-w-4xl w-full items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
          EGNOTO CRM
        </h1>

        <div className="p-4">
          <div className={devStyle?.tab_container}>
            <button
              type="button"
              className={devStyle?.tab_button}
              onClick={() => router.push("/book-a-demo")}
            >
              Book a demo
            </button>
            <button
              type="button"
              className={devStyle?.tab_button}
              onClick={() =>
                window?.localStorage.getItem("token")
                  ? null
                  : router.push("/login")
              }
            >
              Login to your panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
