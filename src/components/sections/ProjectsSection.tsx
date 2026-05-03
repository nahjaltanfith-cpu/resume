import { useLang } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    img: project1,
    title: { ar: "برنامج بناء القدرات المؤسسية", en: "Institutional Capacity Building Program" },
    desc: { ar: "تطوير مهارات وقدرات العاملين في القطاع غير الربحي", en: "Developing skills and capacities of non-profit sector workers" },
  },
  {
    img: project2,
    title: { ar: "مشروع التدريب والتأهيل", en: "Training & Development Project" },
    desc: { ar: "تدريب وتأهيل الكوادر البشرية في المنظمات غير الربحية", en: "Training and qualifying human resources in non-profit organizations" },
  },
  {
    img: project3,
    title: { ar: "مبادرة الاستدامة المالية", en: "Financial Sustainability Initiative" },
    desc: { ar: "تعزيز الاستدامة المالية للمنظمات غير الربحية", en: "Enhancing financial sustainability for non-profit organizations" },
  },
];

const ProjectsSection = () => {
  const { lang, t } = useLang();

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.projects.title[lang]}</h2>
          <div className="w-16 h-1 rounded-full bg-accent mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="group rounded-2xl overflow-hidden border border-border bg-background hover:shadow-card-hover transition-all duration-500">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.img}
                    alt={project.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-nama-800/0 group-hover:bg-nama-800/40 transition-colors duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{project.title[lang]}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc[lang]}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
