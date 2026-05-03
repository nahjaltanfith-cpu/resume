import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export type QuickNavItem = {
  key: string;
  title_ar: string;
  title_en: string;
  count?: number;
};

interface Props {
  items: QuickNavItem[];
  /** Anchor id prefix for getElementById, defaults to "doc-cat-" */
  anchorPrefix?: string;
}

const QuickNavBar = ({ items, anchorPrefix = "doc-cat-" }: Props) => {
  const { lang } = useLang();
  const isAr = lang === "ar";

  if (!items || items.length === 0) return null;

  const handleJump = (key: string) => {
    const el = document.getElementById(`${anchorPrefix}${key}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-amber-100/50 px-5 py-5 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <FolderOpen className="text-amber-600" size={20} />
        <h4 className="text-base font-bold text-amber-800">
          {isAr ? "تصفّح سريع للأقسام" : "Quick Navigation"}
        </h4>
        <span className="text-xs text-amber-700/70 font-medium">
          {isAr ? "— اضغط للانتقال مباشرة" : "— click to jump"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((g) => (
          <motion.button
            key={g.key}
            type="button"
            onClick={() => handleJump(g.key)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 text-sm font-semibold text-foreground hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-sm"
          >
            <span>{isAr ? g.title_ar : g.title_en}</span>
            {typeof g.count === "number" && (
              <span className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                {g.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickNavBar;
