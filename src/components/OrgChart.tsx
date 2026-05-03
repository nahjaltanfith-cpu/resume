import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

type Node = { ar: string; en: string; variant?: "primary" | "gold" | "soft" };

const OrgChart = () => {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const NodeBox = ({
    node,
    className = "",
  }: {
    node: Node;
    className?: string;
  }) => {
    const variant = node.variant || "primary";
    const styles = {
      primary:
        "bg-gradient-to-br from-primary to-secondary text-primary-foreground border-primary/30 shadow-lg shadow-primary/25",
      gold: "bg-gradient-to-br from-gold to-gold-light text-gold-foreground border-gold/30 shadow-lg shadow-gold/25",
      soft: "bg-primary/10 text-primary border-primary/30",
    }[variant];
    return (
      <motion.div
        whileHover={{ y: -3, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`relative px-4 py-3 rounded-xl border-2 font-bold text-center text-sm md:text-base ${styles} ${className}`}
      >
        {isAr ? node.ar : node.en}
      </motion.div>
    );
  };

  const sections = [
    {
      title: { ar: "إدارة المشاريع", en: "Projects Department" },
      items: [
        { ar: "قسم التعليم", en: "Education" },
        { ar: "قسم التطوير", en: "Development" },
        { ar: "قسم تعزيز القيم", en: "Values Promotion" },
        { ar: "قسم الدعم الأكاديمي", en: "Academic Support" },
      ],
    },
    {
      title: { ar: "إدارة الاتصال والتسويق", en: "Communications & Marketing" },
      items: [
        { ar: "قسم الاتصال والشراكات", en: "Communications & Partnerships" },
        { ar: "قسم الإعلام والتسويق", en: "Media & Marketing" },
        { ar: "قسم تنمية الموارد المالية", en: "Resource Development" },
      ],
    },
    {
      title: { ar: "إدارة الشؤون الإدارية والمالية", en: "Administrative & Financial" },
      items: [
        { ar: "قسم الموارد البشرية", en: "Human Resources" },
        { ar: "قسم الشؤون المالية", en: "Financial Affairs" },
        { ar: "قسم الخدمات المساندة", en: "Support Services" },
        { ar: "قسم تقنية المعلومات", en: "Information Technology" },
      ],
    },
  ];

  return (
    <div className="w-full" dir={isAr ? "rtl" : "ltr"}>
      {/* Top Tier */}
      <div className="flex flex-col items-center gap-3">
        <NodeBox node={{ ar: "الجمعية العمومية", en: "General Assembly" }} className="min-w-[220px]" />
        <div className="w-0.5 h-6 bg-primary/40" />
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:block flex-1 h-0.5 bg-primary/30" />
          <NodeBox node={{ ar: "مجلس الإدارة", en: "Board of Directors" }} className="min-w-[220px]" />
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-0.5 bg-primary/30" />
            <NodeBox
              node={{ ar: "المراجعة الداخلية", en: "Internal Audit", variant: "soft" }}
              className="min-w-[160px] !text-xs md:!text-sm"
            />
          </div>
        </div>
        <div className="w-0.5 h-6 bg-primary/40" />
        <NodeBox node={{ ar: "المدير التنفيذي", en: "Executive Director", variant: "gold" }} className="min-w-[220px]" />

        {/* Support units */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <NodeBox
            node={{ ar: "وحدة التميّز المؤسسي", en: "Institutional Excellence", variant: "soft" }}
            className="!text-xs md:!text-sm"
          />
          <NodeBox
            node={{ ar: "وحدة التطوع", en: "Volunteering Unit", variant: "soft" }}
            className="!text-xs md:!text-sm"
          />
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center my-6">
        <div className="w-0.5 h-8 bg-primary/40" />
      </div>

      {/* Three management columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative">
        {/* horizontal line on top (desktop) */}
        <div className="hidden md:block absolute top-0 left-[16.66%] right-[16.66%] h-0.5 bg-primary/30 -translate-y-6" />
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="hidden md:block w-0.5 h-6 bg-primary/30 -mt-6" />
            <NodeBox node={sec.title} className="w-full max-w-xs" />
            <div className="w-0.5 h-3 bg-primary/30" />
            <div className="w-full max-w-xs space-y-2">
              {sec.items.map((it, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-primary/30 shrink-0" />
                  <div className="flex-1 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15 text-foreground font-semibold text-xs md:text-sm text-center">
                    {isAr ? it.ar : it.en}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrgChart;
