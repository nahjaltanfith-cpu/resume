import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Building2, UserCheck, Landmark, Briefcase } from "lucide-react";

const beneficiaryGroups = [
  {
    icon: Landmark,
    title: { ar: "الجهات الحكومية", en: "Government Entities" },
    desc: { ar: "نقدم الدعم المعرفي والاستشاري للجهات الحكومية المعنية بتنظيم وتطوير القطاع غير الربحي", en: "We provide knowledge and advisory support to government entities involved in the non-profit sector" },
  },
  {
    icon: Building2,
    title: { ar: "الكيانات الأهلية", en: "Civil Entities" },
    desc: { ar: "نساعد الكيانات الأهلية على بناء قدراتها المؤسسية وتحقيق الاستدامة في أعمالها", en: "We help civil entities build institutional capacity and achieve sustainability" },
  },
  {
    icon: UserCheck,
    title: { ar: "القيادات والكفاءات", en: "Leaders & Competencies" },
    desc: { ar: "نعمل على تمكين القيادات والكفاءات العاملة في القطاع غير الربحي من خلال برامج تدريبية متخصصة", en: "We empower leaders and competencies in the non-profit sector through specialized training programs" },
  },
  {
    icon: Briefcase,
    title: { ar: "الموظفون بالقطاع", en: "Sector Employees" },
    desc: { ar: "نوفر فرص التطوير المهني والتدريب المستمر للعاملين في القطاع غير الربحي", en: "We provide professional development and continuous training for non-profit sector workers" },
  },
];

const Beneficiaries = () => {
  const { lang } = useLang();

  return (
    <PageTransition>
      <SEOHead
        titleAr="المستفيدين | جماعة السيرة الذاتية الحياتية"
        titleEn="Beneficiaries | Sira Group"
        descriptionAr="الفئات المستفيدة من خدمات جماعة السيرة الذاتية الحياتية - الكتّاب والباحثون والمختصون والمجتمع الثقافي."
        descriptionEn="Beneficiary groups served by Sira Group - government entities, civil society organizations, and private sector."
      />
      <div className="min-h-screen">
        <PageHero
          title={lang === "ar" ? "المستفيدين" : "Beneficiaries"}
          subtitle={lang === "ar" ? "نخدم شرائح متعددة من المستفيدين لتحقيق أثر شامل ومستدام" : "We serve multiple beneficiary segments for comprehensive, sustainable impact"}
        />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {beneficiaryGroups.map((item, i) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="p-8 rounded-2xl bg-card border border-border hover:border-amber-200 hover:shadow-xl transition-all duration-300 text-center"
                    >
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md mb-5">
                        <Icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{item.title[lang]}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc[lang]}</p>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Beneficiaries;
