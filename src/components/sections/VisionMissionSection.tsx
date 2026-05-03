import { useLang } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import { Eye, Target } from "lucide-react";

const VisionMissionSection = () => {
  const { lang, t } = useLang();

  return (
    <section id="vision" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Vision */}
          <AnimatedSection direction="left">
            <div className="group p-10 rounded-2xl bg-soft border border-border hover:shadow-card-hover transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl gradient-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="text-primary-foreground" size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t.vision.title[lang]}</h2>
              <div className="w-12 h-1 rounded-full bg-accent mx-auto mb-4 group-hover:w-20 transition-all duration-300" />
              <p className="text-muted-foreground text-lg leading-relaxed">{t.vision.text[lang]}</p>
            </div>
          </AnimatedSection>

          {/* Mission */}
          <AnimatedSection direction="right">
            <div className="group p-10 rounded-2xl bg-soft border border-border hover:shadow-card-hover transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl gradient-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-accent-foreground" size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t.mission.title[lang]}</h2>
              <div className="w-12 h-1 rounded-full bg-accent mx-auto mb-4 group-hover:w-20 transition-all duration-300" />
              <p className="text-muted-foreground text-lg leading-relaxed">{t.mission.text[lang]}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
