import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

interface SEOHeadProps {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

const BASE_URL = "https://sira-group.org.sa";
const OG_IMAGE = `${BASE_URL}/logo.png`;

const SEOHead = ({ titleAr, titleEn, descriptionAr, descriptionEn }: SEOHeadProps) => {
  const { lang } = useLang();
  const location = useLocation();

  useEffect(() => {
    const title = lang === "ar" ? titleAr : titleEn;
    const description = lang === "ar" ? descriptionAr : descriptionEn;
    const canonicalUrl = `${BASE_URL}${location.pathname === "/" ? "" : location.pathname}`;

    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", OG_IMAGE, "property");
    setMeta("og:image:secure_url", OG_IMAGE, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", OG_IMAGE);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [lang, titleAr, titleEn, descriptionAr, descriptionEn, location.pathname]);

  return null;
};

export default SEOHead;
