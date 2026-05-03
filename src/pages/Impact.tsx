import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection, { useCounter } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Sparkles, Target, Handshake, Building, GraduationCap } from "lucide-react";

const statIcons = [Sparkles, Target, Handshake, Building, GraduationCap];

const Impact = () => {
  const { lang, t } = useLang();

  return (
    <PageTransition>
      <SEOHead
        titleAr="الأثر والإنجازات | جمعية دعائم"
        titleEn="Impact & Achievements | Daaem Association"
        descriptionAr="أثر وإنجازات جمعية دعائم في تنمية القطاع غير الربحي بمحافظة الأحساء."
        descriptionEn="Impact and achievements of Daaem Association in non-profit sector development."
      />
      <div className="min-h-screen">
        
        <PageHero title={t.impact.title[lang]} subtitle={t.impact.subtitle[lang]} />

        {/* Numbers */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {t.impact.items.map((item, i) => {
                const Icon = statIcons[i];
                return <ImpactCounter key={i} value={item.value} label={item.label[lang]} delay={i * 0.1} icon={Icon} />;
              })}
            </div>
          </div>
        </section>

        {/* Report sections placeholder */}
        <section className="py-24 bg-soft">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {lang === "ar" ? "التقارير والإنجازات" : "Reports & Achievements"}
              </h2>
              <div className="w-16 h-1 rounded-full bg-accent mx-auto" />
            </AnimatedSection>

            <div className="space-y-6">
              {[
                { ar: "التقرير السنوي 2024", en: "Annual Report 2024" },
                { ar: "تقرير الأثر الاجتماعي", en: "Social Impact Report" },
                { ar: "تقرير الشراكات والتعاون", en: "Partnerships & Collaboration Report" },
              ].map((report, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ x: lang === "ar" ? -6 : 6 }}
                    className="flex items-center justify-between p-6 rounded-2xl border border-border bg-background shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
                  >
                    <span className="font-bold text-foreground text-lg">{report[lang]}</span>
                    <span className="text-accent font-medium text-sm group-hover:underline">
                      {lang === "ar" ? "عرض التقرير" : "View Report"}
                    </span>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

const ImpactCounter = ({ value, label, delay, icon: Icon }: { value: number; label: string; delay: number; icon: any }) => {
  const { count, ref } = useCounter(value);
  return (
    <AnimatedSection delay={delay}>
      <motion.div
        ref={ref}
        whileHover={{ y: -6, scale: 1.03 }}
        className="text-center p-6 rounded-2xl bg-soft border border-border shadow-card"
      >
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Icon className="text-primary-foreground" size={22} />
        </div>
        <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-cairo">
          +{count.toLocaleString()}
        </div>
        <p className="text-muted-foreground text-sm">{label}</p>
      </motion.div>
    </AnimatedSection>
  );
};

export default Impact;
