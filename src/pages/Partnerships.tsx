import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Landmark, Users, GraduationCap, Globe } from "lucide-react";

const partnerIcons = [Landmark, Users, GraduationCap, Globe];

const Partnerships = () => {
  const { lang, t } = useLang();

  return (
    <PageTransition>
      <SEOHead
        titleAr="الشراكات | جمعية دعائم"
        titleEn="Partnerships | Daaem Association"
        descriptionAr="شراكات جمعية دعائم مع الجهات الحكومية والمنظمات لتنمية القطاع غير الربحي بمحافظة الأحساء."
        descriptionEn="Daaem Association's partnerships with government and organizations for non-profit sector development."
      />
      <div className="min-h-screen">
        
        <PageHero title={t.partnerships.title[lang]} subtitle={t.partnerships.subtitle[lang]} />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.partnerships.types.map((type, i) => {
                const Icon = partnerIcons[i];
                return (
                  <AnimatedSection key={i} delay={i * 0.12}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="group flex items-start gap-6 p-8 rounded-2xl border border-border bg-background shadow-card hover:shadow-card-hover transition-all duration-500"
                    >
                      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-primary-foreground" size={26} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{type.title[lang]}</h3>
                        <p className="text-muted-foreground leading-relaxed">{type.desc[lang]}</p>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="py-20 bg-soft">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {lang === "ar" ? "هل ترغب في الشراكة معنا؟" : "Interested in Partnering With Us?"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {lang === "ar" ? "نرحب بجميع أشكال الشراكة التي تساهم في تنمية القطاع غير الربحي" : "We welcome all forms of partnership that contribute to non-profit sector development"}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex px-8 py-4 rounded-2xl gradient-primary text-primary-foreground font-bold shadow-xl"
              >
                {t.nav.contact[lang]}
              </motion.a>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Partnerships;
