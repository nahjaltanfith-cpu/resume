import { useLang } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import { BarChart3, Building2, Heart } from "lucide-react";

const items = [
  { icon: BarChart3, color: "from-nama-800 to-nama-700" },
  { icon: Building2, color: "from-nama-700 to-nama-600" },
  { icon: Heart, color: "from-nama-600 to-nama-500" },
];

const WorkAreasSection = () => {
  const { lang, t } = useLang();

  return (
    <section id="areas" className="py-24 bg-soft">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.workAreas.title[lang]}</h2>
          <div className="w-16 h-1 rounded-full bg-accent mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.workAreas.items.map((area, i) => {
            const Icon = items[i].icon;
            return (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="group relative rounded-2xl overflow-hidden bg-background border border-border hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
                  <div className={`h-2 bg-gradient-to-r ${items[i].color}`} />
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-accent" size={30} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{area.title[lang]}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{area.desc[lang]}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkAreasSection;
