// components/LanguageSwitcher.js
"use client";

import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (lng) => {
    router.push(`/${lng}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
      <button onClick={() => changeLanguage("es")}>Español</button>
    </div>
  );
};

export default LanguageSwitcher;
