import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { translations } from "@/i18n/translations";

const SITE_CONTENT_CACHE_KEY = "site_content_cache";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type SiteContent = DeepPartial<typeof translations> & {
  logo_url?: string;
  hero_images?: string[];
  project_image?: string;
  governance_pdf?: string;
  reports_pdf?: string;
  contact_email?: string;
  contact_location_ar?: string;
  contact_location_en?: string;
  governance_docs?: { title_ar: string; title_en: string; url: string; category?: string }[];
  reports_docs?: { title_ar: string; title_en: string; url: string; category?: string }[];
  governance_pdf_hidden?: boolean;
  reports_pdf_hidden?: boolean;
};

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== undefined && source[key] !== null && source[key] !== "") {
      if (
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        typeof target[key] === "object" &&
        !Array.isArray(target[key])
      ) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

interface SiteContentContextType {
  content: SiteContent;
  mergedTranslations: typeof translations;
  loading: boolean;
  updateContent: (newContent: SiteContent) => Promise<boolean>;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

function getInitialContent(): SiteContent {
  try {
    const cached = localStorage.getItem(SITE_CONTENT_CACHE_KEY);
    if (!cached) return {};
    const parsed = JSON.parse(cached);
    return typeof parsed === "object" && parsed !== null ? (parsed as SiteContent) : {};
  } catch {
    return {};
  }
}

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(getInitialContent);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "main")
        .maybeSingle();
      if (!error && data?.content) {
        const nextContent = data.content as unknown as SiteContent;
        setContent(nextContent);
        localStorage.setItem(SITE_CONTENT_CACHE_KEY, JSON.stringify(nextContent));
      }
    } catch (e) {
      console.error("Failed to fetch site content:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const mergedTranslations = deepMerge(translations, content) as typeof translations;

  const updateContent = async (newContent: SiteContent): Promise<boolean> => {
    try {
      const merged = deepMerge(content, newContent);
      const { error } = await supabase
        .from("site_content")
        .upsert({ id: "main", content: merged as any, updated_at: new Date().toISOString() });
      if (error) throw error;
      setContent(merged);
      localStorage.setItem(SITE_CONTENT_CACHE_KEY, JSON.stringify(merged));
      return true;
    } catch (e) {
      console.error("Failed to update site content:", e);
      return false;
    }
  };

  const refreshContent = async () => {
    await fetchContent();
  };

  return (
    <SiteContentContext.Provider value={{ content, mergedTranslations, loading, updateContent, refreshContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};
