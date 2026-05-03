import { useLang } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import { Zap, Rocket, Puzzle, TrendingUp, Coins } from "lucide-react";

const icons = [Zap, Rocket, Puzzle, TrendingUp, Coins];

const DirectionsSection = () => {
  const { lang, t } = useLang();

  return (
    <section id="directions" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.directions.title[lang]}</h2>
          <div className="w-16 h-1 rounded-full bg-accent mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.directions.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group relative p-8 rounded-2xl border border-border bg-background hover:shadow-card-hover transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 start-0 w-1 h-full gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon className="text-accent" size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent mb-2 block">0{i + 1}</span>
                      <p className="text-foreground font-semibold text-sm leading-relaxed">{item[lang]}</p>
                    </div>
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

export default DirectionsSection;
