import { useLang } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import { Shield, HeartHandshake, Star, Users, Lightbulb } from "lucide-react";

const icons = [Shield, HeartHandshake, Star, Users, Lightbulb];

const ValuesSection = () => {
  const { lang, t } = useLang();

  return (
    <section className="relative py-24 overflow-hidden bg-soft">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute top-10 -right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-3 border border-gold/20">
            {t.values.title[lang]}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {lang === "ar" ? "ما نؤمن به" : "What We Believe In"}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-10 h-0.5 bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="w-10 h-0.5 bg-primary/40" />
          </div>
        </AnimatedSection>

        {/* Clean horizontal cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {t.values.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="group relative bg-card rounded-2xl p-5 border border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-card-hover overflow-hidden h-full">
                  {/* Side accent bar */}
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-primary to-primary/50 group-hover:w-full transition-all duration-500 opacity-100 group-hover:opacity-[0.04] [direction:ltr]" />

                  <div className="relative flex flex-col items-center text-center">
                    {/* Circular icon */}
                    <div className="relative w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                      <Icon
                        className="text-primary group-hover:text-primary-foreground transition-colors duration-500"
                        size={22}
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                        {i + 1}
                      </span>
                    </div>

                    <h3 className="font-bold text-foreground text-sm md:text-base">
                      {item[lang]}
                    </h3>

                    <div className="w-8 h-0.5 bg-gold/60 mt-3 group-hover:w-12 transition-all duration-500" />
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

export default ValuesSection;
