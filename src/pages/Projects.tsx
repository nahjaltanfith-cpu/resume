import { useLang } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { GraduationCap, Languages, Sparkles, Award, BookOpen } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { translations } from "@/i18n/translations";
import courseCommunication from "@/assets/course-communication.png";
import courseEnglish from "@/assets/course-english.png";
import courseExcellence from "@/assets/course-excellence.png";

const fallbackImages = [courseCommunication, courseEnglish, courseExcellence];
const courseIcons = [GraduationCap, Languages, Sparkles, BookOpen, Award];

const getProjectsData = (content: any) => {
  const def: any = (translations as any).projects;
  const items = Array.isArray(content?.projects?.items) && content.projects.items.length
    ? content.projects.items
    : def.items;
  return { def, items };
};

const Projects = () => {
  const { lang, t } = useLang();
  const { content } = useSiteContent();
  const { def, items } = getProjectsData(content);

  const get = (key: string, fallback: string) =>
    content?.projects?.[key]?.[lang] || def[key]?.[lang] || fallback;

  return (
    <PageTransition>
      <SEOHead
        titleAr="المشاريع والدورات | جماعة السيرة الذاتية الحياتية"
        titleEn="Projects & Courses | Sira Group"
        descriptionAr="مشاريع ومبادرات جماعة السيرة الذاتية الحياتية: ورش كتابة السيرة الذاتية، قاعدة بيانات السير السعودية، ترجمة السير الذاتية."
        descriptionEn="Sira Group training courses: communication skills, English learning, and academic excellence techniques."
      />
      <div className="min-h-screen">
        <PageHero title={t.projects.title[lang]} subtitle={t.projects.subtitle[lang]} />

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                <Award size={14} />
                {get("sectionBadge", lang === "ar" ? "دوراتنا التدريبية" : "Our Training Courses")}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                {get("sectionTitleStart", "")}{" "}
                <span className="text-gradient-gold">
                  {get("sectionTitleHighlight", "")}
                </span>{" "}
                {get("sectionTitleEnd", "")}
              </h2>
              <div className="w-20 h-1 mx-auto mt-5 rounded-full gradient-gold" />
            </AnimatedSection>

            <div className="space-y-16">
              {items.map((course: any, i: number) => {
                const Icon = courseIcons[i % courseIcons.length];
                const reverse = i % 2 === 1;
                const titleAr = course.titleAr || course.title?.ar || "";
                const titleEn = course.titleEn || course.title?.en || "";
                const descAr = course.descAr || course.desc?.ar || "";
                const descEn = course.descEn || course.desc?.en || "";
                const imgSrc = course.image && course.image.length > 0
                  ? course.image
                  : fallbackImages[i % fallbackImages.length];
                const courseTitle = lang === "ar" ? titleAr : titleEn;
                const courseDesc = lang === "ar" ? descAr : descEn;

                return (
                  <AnimatedSection key={i} delay={i * 0.05}>
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                        reverse ? "lg:[direction:rtl]" : ""
                      }`}
                    >
                      {/* Image */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        className="relative group [direction:ltr]"
                      >
                        <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 via-gold/15 to-primary/20 rounded-[1.75rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="relative rounded-[1.75rem] overflow-hidden border-4 border-card shadow-2xl bg-card">
                          <img
                            src={imgSrc}
                            alt={courseTitle}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-xl rotate-6 group-hover:rotate-0 transition-transform">
                          <span className="text-primary-foreground font-bold text-base">{i + 1}</span>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div
                        className="space-y-3 [direction:rtl]"
                        dir={lang === "ar" ? "rtl" : "ltr"}
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-[11px] font-bold uppercase tracking-wider">
                          <Icon size={12} />
                          {get("courseTag", lang === "ar" ? "دورة تدريبية" : "Training Course")}
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold text-foreground leading-snug">
                          {courseTitle}
                        </h3>
                        <div className="w-12 h-0.5 rounded-full gradient-gold" />
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {courseDesc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-semibold border border-primary/10">
                            {get("tagEducation", lang === "ar" ? "تعليم" : "Education")}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg bg-gold/5 text-gold text-xs font-semibold border border-gold/10">
                            {get("tagSkill", lang === "ar" ? "تطوير المهارات" : "Skill Development")}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-semibold border border-primary/10">
                            {get("tagLocation", lang === "ar" ? "الرياض" : "Riyadh")}
                          </span>
                        </div>
                      </div>
                    </div>
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

export default Projects;
