import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Shield, Users, FileCheck, Scale, Eye, Download, Library, FolderOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { useDynamicContent } from "@/hooks/useDynamicContent";
import PdfViewer from "@/components/PdfViewer";
import { Link } from "react-router-dom";
import { GOVERNANCE_CATEGORIES } from "@/config/governanceCategories";


const governanceItems = [
  {
    icon: Shield,
    title: { ar: "الشفافية والمساءلة", en: "Transparency & Accountability" },
    desc: { ar: "نلتزم بأعلى معايير الشفافية في جميع عملياتنا وقراراتنا لضمان المساءلة الكاملة أمام أصحاب المصلحة", en: "We adhere to the highest standards of transparency in all our operations and decisions" },
  },
  {
    icon: Users,
    title: { ar: "مجلس الأمناء", en: "Board of Trustees" },
    desc: { ar: "يتولى مجلس الأمناء الإشراف على التوجهات الاستراتيجية والتأكد من تحقيق أهداف الجمعية بكفاءة وفعالية", en: "The Board of Trustees oversees strategic directions and ensures the association's goals are achieved" },
  },
  {
    icon: FileCheck,
    title: { ar: "السياسات والإجراءات", en: "Policies & Procedures" },
    desc: { ar: "نعمل وفق سياسات وإجراءات واضحة ومعتمدة تضمن سير العمل بشكل منظم ومتسق", en: "We operate under clear, approved policies and procedures ensuring organized workflows" },
  },
  {
    icon: Scale,
    title: { ar: "الامتثال والتنظيم", en: "Compliance & Regulation" },
    desc: { ar: "نلتزم بجميع الأنظمة والتشريعات المحلية والدولية المتعلقة بالقطاع غير الربحي", en: "We comply with all local and international regulations related to the non-profit sector" },
  },
  {
    icon: Eye,
    title: { ar: "الرقابة الداخلية", en: "Internal Oversight" },
    desc: { ar: "نظام رقابة داخلي فعال يضمن حسن استخدام الموارد وتحقيق الأهداف المرجوة", en: "Effective internal oversight system ensuring proper resource utilization" },
  },
];

const DEFAULT_PDF_EMBED = "/lai7a-asasiya-sira.pdf";
const DEFAULT_PDF_DOWNLOAD = "/lai7a-asasiya-sira.pdf";

const Governance = () => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const { governancePdf, governanceDocs, governancePdfHidden } = useDynamicContent();
  const showMainPdf = !governancePdfHidden;
  const PDF_EMBED = governancePdf || DEFAULT_PDF_EMBED;
  const PDF_DOWNLOAD = governancePdf || DEFAULT_PDF_DOWNLOAD;
  const extraDocs = (governanceDocs || []).filter((d) => d?.url);
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <PageTransition>
      <SEOHead
        titleAr="الحوكمة | جماعة السيرة الذاتية الحياتية"
        titleEn="Governance | Sira Group"
        descriptionAr="معايير الحوكمة والشفافية في جماعة السيرة الذاتية الحياتية - الهيكل المؤسسي ومجلس الأمناء والفريق التنفيذي."
        descriptionEn="Governance and transparency standards at Sira Group - institutional structure, Board of Trustees, and executive team."
      />
      <div className="min-h-screen">
        <PageHero
          title={lang === "ar" ? "الحوكمة" : "Governance"}
          subtitle={lang === "ar" ? "نلتزم بأعلى معايير الحوكمة والشفافية لضمان تحقيق رسالتنا" : "We adhere to the highest governance and transparency standards"}
        />

        {/* Section cards grid - shown on mobile only (desktop uses navbar dropdown) */}
        <section className="pt-10 pb-4 bg-background lg:hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOVERNANCE_CATEGORIES.map((cat, idx) => {
                const count = extraDocs.filter((d) => d.category === cat.key).length;
                return (
                  <AnimatedSection key={cat.key} delay={idx * 0.05}>
                    <Link
                      to={`/governance/${cat.key}`}
                      className="group block h-full rounded-2xl border border-border bg-card hover:border-amber-300 hover:shadow-lg transition-all p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                          <FolderOpen className="text-white" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-foreground group-hover:text-amber-700 transition-colors leading-snug">
                            {isAr ? cat.title_ar : cat.title_en}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {isAr ? cat.desc_ar : cat.desc_en}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold">
                              {isAr ? `${count} مستند` : `${count} docs`}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:gap-2 transition-all">
                              {isAr ? "دخول" : "Open"}
                              <Arrow size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>


        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="space-y-6">
              {governanceItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: lang === "ar" ? -6 : 6 }}
                      className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border hover:border-amber-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{item.title[lang]}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc[lang]}</p>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {showMainPdf && (
        <section id="doc-cat-main-pdf" className="py-24 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnimatedSection>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                    <FileCheck className="text-white" size={22} />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {lang === "ar" ? "اللائحة الأساسية" : "Basic Regulations"}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {lang === "ar"
                    ? "يمكنك الاطلاع على اللائحة الأساسية للجمعية وتصفحها أدناه"
                    : "Browse and review the association's basic regulations below"}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(PDF_EMBED)}&embedded=true`}
                  className="w-full h-[600px] md:h-[850px] bg-white"
                  title={lang === "ar" ? "اللائحة الأساسية" : "Basic Regulations"}
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
                  {lang === "ar" ? "تحميل اللائحة الأساسية" : "Download Basic Regulations"}
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </section>
        )}

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Governance;
