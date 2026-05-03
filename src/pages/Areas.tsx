import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { BarChart3, Building2, Heart } from "lucide-react";

const areaIcons = [BarChart3, Building2, Heart];
const areaColors = ["from-nama-800 to-nama-700", "from-nama-700 to-nama-600", "from-nama-600 to-nama-500"];

const Areas = () => {
  const { lang, t } = useLang();

  return (
    <PageTransition>
      <SEOHead
        titleAr="مجالات العمل | جمعية دعائم"
        titleEn="Work Areas | Daaem Association"
        descriptionAr="تعرف على مجالات عمل جمعية دعائم في تنمية القطاع غير الربحي بمحافظة الأحساء - البحث والتطوير، بناء القدرات، والدعم المؤسسي."
        descriptionEn="Discover Daaem Association's work areas in non-profit sector development in Al-Ahsa Governorate."
      />
      <div className="min-h-screen">
        
        <PageHero title={t.workAreas.title[lang]} />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.workAreas.items.map((area, i) => {
                const Icon = areaIcons[i];
                return (
                  <AnimatedSection key={i} delay={i * 0.15}>
                    <motion.div
                      whileHover={{ y: -12 }}
                      className="group rounded-3xl overflow-hidden bg-background border border-border shadow-card hover:shadow-card-hover transition-all duration-500 h-full"
                    >
                      <div className={`h-2 bg-gradient-to-r ${areaColors[i]}`} />
                      <div className="p-10 text-center">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8"
                        >
                          <Icon className="text-accent" size={36} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">{area.title[lang]}</h3>
                        <div className="w-10 h-1 bg-accent rounded-full mx-auto mb-4" />
                        <p className="text-muted-foreground leading-relaxed">{area.desc[lang]}</p>
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

export default Areas;
