import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { FileCheck, Download, Library } from "lucide-react";
import { useDynamicContent } from "@/hooks/useDynamicContent";
import CategorizedDocs, { CategoryDef } from "@/components/CategorizedDocs";
import QuickNavBar, { QuickNavItem } from "@/components/QuickNavBar";

const REPORTS_CATEGORIES: CategoryDef[] = [
  {
    key: "assessments",
    title_ar: "التقييمات والدراسات",
    title_en: "Assessments & Studies",
    desc_ar: "تقييمات المخاطر والدراسات التحليلية المعتمدة",
    desc_en: "Approved risk assessments and analytical studies",
  },
  {
    key: "financial_policies",
    title_ar: "السياسات المالية والتبرعات",
    title_en: "Financial & Donation Policies",
    desc_ar: "سياسات معتمدة لإدارة التبرعات والمقبوضات وضمان النزاهة المالية",
    desc_en: "Approved policies for managing donations, receipts, and financial integrity",
  },
  {
    key: "annual",
    title_ar: "التقارير السنوية",
    title_en: "Annual Reports",
    desc_ar: "التقارير السنوية لأنشطة وإنجازات الجمعية",
    desc_en: "Annual reports of the association's activities and achievements",
  },
  {
    key: "financial",
    title_ar: "التقارير المالية",
    title_en: "Financial Reports",
    desc_ar: "البيانات والتقارير المالية المعتمدة",
    desc_en: "Approved financial statements and reports",
  },
];

const Reports = () => {
  const { lang } = useLang();
  const { reportsPdf, reportsDocs, reportsPdfHidden } = useDynamicContent();
  // Only show the main PDF section if an admin has uploaded a PDF (and not hidden it)
  const showMainPdf = !reportsPdfHidden && !!reportsPdf;
  const PDF_EMBED = reportsPdf || "";
  const PDF_DOWNLOAD = reportsPdf || "";
  const extraDocs = (reportsDocs || []).filter((d) => d?.url);

  const quickNavItems: QuickNavItem[] = [];
  if (showMainPdf) {
    quickNavItems.push({
      key: "main-pdf",
      title_ar: "قرار التأسيس",
      title_en: "Founding Resolution",
    });
  }
  for (const cat of REPORTS_CATEGORIES) {
    const count = extraDocs.filter((d) => d.category === cat.key).length;
    if (count > 0) {
      quickNavItems.push({
        key: cat.key,
        title_ar: cat.title_ar,
        title_en: cat.title_en,
        count,
      });
    }
  }

  return (
    <PageTransition>
      <SEOHead
        titleAr="التقارير | جمعية دعائم"
        titleEn="Reports | Daaem Association"
        descriptionAr="تقارير ووثائق جمعية دعائم - قرار التأسيس والتقارير السنوية."
        descriptionEn="Reports and documents of Daaem Association - founding resolution and annual reports."
      />
      <div className="min-h-screen">
        <PageHero
          title={lang === "ar" ? "التقارير" : "Reports"}
          subtitle={lang === "ar" ? "نؤمن بالشفافية والإفصاح كجزء أساسي من حوكمتنا" : "We believe in transparency and disclosure as a core part of our governance"}
        />

        {/* Quick navigation - shown immediately at top so users see all sections without waiting for PDFs */}
        {quickNavItems.length > 1 && (
          <section className="pt-6 pb-2 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <QuickNavBar items={quickNavItems} />
            </div>
          </section>
        )}

        {showMainPdf && (
        <section id="doc-cat-main-pdf" className="py-24 bg-background scroll-mt-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnimatedSection>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                    <FileCheck className="text-white" size={22} />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {lang === "ar" ? "قرار التأسيس" : "Founding Resolution"}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {lang === "ar"
                    ? "يمكنك الاطلاع على قرار تأسيس الجمعية وتصفحه أدناه"
                    : "Browse and review the association's founding resolution below"}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
                <iframe
                  src={PDF_EMBED}
                  className="w-full h-[600px] md:h-[850px]"
                  title={lang === "ar" ? "قرار التأسيس" : "Founding Resolution"}
                  allow="autoplay"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
              <div className="flex justify-center mt-8">
                <motion.a
                  href={PDF_DOWNLOAD}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Download size={18} />
                  {lang === "ar" ? "تحميل قرار التأسيس" : "Download Founding Resolution"}
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </section>
        )}

        {extraDocs.length > 0 && (
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <AnimatedSection>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                      <Library className="text-white" size={22} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {lang === "ar" ? "مكتبة التقارير" : "Reports Library"}
                    </h2>
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {lang === "ar"
                      ? "تقارير ودراسات الجمعية مصنّفة في أقسام لسهولة التصفح"
                      : "The association's reports and studies, organized into sections for easy browsing"}
                  </p>
                </div>
              </AnimatedSection>
              <CategorizedDocs
                docs={extraDocs}
                categories={REPORTS_CATEGORIES}
                uncategorizedLabel={{ ar: "تقارير أخرى", en: "Other Reports" }}
              />
            </div>
          </section>
        )}

        {!showMainPdf && extraDocs.length === 0 && (
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <AnimatedSection>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted mb-6">
                  <Library className="text-muted-foreground" size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {lang === "ar" ? "قريباً" : "Coming Soon"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {lang === "ar"
                    ? "سيتم نشر تقارير ووثائق الجمعية هنا قريباً."
                    : "The association's reports and documents will be published here soon."}
                </p>
              </AnimatedSection>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Reports;
