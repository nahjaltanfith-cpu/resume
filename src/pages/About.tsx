import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Shield,
  HeartHandshake,
  Star,
  Users,
  Lightbulb,
  CheckCircle2,
  Compass,
  Crown,
  User,
  Rocket
} from "lucide-react";
import OrgChart from "@/components/OrgChart";

const valueIcons = [Shield, HeartHandshake, Star, Users, Lightbulb];

const About = () => {
  const { lang, t } = useLang();

  return (
    <PageTransition>
      <SEOHead
        titleAr="عن الجمعية | جمعية دعائم"
        titleEn="About Us | Daaem Association"
        descriptionAr="تعرف على جمعية دعائم - رؤيتنا ورسالتنا وقيمنا وأهدافنا المؤسسية ومجلس الأمناء."
        descriptionEn="Learn about Daaem Association - our vision, mission, values, institutional goals, and Board of Trustees."
      />
      <div className="min-h-screen bg-background selection:bg-nama-600 selection:text-white">
        <PageHero title={t.about.title[lang]} subtitle={t.about.subtitle[lang]} />

        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-nama-600/5 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-500/5 blur-[100px] rounded-full -z-10" />
          
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left">
                <div className="relative">
                  <span className="inline-block py-1 px-4 rounded-full bg-nama-600/10 text-nama-600 text-sm font-bold mb-4 tracking-wider uppercase">
                    {lang === "ar" ? "من نحن" : "Introduction"}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                    {lang === "ar" ? (
                      <>قصـ<span className="text-nama-600">تـنـا</span> و <span className="text-amber-500">أهدافنا</span></>
                    ) : (
                      <>Our <span className="text-nama-600">Story</span> & <span className="text-amber-500">Goals</span></>
                    )}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-xl leading-relaxed italic border-l-4 border-nama-600 pl-4 py-2">
                      {t.about.story[lang]}
                    </p>
                    <p className="text-muted-foreground text-lg leading-loose">
                      {t.about.whoWeAreText[lang]}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection direction="right">
                <div className="grid grid-cols-2 gap-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-nama-600/5 to-amber-500/5 rounded-3xl -m-4 -z-10" />
                  {t.about.whyNamaItems.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10, scale: 1.03 }} 
                      className="p-8 rounded-2xl bg-background border border-border shadow-xl shadow-black/5 group transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-nama-600/10 flex items-center justify-center mb-4 group-hover:bg-nama-600 transition-colors">
                        <CheckCircle2 className="text-nama-600 group-hover:text-white" size={24} />
                      </div>
                      <p className="text-foreground font-bold text-base leading-snug">{item[lang]}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-24 bg-soft/30 relative">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <AnimatedSection direction="left">
                <div className="relative group p-10 rounded-3xl bg-background border border-border hover:shadow-2xl hover:shadow-nama-600/10 transition-all duration-500 text-center h-full overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-nama-600 rounded-tr-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-nama-600 rounded-bl-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
                  
                  <div className="relative z-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-nama-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-nama-600/30">
                      <Eye className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tighter italic">{t.vision.title[lang]}</h2>
                    <div className="w-16 h-1.5 rounded-full bg-nama-600 mx-auto mb-6 group-hover:w-32 transition-all duration-500" />
                    <p className="text-muted-foreground text-xl leading-relaxed font-medium">{t.vision.text[lang]}</p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="relative group p-10 rounded-3xl bg-background border border-border hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 text-center h-full overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-amber-500 rounded-tr-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-amber-500 rounded-bl-3xl transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-3xl pointer-events-none z-10" />
                  
                  <div className="relative z-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500 mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-lg shadow-amber-500/30">
                      <Target className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tighter italic">{t.mission.title[lang]}</h2>
                    <div className="w-16 h-1.5 rounded-full bg-amber-500 mx-auto mb-6 group-hover:w-32 transition-all duration-500" />
                    <p className="text-muted-foreground text-xl leading-relaxed font-medium">{t.mission.text[lang]}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,81,0.03)_0%,transparent_70%)]" />
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
                {lang === "ar" ? <>أهداف <span className="text-nama-600 italic text-transparent bg-clip-text bg-gradient-to-r from-nama-700 to-nama-500">دعائم</span></> : <>Daaem <span className="text-nama-600 italic text-transparent bg-clip-text bg-gradient-to-r from-nama-700 to-nama-500">Goals</span></>}
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">
                {t.associationGoals.intro[lang]}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.associationGoals.items.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(0,166,81,0.02)" }}
                    className="flex items-center gap-5 p-6 rounded-2xl bg-soft/50 border border-nama-600/10 backdrop-blur-sm transition-all h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-nama-600 flex items-center justify-center shrink-0 shadow-lg shadow-nama-600/20">
                      <span className="text-white font-black text-lg">{i + 1}</span>
                    </div>
                    <p className="text-foreground font-semibold leading-relaxed text-[15px]">{item[lang]}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl font-black text-foreground mb-4">
                {lang === "ar" ? "القيم الجوهرية" : "Core Values"}
              </h2>
              <div className="w-24 h-2 bg-gradient-to-r from-nama-600 to-amber-500 rounded-full mx-auto" />
            </AnimatedSection>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {t.values.items.map((item, i) => {
                const Icon = valueIcons[i] || Star;
                return (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <motion.div 
                      whileHover={{ y: -15 }} 
                      className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-soft/40 border border-border shadow-sm hover:shadow-2xl hover:bg-white transition-all"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-black/5 flex items-center justify-center mb-6 group-hover:rotate-[360deg] transition-all duration-700 border border-border">
                        <Icon className="text-amber-500" size={32} />
                      </div>
                      <h3 className="font-black text-lg text-foreground tracking-tight">{item[lang]}</h3>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-soft/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                {lang === "ar" ? <>مجلس <span className="text-amber-500">الإدارة</span></> : <>Board of <span className="text-amber-500">Directors</span></>}
              </h2>
              <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-sm italic">Leaders driving innovation</p>
            </AnimatedSection>

            <div className="flex justify-center mb-16">
              <AnimatedSection>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group w-full max-w-md text-center p-10 rounded-[3rem] bg-white border-4 border-nama-600 shadow-2xl"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-nama-600 rounded-3xl rotate-45 flex items-center justify-center shadow-lg">
                    <Crown className="text-white -rotate-45" size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mt-6 mb-2">
                    {t.boardOfDirectors.members[0].name[lang]}
                  </h3>
                  <div className="inline-block px-4 py-1 bg-nama-600 text-white rounded-full font-bold text-xs uppercase tracking-widest mb-4">
                    {t.boardOfDirectors.members[0].role[lang]}
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.boardOfDirectors.members.slice(1).map((member, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="h-full flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border shadow-xl hover:border-nama-600/50 transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-soft flex items-center justify-center mb-6">
                      <User className="text-nama-600" size={30} />
                    </div>
                    {member.title[lang] && (
                      <span className="text-[10px] font-black uppercase text-nama-600 tracking-tighter mb-2 px-2 py-0.5 bg-nama-50 rounded">
                        {member.title[lang]}
                      </span>
                    )}
                    <h3 className="font-bold text-foreground mb-2 text-base">{member.name[lang]}</h3>
                    <p className="text-muted-foreground text-xs font-bold italic">{member.role[lang]}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="text-amber-500" size={32} />
                <h2 className="text-4xl font-black text-foreground">
                  {lang === "ar" ? "أعضاء الجمعية" : "Association Members"}
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {t.associationMembers.members.map((member, i) => (
                <AnimatedSection key={i} delay={i * 0.04}>
                  <motion.div
                    whileHover={{ x: 5, backgroundColor: "rgba(0, 166, 81, 0.05)" }}
                    className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white transition-all shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-nama-600 flex items-center justify-center font-black text-xs text-white shadow-sm">
                      {i + 1}
                    </div>
                    <p className="font-bold text-foreground text-sm">{member[lang]}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden bg-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,166,81,0.05),transparent_70%)]" />
          <div className="container mx-auto px-4 max-w-3xl relative z-10">
            <AnimatedSection>
              <div className="p-1 w-full rounded-[2.5rem] bg-gradient-to-br from-nama-600 via-nama-400 to-amber-400 shadow-xl">
                <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[2.4rem] text-center">
                  <div className="inline-flex w-16 h-16 rounded-full bg-nama-600/10 items-center justify-center mb-6 border border-nama-600/20">
                    <Compass className="text-nama-600" size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
                    {lang === "ar" ? <>اللجنة <span className="text-amber-500">التنفيذية</span></> : <>Executive <span className="text-amber-500">Committee</span></>}
                  </h2>
                  <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto font-light italic">
                    {t.about.executiveCommittee.desc[lang]}
                  </p>
                
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-24 bg-soft/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                {lang === "ar" ? <>الهيكل <span className="text-gradient-gold">التنظيمي</span></> : <>Organizational <span className="text-gradient-gold">Structure</span></>}
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full gradient-gold" />
            </AnimatedSection>
            <AnimatedSection>
              <div className="p-6 md:p-10 rounded-3xl bg-white border border-border shadow-xl overflow-x-auto">
                <OrgChart />
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;