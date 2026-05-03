import { motion } from "framer-motion";
import { Download, FileCheck, FolderOpen, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLang } from "@/i18n/LanguageContext";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export type DocItem = {
  title_ar?: string;
  title_en?: string;
  url: string;
  category?: string;
};

export type CategoryDef = {
  key: string;
  title_ar: string;
  title_en: string;
  desc_ar?: string;
  desc_en?: string;
};

interface Props {
  docs: DocItem[];
  categories: CategoryDef[];
  uncategorizedLabel?: { ar: string; en: string };
}

const CategorizedDocs = ({ docs, categories, uncategorizedLabel }: Props) => {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const grouped: Record<string, DocItem[]> = {};
  for (const cat of categories) grouped[cat.key] = [];
  const others: DocItem[] = [];
  for (const d of docs) {
    if (!d?.url) continue;
    if (d.category && grouped[d.category]) grouped[d.category].push(d);
    else others.push(d);
  }

  const renderGroup = (cat: CategoryDef, items: DocItem[], idx: number) => {
    const title = isAr ? cat.title_ar : cat.title_en;
    const desc = isAr ? cat.desc_ar : cat.desc_en;

    return (
      <AnimatedSection key={cat.key} delay={idx * 0.1}>
        <div id={`doc-cat-${cat.key}`} className="rounded-3xl border border-border bg-card shadow-md overflow-hidden scroll-mt-24">
          {/* Category header */}
          <div className="px-6 py-5 bg-gradient-to-r from-amber-50 to-amber-100/40 border-b border-border flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
              <FolderOpen className="text-white" size={22} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground">{title}</h3>
              {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
              <p className="text-xs text-amber-700 font-semibold mt-2">
                {isAr ? `${items.length} مستندات` : `${items.length} documents`}
              </p>
            </div>
          </div>

          {/* Documents accordion */}
          {items.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-muted-foreground bg-muted/20">
              {isAr ? "لا توجد مستندات في هذا القسم حالياً" : "No documents in this section yet"}
            </div>
          ) : (
          <Accordion type="single" collapsible className="divide-y divide-border">
            {items.map((doc, i) => {
              const docTitle =
                (isAr ? doc.title_ar : doc.title_en) ||
                doc.title_ar ||
                doc.title_en ||
                (isAr ? `مستند ${i + 1}` : `Document ${i + 1}`);
              const value = `${cat.key}-${i}`;
              return (
                <AccordionItem key={value} value={value} className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/40 hover:no-underline group">
                    <div className="flex items-center gap-3 flex-1 text-start">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                        <FileCheck className="text-amber-600" size={16} />
                      </div>
                      <span className="text-base font-semibold text-foreground">
                        {docTitle}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="rounded-xl border border-border overflow-hidden bg-muted/20">
                      <iframe
                        src={doc.url}
                        className="w-full h-[500px] md:h-[650px]"
                        title={docTitle}
                      />
                    </div>
                    <div className="flex justify-center mt-5">
                      <motion.a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Download size={18} />
                        {isAr ? `تحميل ${docTitle}` : `Download ${docTitle}`}
                      </motion.a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          )}
        </div>
      </AnimatedSection>
    );
  };

  return (
    <div className="space-y-10">
      {categories.map((cat, idx) => renderGroup(cat, grouped[cat.key], idx))}
      {others.length > 0 &&
        renderGroup(
          {
            key: "_others",
            title_ar: uncategorizedLabel?.ar || "مستندات أخرى",
            title_en: uncategorizedLabel?.en || "Other Documents",
          },
          others,
          categories.length
        )}
    </div>
  );
};

export default CategorizedDocs;
