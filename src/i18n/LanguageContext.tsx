import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { Lang, translations } from "./translations";
import { useSiteContent } from "@/contexts/SiteContentContext";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: typeof translations;
  dir: "rtl" | "ltr";
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("ar");
  const { mergedTranslations } = useSiteContent();

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const value = useMemo<LanguageContextType>(
    () => ({
      lang,
      toggleLang,
      t: (mergedTranslations || translations) as typeof translations,
      dir: lang === "ar" ? "rtl" : "ltr",
    }),
    [lang, toggleLang, mergedTranslations]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
