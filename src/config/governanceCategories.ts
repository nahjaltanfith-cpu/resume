export type GovernanceCategoryDef = {
  key: string;
  title_ar: string;
  title_en: string;
  desc_ar?: string;
  desc_en?: string;
};

export const GOVERNANCE_CATEGORIES: GovernanceCategoryDef[] = [
  {
    key: "board_minutes",
    title_ar: "محاضر مجلس الإدارة",
    title_en: "Board of Directors Minutes",
    desc_ar: "محاضر اجتماعات مجلس الإدارة والقرارات والسياسات المعتمدة",
    desc_en: "Board meeting minutes, resolutions and approved policies",
  },
  {
    key: "assembly_minutes",
    title_ar: "محاضر الجمعية العمومية",
    title_en: "General Assembly Minutes",
    desc_ar: "محاضر اجتماعات الجمعية العمومية والآليات والإجراءات المعتمدة",
    desc_en: "General Assembly minutes, mechanisms and approved procedures",
  },
  {
    key: "strategic_plans",
    title_ar: "الخطط الاستراتيجية",
    title_en: "Strategic Plans",
    desc_ar: "الخطط الاستراتيجية للجمعية وتوجهاتها المستقبلية",
    desc_en: "Association's strategic plans and future directions",
  },
  {
    key: "operational_plan",
    title_ar: "الخطة التشغيلية",
    title_en: "Operational Plan",
    desc_ar: "الخطة التشغيلية السنوية والبرامج التنفيذية",
    desc_en: "Annual operational plan and executive programs",
  },
  {
    key: "budget",
    title_ar: "الموازنة التقديرية",
    title_en: "Estimated Budget",
    desc_ar: "الموازنة التقديرية السنوية والتخطيط المالي",
    desc_en: "Annual estimated budget and financial planning",
  },
  {
    key: "satisfaction",
    title_ar: "نتائج قياس الرضا",
    title_en: "Satisfaction Measurement Results",
    desc_ar: "نتائج استبيانات قياس رضا المستفيدين والمتبرعين والشركاء",
    desc_en: "Satisfaction survey results from beneficiaries, donors and partners",
  },
  {
    key: "financial_statements",
    title_ar: "القوائم المالية",
    title_en: "Financial Statements",
    desc_ar: "القوائم المالية واللوائح والسياسات المالية المعتمدة",
    desc_en: "Financial statements, regulations and approved financial policies",
  },
];
