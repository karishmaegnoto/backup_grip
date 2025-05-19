// hooks/withAuth.js
import LottieLoader from "@/components/shared/Loader/lottieLoader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileStyle from "@/app/[slug]/profile/profile.module.scss";

const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    return !!token;
  }
  return false; // Default to false on server-side
};

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const authenticated = isAuthenticated();

    useEffect(() => {
      if (!authenticated) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [authenticated, router]);

    if (loading) {
      return (
        <div className={ProfileStyle.main_loader}>
          <LottieLoader height={250} width={250} loader={true} />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthHOC.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthHOC;
};

export default withAuth;
