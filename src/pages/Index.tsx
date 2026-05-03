import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { ArrowLeft, ArrowRight, Eye, Target, ChevronLeft, ChevronRight, Zap, Rocket, Puzzle, TrendingUp, Coins, Shield, HeartHandshake, Sparkles, Users, Lightbulb, BookOpen, Languages, Database, Quote, Feather } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import defaultLogo from "/logo.png";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import { useDynamicContent } from "@/hooks/useDynamicContent";

const heroImages = [hero1, hero2, hero3];
const directionIcons = [Zap, Rocket, Puzzle, TrendingUp, Coins];
const projectImages = [project1, project2, project3];
const projectIcons = [Feather, Database, Languages];

const Index = () => {
  const { lang, t } = useLang();
  const { logoUrl: logo } = useDynamicContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const springTransition = {
    type: "spring",
    stiffness: 120,
    damping: 15,
    mass: 0.8,
  } as const;

  return (
    <PageTransition>
      <SEOHead
        titleAr="جماعة السيرة الذاتية الحياتية | جمعية أهلية ثقافية بالرياض"
        titleEn="Sira Group | Cultural Non-Profit Association in Riyadh, Saudi Arabia"
        descriptionAr="جماعة السيرة الذاتية الحياتية - جمعية سعودية أهلية ثقافية مرخصة، مقرها الرياض، تُعنى بالسيرة الذاتية الحياتية والإبداع السيري ودعم رؤية المملكة 2030."
        descriptionEn="Sira Group - A licensed Saudi cultural non-profit based in Riyadh, dedicated to biographical creativity and supporting Vision 2030."
      />
      <div className="min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                src={heroImages[currentSlide]} 
                alt="" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-br from-nama-900/70 via-nama-800/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-nama-900/95 via-nama-900/30 to-transparent" />
          {/* Subtle geometric accent layer */}
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--gold)) 0%, transparent 40%), radial-gradient(circle at 80% 80%, hsl(var(--primary)) 0%, transparent 40%)" }} />

          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlide ? "w-12 bg-gold shadow-[0_0_15px_hsl(var(--gold)/0.6)]" : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...springTransition, duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <img 
                src={logo} 
                alt="شعار جماعة السيرة الذاتية الحياتية - Sira Group Logo" 
                className="w-32 h-auto md:w-48 lg:w-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]" 
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.01 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-lg"
            >
              {t.hero.title[lang]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.2 }}
              className="text-xl md:text-3xl text-white/95 font-semibold mb-6 drop-shadow-md"
            >
              {t.hero.subtitle[lang]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
              className="text-base md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-sm"
            >
              {t.hero.description[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
            >
              <Link to="/about" className="w-full sm:w-auto">
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-10 py-4 w-full rounded-full gradient-gold text-gold-foreground font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                >
                  {t.hero.cta1[lang]}
                  {lang === "ar" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </motion.span>
              </Link>
              <Link to="/projects" className="w-full sm:w-auto">
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-10 py-4 w-full rounded-full backdrop-blur-md border border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  {t.hero.cta2[lang]}
                </motion.span>
              </Link>
            </motion.div>
          </div>

         
        </section>


<section className="py-24 bg-soft">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
      <AnimatedSection direction="left">
        <div className="relative group p-10 rounded-3xl bg-background border border-border hover:shadow-card-hover transition-all duration-500 text-center h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-primary rounded-tr-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-primary rounded-bl-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
          
          <div className="relative z-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 group-hover:scale-110 transition-all duration-500">
              <Eye className="text-primary-foreground" size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t.vision.title[lang]}</h2>
            <div className="w-12 h-1 rounded-full gradient-primary mx-auto mb-5 group-hover:w-24 transition-all duration-500" />
            <p className="text-muted-foreground text-lg leading-relaxed">{t.vision.text[lang]}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="right">
        <div className="relative group p-10 rounded-3xl bg-background border border-border hover:shadow-card-hover transition-all duration-500 text-center h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-gold rounded-tr-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-gold rounded-bl-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
          
          <div className="relative z-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-gold mb-6 group-hover:scale-110 transition-all duration-500">
              <Target className="text-white" size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t.mission.title[lang]}</h2>
            <div className="w-12 h-1 rounded-full gradient-gold mx-auto mb-5 group-hover:w-24 transition-all duration-500" />
            <p className="text-muted-foreground text-lg leading-relaxed">{t.mission.text[lang]}</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
</section>

        {/* Values - Modern Grid */}
        <section className="relative py-24 bg-gradient-to-b from-background via-soft to-background overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
               style={{
                 backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)",
                 backgroundSize: "32px 32px",
               }}
          />
          <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 left-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-3 border border-gold/20">
                {lang === "ar" ? "قيمنا" : "Our Values"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {lang === "ar" ? <>الـ<span className="text-gradient-gold">قيم</span> التي نؤمن بها</> : <>What We <span className="text-gradient-gold">Stand For</span></>}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="w-12 h-0.5 bg-primary/40" />
                <div className="w-2 h-2 rounded-full bg-gold" />
                <div className="w-12 h-0.5 bg-primary/40" />
              </div>
            </AnimatedSection>

            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {t.values.items.map((item, i) => {
                const valueIcons = [Shield, HeartHandshake, Sparkles, Users, Lightbulb];
                const Icon = valueIcons[i] || Sparkles;
                return (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group relative h-full"
                    >
                      <div className="relative h-full bg-card rounded-2xl p-6 border border-border hover:border-primary/40 shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-gold to-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute top-2 end-3 text-5xl font-black text-primary/[0.06] leading-none select-none">
                          0{i + 1}
                        </span>
                        <div className="relative flex flex-col items-center text-center">
                          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-2xl gradient-primary opacity-90 group-hover:rotate-6 transition-transform duration-500 shadow-lg" />
                            <div className="absolute inset-1 rounded-xl bg-card flex items-center justify-center">
                              <Icon className="text-primary group-hover:text-gold transition-colors duration-500" size={26} />
                            </div>
                          </div>
                          <h3 className="font-bold text-foreground text-sm md:text-base leading-tight">
                            {item[lang]}
                          </h3>
                          <div className="w-8 h-0.5 bg-gold/50 mt-3 group-hover:w-14 transition-all duration-500" />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Strategic Directions - Parallax */}
        <section
          className="relative py-28 text-primary-foreground overflow-hidden bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${hero1})` }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                {lang === "ar" ? <>التوجهات <span className="text-gradient-gold">الاستراتيجية</span></> : <>Strategic <span className="text-gradient-gold">Directions</span></>}
              </h2>
              <div className="w-16 h-1 rounded-full gradient-gold mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.directions.items.map((item, i) => {
                const Icon = directionIcons[i];
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute top-0 start-0 w-1 h-full gradient-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                          <Icon className="text-gold-foreground" size={22} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gold mb-2 block">0{i + 1}</span>
                          <p className="text-white/90 font-semibold text-sm leading-relaxed">{item[lang]}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Projects — Sira Group signature */}
        <section className="relative py-28 bg-background overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="text-center mb-16 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-4 border border-secondary/20">
                <Sparkles size={14} />
                {lang === "ar" ? "مبادراتنا النوعية" : "Our Signature Initiatives"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
                {lang === "ar" ? <>مشاريع <span className="text-gradient-gold">تُبقي السِّيَر</span> حيّة</> : <>Initiatives that <span className="text-gradient-gold">keep biographies</span> alive</>}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {lang === "ar"
                  ? "ثلاثة محاور تصنع الفارق: التأليف، التوثيق، والترجمة — لإيصال السيرة السعودية إلى العالم."
                  : "Three pillars: writing, documentation, and translation — bringing Saudi biography to the world."}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {t.projects.items.slice(0, 3).map((p: any, i: number) => {
                const Icon = projectIcons[i] || Feather;
                const title = lang === "ar" ? p.titleAr : p.titleEn;
                const desc = lang === "ar" ? p.descAr : p.descEn;
                return (
                  <AnimatedSection key={i} delay={i * 0.12}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="group relative h-full rounded-3xl overflow-hidden bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500"
                    >
                      <div className="relative aspect-[5/3] overflow-hidden">
                        <img
                          src={projectImages[i]}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                        <div className="absolute top-4 start-4 w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shadow-xl">
                          <Icon className="text-gold-foreground" size={22} />
                        </div>
                        <span className="absolute top-4 end-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-secondary text-[11px] font-bold">
                          0{i + 1}
                        </span>
                        <h3 className="absolute bottom-4 inset-x-5 text-white font-bold text-lg md:text-xl leading-tight drop-shadow-lg">
                          {title}
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                          {desc}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-0.5 bg-gradient-to-r from-secondary to-accent group-hover:w-20 transition-all duration-500" />
                          <Link
                            to="/projects"
                            className="inline-flex items-center gap-1 text-secondary text-xs font-bold hover:text-accent transition-colors"
                          >
                            {lang === "ar" ? "اعرف المزيد" : "Learn more"}
                            {lang === "ar" ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection className="text-center mt-14">
              <Link to="/projects">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-secondary/30 text-secondary font-bold hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300"
                >
                  {lang === "ar" ? "استعرض كل المشاريع" : "Explore all projects"}
                  {lang === "ar" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </motion.span>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Editorial quote — cultural signature */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[hsl(215_55%_22%)] via-[hsl(350_55%_28%)] to-[hsl(215_55%_15%)]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-secondary/30 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <Quote className="mx-auto text-gold mb-6 opacity-90" size={56} strokeWidth={1.5} />
              <p className="text-2xl md:text-4xl font-bold text-white leading-[1.7] mb-8 drop-shadow-lg">
                {lang === "ar"
                  ? <>«السِّيرة الذاتية ذاكرةُ أمّةٍ، ومرآةُ هويّةٍ، وجسرٌ يَعبُر بالأعلامِ من <span className="text-gradient-gold">المحلية</span> إلى <span className="text-gradient-gold">العالمية</span>».</>
                  : <>"Biography is a nation's memory, the mirror of identity, a bridge that carries figures from the <span className="text-gradient-gold">local</span> to the <span className="text-gradient-gold">global</span>."</>}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gold/60" />
                <span className="text-gold text-sm font-bold tracking-wider uppercase">
                  {lang === "ar" ? "جماعة السيرة الذاتية الحياتية" : "Sira Group"}
                </span>
                <div className="h-px w-12 bg-gold/60" />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA - Bordered Card */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-3xl mx-auto">
              <motion.div
                whileHover={{ y: -4 }}
                className="text-center p-12 md:p-16 rounded-3xl border-2 border-gold/25 bg-soft shadow-[0_0_40px_rgba(212,175,55,0.08)] hover:shadow-[0_0_60px_rgba(212,175,55,0.15)] hover:border-gold/40 transition-all duration-500"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {lang === "ar" ? <>شاركنا في صناعة <span className="text-gradient-gold">التغيير</span></> : <>Join Us in Making <span className="text-gradient-gold">a Difference</span></>}
                </h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                  {lang === "ar"
                    ? "نؤمن بأن التعاون هو المفتاح لتنمية القطاع غير الربحي. انضم إلينا لبناء مستقبل أفضل."
                    : "We believe collaboration is key to developing the non-profit sector. Join us in building a better future."}
                </p>
                <Link to="/contact" className="inline-block">
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-12 py-5 rounded-full gradient-gold text-gold-foreground font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {t.nav.contact[lang]}
                  </motion.span>
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;