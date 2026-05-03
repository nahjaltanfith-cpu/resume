import AnimatedSection from "@/components/AnimatedSection";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Deep navy gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(199_70%_22%)_0%,hsl(205_75%_10%)_55%,hsl(210_80%_6%)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(199_70%_18%)]/60 via-transparent to-[hsl(205_80%_8%)]/80" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Diagonal shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />

      {/* Floating orbs */}
      <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-[hsl(199_80%_45%)]/15 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-semibold text-white tracking-wider uppercase">
              دعائم
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 text-white drop-shadow-lg">
            {title}
          </h1>

          {/* Custom divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/60" />
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/60" />
          </div>

          {subtitle && (
            <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </AnimatedSection>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </section>
  );
};

export default PageHero;
