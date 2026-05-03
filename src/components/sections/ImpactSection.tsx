import { useLang } from "@/i18n/LanguageContext";
import AnimatedSection, { useCounter } from "@/components/AnimatedSection";
import hero1 from "@/assets/hero-1.jpg";

const ImpactSection = () => {
  const { lang, t } = useLang();

  return (
    <section id="impact" className="py-24 gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.impact.title[lang]}</h2>
          <div className="w-16 h-1 rounded-full bg-accent mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {t.impact.items.map((item, i) => (
            <CounterCard key={i} value={item.value} label={item.label[lang]} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CounterCard = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
  const { count, ref } = useCounter(value);

  return (
    <AnimatedSection delay={delay}>
      <div ref={ref} className="text-center group">
        <div className="text-4xl md:text-5xl font-bold mb-2 font-cairo">
          {count > 0 ? `+${count.toLocaleString()}` : "0"}
        </div>
        <p className="text-primary-foreground/70 text-sm font-medium">{label}</p>
      </div>
    </AnimatedSection>
  );
};

export default ImpactSection;
