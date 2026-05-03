import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Zap, Rocket, Puzzle, TrendingUp, Coins } from "lucide-react";

const icons = [Zap, Rocket, Puzzle, TrendingUp, Coins];

const Strategy = () => {
  const { lang, t } = useLang();

  return (
    <PageTransition>
      <SEOHead
        titleAr="التوجهات الاستراتيجية | جمعية دعائم"
        titleEn="Strategic Directions | Daaem Association"
        descriptionAr="التوجهات الاستراتيجية لجمعية دعائم بمحافظة الأحساء."
        descriptionEn="Strategic directions of Daaem Association."
      />
      <div className="min-h-screen">
        
        <PageHero
          title={t.directions.title[lang]}
          subtitle={lang === "ar" ? "خطتنا الاستراتيجية لتنمية القطاع غير الربحي وتحقيق الأثر المستدام" : "Our strategic plan for developing the non-profit sector and achieving sustainable impact"}
        />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="space-y-6">
              {t.directions.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: lang === "ar" ? -8 : 8, scale: 1.01 }}
                      className="group relative flex items-start gap-6 p-8 rounded-2xl border border-border bg-background hover:shadow-card-hover transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute top-0 start-0 w-1 h-full gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="text-accent" size={28} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-accent mb-2 block tracking-wider">
                          {lang === "ar" ? `التوجه ${i + 1}` : `DIRECTION ${i + 1}`}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-foreground leading-relaxed">{item[lang]}</h3>
                      </div>
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

export default Strategy;
