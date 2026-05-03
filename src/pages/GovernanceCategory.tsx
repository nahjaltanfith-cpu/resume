import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, FileCheck, FolderOpen } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { useDynamicContent } from "@/hooks/useDynamicContent";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GOVERNANCE_CATEGORIES } from "@/config/governanceCategories";

const GovernanceCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const isAr = lang === "ar";
  const { governanceDocs } = useDynamicContent();

  const category = GOVERNANCE_CATEGORIES.find((c) => c.key === slug);
  if (!category) return <Navigate to="/governance" replace />;

  const items = (governanceDocs || []).filter(
    (d) => d?.url && d.category === category.key
  );

  const title = isAr ? category.title_ar : category.title_en;
  const desc = isAr ? category.desc_ar : category.desc_en;
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  return (
    <PageTransition>
      <SEOHead
        titleAr={`${category.title_ar} | الحوكمة | جماعة السيرة الذاتية الحياتية`}
        titleEn={`${category.title_en} | Governance | Sira Group`}
        descriptionAr={category.desc_ar || "وثائق الحوكمة في جماعة السيرة الذاتية الحياتية"}
        descriptionEn={category.desc_en || "Governance documents at Sira Group"}
      />
      <div className="min-h-screen">
        <PageHero
          title={title}
          subtitle={isAr ? "أحد أقسام الحوكمة في جماعة السيرة الذاتية الحياتية" : "One of Sira Group's governance sections"}
        />

        <section className="py-10 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link
              to="/governance"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors mb-6"
            >
              <BackIcon size={16} />
              {isAr ? "رجوع إلى الحوكمة" : "Back to Governance"}
            </Link>

            <AnimatedSection>
              <div className="rounded-3xl border border-border bg-card shadow-md overflow-hidden">
                <div className="px-6 py-5 bg-gradient-to-r from-amber-50 to-amber-100/40 border-b border-border flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                    <FolderOpen className="text-white" size={22} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                    {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
                    <p className="text-xs text-amber-700 font-semibold mt-2">
                      {isAr ? `${items.length} مستندات` : `${items.length} documents`}
                    </p>
                  </div>
                </div>

                {items.length === 0 ? (
                  <div className="px-6 py-16 text-center text-sm text-muted-foreground bg-muted/20">
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
                      const value = `doc-${i}`;
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
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default GovernanceCategory;
