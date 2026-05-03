import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Home, Info, Shield, Users, FileText, Phone, Globe,
  LogOut, Save, Loader2, ChevronLeft, Image, Target, Eye, Star, Compass,
  BarChart3, UserCheck, Settings, Menu, BookOpen
} from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { translations } from "@/i18n/translations";
import { toast } from "sonner";
import { BiField, SingleField, AddButton } from "@/components/admin/AdminFields";
import FileUpload from "@/components/admin/FileUpload";
import DocsManager from "@/components/admin/DocsManager";

type TabId = "general" | "hero" | "vision" | "values" | "directions" | "workAreas" | "impact" | "about" | "goals" | "board" | "governance" | "reports" | "projects" | "contact" | "footer";

const tabs: { id: TabId; label: string; icon: any }[] = [
  { id: "general", label: "عام", icon: Settings },
  { id: "hero", label: "الرئيسية", icon: Home },
  { id: "vision", label: "الرؤية والرسالة", icon: Eye },
  { id: "values", label: "القيم", icon: Star },
  { id: "directions", label: "التوجهات", icon: Compass },
  { id: "workAreas", label: "مجالات العمل", icon: Globe },
  { id: "impact", label: "الأثر", icon: BarChart3 },
  { id: "about", label: "عن الجمعية", icon: Info },
  { id: "goals", label: "الأهداف", icon: Target },
  { id: "board", label: "مجلس الإدارة والأعضاء", icon: Users },
  { id: "governance", label: "الحوكمة", icon: Shield },
  { id: "reports", label: "التقارير", icon: FileText },
  { id: "projects", label: "الدورات والمشاريع", icon: BookOpen },
  { id: "contact", label: "التواصل", icon: Phone },
  { id: "footer", label: "الفوتر", icon: FileText },
];

// Helpers
function getVal(content: any, path: string, lang: "ar" | "en", defaults: any): string {
  const parts = path.split(".");
  let val = content;
  for (const p of parts) val = val?.[p];
  if (val?.[lang] !== undefined && val[lang] !== "") return val[lang];
  let def = defaults;
  for (const p of parts) def = def?.[p];
  return def?.[lang] || "";
}

function setNestedVal(obj: any, path: string, lang: "ar" | "en", value: string) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  const lastKey = parts[parts.length - 1];
  if (!current[lastKey]) current[lastKey] = {};
  current[lastKey][lang] = value;
}

function getArrayItems(content: any, path: string, defaults: any): any[] {
  const parts = path.split(".");
  let val = content;
  for (const p of parts) val = val?.[p];
  if (Array.isArray(val)) return val;
  let def = defaults;
  for (const p of parts) def = def?.[p];
  return def ? JSON.parse(JSON.stringify(def)) : [];
}

function setArrayItems(obj: any, path: string, items: any[]) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = items;
}

function getArrayVal(content: any, path: string, index: number, field: string | null, lang: "ar" | "en", defaults: any): string {
  const items = getArrayItems(content, path, defaults);
  if (!items[index]) return "";
  if (field) return items[index]?.[field]?.[lang] || "";
  return items[index]?.[lang] || "";
}

function setArrayVal(obj: any, path: string, index: number, field: string | null, lang: "ar" | "en", value: string) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  const arrKey = parts[parts.length - 1];
  if (!Array.isArray(current[arrKey])) {
    let def: any = translations;
    for (const p of parts) def = def?.[p];
    current[arrKey] = def ? JSON.parse(JSON.stringify(def)) : [];
  }
  if (!current[arrKey][index]) current[arrKey][index] = {};
  if (field) {
    if (!current[arrKey][index][field]) current[arrKey][index][field] = {};
    current[arrKey][index][field][lang] = value;
  } else {
    if (typeof current[arrKey][index] !== "object") current[arrKey][index] = {};
    current[arrKey][index][lang] = value;
  }
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { content, updateContent, loading: contentLoading } = useSiteContent();
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [lc, setLc] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") navigate("/admin-2030");
  }, [navigate]);

  useEffect(() => {
    setLc(JSON.parse(JSON.stringify(content || {})));
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    const success = await updateContent(lc);
    setSaving(false);
    if (success) toast.success("تم حفظ التغييرات بنجاح! ✅");
    else toast.error("حدث خطأ أثناء الحفظ");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin-2030");
  };

  const clone = () => JSON.parse(JSON.stringify(lc));

  const getBi = (path: string) => ({
    arValue: getVal(lc, path, "ar", translations),
    enValue: getVal(lc, path, "en", translations),
    onArChange: (v: string) => { const c = clone(); setNestedVal(c, path, "ar", v); setLc(c); },
    onEnChange: (v: string) => { const c = clone(); setNestedVal(c, path, "en", v); setLc(c); },
  });

  const getArr = (path: string, index: number, field: string | null = null) => ({
    arValue: getArrayVal(lc, path, index, field, "ar", translations),
    enValue: getArrayVal(lc, path, index, field, "en", translations),
    onArChange: (v: string) => { const c = clone(); setArrayVal(c, path, index, field, "ar", v); setLc(c); },
    onEnChange: (v: string) => { const c = clone(); setArrayVal(c, path, index, field, "en", v); setLc(c); },
  });

  const addArrayItem = (path: string, template: any) => {
    const c = clone();
    const items = getArrayItems(c, path, translations);
    items.push(JSON.parse(JSON.stringify(template)));
    setArrayItems(c, path, items);
    setLc(c);
  };

  const removeArrayItem = (path: string, index: number) => {
    const c = clone();
    const items = getArrayItems(c, path, translations);
    items.splice(index, 1);
    setArrayItems(c, path, items);
    setLc(c);
  };

  const getItems = (path: string) => getArrayItems(lc, path, translations);

  const renderSection = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4">
            <SectionTitle icon="⚙️" title="الإعدادات العامة" />
            <FileUpload
              label="شعار الجمعية (اللوجو)"
              currentUrl={lc.logo_url}
              folder="logo"
              type="image"
              accept="image/*"
              onUploaded={(url) => setLc({ ...lc, logo_url: url })}
              onRemove={() => setLc({ ...lc, logo_url: "" })}
            />
            <SingleField label="البريد الإلكتروني" value={lc.contact_email || ""} onChange={(v) => setLc({ ...lc, contact_email: v })} placeholder="life.group@gmail.com" />
            <SingleField label="الموقع (عربي)" value={lc.contact_location_ar || ""} onChange={(v) => setLc({ ...lc, contact_location_ar: v })} dir="rtl" />
            <SingleField label="Location (English)" value={lc.contact_location_en || ""} onChange={(v) => setLc({ ...lc, contact_location_en: v })} />

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-foreground px-1">صور الهيرو</h4>
              {(lc.hero_images || []).map((url: string, i: number) => (
                <FileUpload
                  key={i}
                  label={`صورة Hero ${i + 1}`}
                  currentUrl={url}
                  folder="hero"
                  type="image"
                  accept="image/*"
                  onUploaded={(newUrl) => {
                    const imgs = [...(lc.hero_images || [])];
                    imgs[i] = newUrl;
                    setLc({ ...lc, hero_images: imgs });
                  }}
                  onRemove={() => {
                    const imgs = [...(lc.hero_images || [])];
                    imgs.splice(i, 1);
                    setLc({ ...lc, hero_images: imgs });
                  }}
                />
              ))}
              <AddButton label="إضافة صورة Hero" onClick={() => setLc({ ...lc, hero_images: [...(lc.hero_images || []), ""] })} />
            </div>

            <FileUpload
              label="صورة المشاريع"
              currentUrl={lc.project_image}
              folder="projects"
              type="image"
              accept="image/*"
              onUploaded={(url) => setLc({ ...lc, project_image: url })}
              onRemove={() => setLc({ ...lc, project_image: "" })}
            />

            <FileUpload
              label="PDF اللائحة الأساسية"
              currentUrl={lc.governance_pdf}
              folder="pdfs"
              type="pdf"
              accept=".pdf"
              onUploaded={(url) => setLc({ ...lc, governance_pdf: url })}
              onRemove={() => setLc({ ...lc, governance_pdf: "" })}
            />

            <FileUpload
              label="PDF قرار التأسيس"
              currentUrl={lc.reports_pdf}
              folder="pdfs"
              type="pdf"
              accept=".pdf"
              onUploaded={(url) => setLc({ ...lc, reports_pdf: url })}
              onRemove={() => setLc({ ...lc, reports_pdf: "" })}
            />
          </div>
        );

      case "hero":
        return (
          <div className="space-y-4">
            <SectionTitle icon="🏠" title="قسم الهيرو" />
            <BiField label="العنوان الرئيسي" {...getBi("hero.title")} />
            <BiField label="العنوان الفرعي" {...getBi("hero.subtitle")} />
            <BiField label="الوصف" {...getBi("hero.description")} multiline />
            <BiField label="زر 1 (تعرف علينا)" {...getBi("hero.cta1")} />
            <BiField label="زر 2 (مشاريعنا)" {...getBi("hero.cta2")} />
          </div>
        );

      case "vision":
        return (
          <div className="space-y-4">
            <SectionTitle icon="👁️" title="الرؤية والرسالة" />
            <BiField label="عنوان الرؤية" {...getBi("vision.title")} />
            <BiField label="نص الرؤية" {...getBi("vision.text")} multiline />
            <BiField label="عنوان الرسالة" {...getBi("mission.title")} />
            <BiField label="نص الرسالة" {...getBi("mission.text")} multiline />
          </div>
        );

      case "values":
        return (
          <div className="space-y-4">
            <SectionTitle icon="⭐" title="القيم" />
            <BiField label="عنوان القيم" {...getBi("values.title")} />
            {getItems("values.items").map((_, i) => (
              <div key={i} className="relative group">
                <BiField label={`القيمة ${i + 1}`} {...getArr("values.items", i)} />
                <RemoveBtn onClick={() => removeArrayItem("values.items", i)} />
              </div>
            ))}
            <AddButton label="إضافة قيمة جديدة" onClick={() => addArrayItem("values.items", { ar: "", en: "" })} />
          </div>
        );

      case "directions":
        return (
          <div className="space-y-4">
            <SectionTitle icon="🧭" title="التوجهات الاستراتيجية" />
            <BiField label="العنوان" {...getBi("directions.title")} />
            {getItems("directions.items").map((_, i) => (
              <div key={i} className="relative group">
                <BiField label={`التوجه ${i + 1}`} {...getArr("directions.items", i)} />
                <RemoveBtn onClick={() => removeArrayItem("directions.items", i)} />
              </div>
            ))}
            <AddButton label="إضافة توجه جديد" onClick={() => addArrayItem("directions.items", { ar: "", en: "" })} />
          </div>
        );

      case "workAreas":
        return (
          <div className="space-y-4">
            <SectionTitle icon="🌐" title="مجالات العمل" />
            <BiField label="العنوان" {...getBi("workAreas.title")} />
            {getItems("workAreas.items").map((_, i) => (
              <div key={i} className="relative group p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-primary text-sm font-bold">المجال {i + 1}</p>
                  <RemoveBtn onClick={() => removeArrayItem("workAreas.items", i)} inline />
                </div>
                <BiField label="الاسم" {...getArr("workAreas.items", i, "title")} />
                <BiField label="الوصف" {...getArr("workAreas.items", i, "desc")} multiline />
              </div>
            ))}
            <AddButton label="إضافة مجال عمل" onClick={() => addArrayItem("workAreas.items", { title: { ar: "", en: "" }, desc: { ar: "", en: "" } })} />
          </div>
        );

      case "impact":
        return (
          <div className="space-y-4">
            <SectionTitle icon="📊" title="الأثر بالأرقام" />
            <BiField label="العنوان" {...getBi("impact.title")} />
            <BiField label="العنوان الفرعي" {...getBi("impact.subtitle")} multiline />
            {getItems("impact.items").map((item, i) => (
              <div key={i} className="relative group p-4 rounded-xl border border-amber-500/20 bg-amber-50 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-amber-700 text-sm font-bold">رقم {i + 1}</p>
                  <RemoveBtn onClick={() => removeArrayItem("impact.items", i)} inline />
                </div>
                <BiField label="التسمية" {...getArr("impact.items", i, "label")} />
                <SingleField
                  label="القيمة العددية"
                  type="number"
                  value={String(item.value ?? 0)}
                  onChange={(v) => {
                    const c = clone();
                    const items = getArrayItems(c, "impact.items", translations);
                    if (!items[i]) items[i] = {};
                    items[i].value = parseInt(v) || 0;
                    setArrayItems(c, "impact.items", items);
                    setLc(c);
                  }}
                />
              </div>
            ))}
            <AddButton label="إضافة رقم جديد" onClick={() => addArrayItem("impact.items", { value: 0, label: { ar: "", en: "" } })} />
          </div>
        );

      case "about":
        return (
          <div className="space-y-4">
            <SectionTitle icon="ℹ️" title="عن الجمعية" />
            <BiField label="العنوان" {...getBi("about.title")} />
            <BiField label="العنوان الفرعي" {...getBi("about.subtitle")} multiline />
            <BiField label="من نحن" {...getBi("about.whoWeAre")} />
            <BiField label="نص من نحن" {...getBi("about.whoWeAreText")} multiline />
            <BiField label="لماذا جماعة السيرة" {...getBi("about.whyNama")} />
            <BiField label="قصة التأسيس" {...getBi("about.story")} multiline />
            <h4 className="text-sm font-bold text-foreground px-1 pt-4">لماذا جماعة السيرة - النقاط</h4>
            {getItems("about.whyNamaItems").map((_, i) => (
              <div key={i} className="relative group">
                <BiField label={`ميزة ${i + 1}`} {...getArr("about.whyNamaItems", i)} />
                <RemoveBtn onClick={() => removeArrayItem("about.whyNamaItems", i)} />
              </div>
            ))}
            <AddButton label="إضافة ميزة" onClick={() => addArrayItem("about.whyNamaItems", { ar: "", en: "" })} />

            <h4 className="text-sm font-bold text-foreground px-1 pt-4">التوجهات الاستراتيجية</h4>
            {getItems("about.strategicDirections.items").map((_, i) => (
              <div key={i} className="relative group">
                <BiField label={`التوجه ${i + 1}`} {...getArr("about.strategicDirections.items", i)} />
                <RemoveBtn onClick={() => removeArrayItem("about.strategicDirections.items", i)} />
              </div>
            ))}
            <AddButton label="إضافة توجه" onClick={() => addArrayItem("about.strategicDirections.items", { ar: "", en: "" })} />

            <h4 className="text-sm font-bold text-foreground px-1 pt-4">الأهداف الاستراتيجية</h4>
            {getItems("about.strategicGoals.items").map((_, i) => (
              <div key={i} className="relative group">
                <BiField label={`الهدف ${i + 1}`} {...getArr("about.strategicGoals.items", i)} />
                <RemoveBtn onClick={() => removeArrayItem("about.strategicGoals.items", i)} />
              </div>
            ))}
            <AddButton label="إضافة هدف" onClick={() => addArrayItem("about.strategicGoals.items", { ar: "", en: "" })} />

            <h4 className="text-sm font-bold text-foreground px-1 pt-4">اللجنة التنفيذية</h4>
            <BiField label="الوصف" {...getBi("about.executiveCommittee.desc")} multiline />
          </div>
        );

      case "goals":
        return (
          <div className="space-y-4">
            <SectionTitle icon="🎯" title="أهداف الجمعية" />
            <BiField label="العنوان" {...getBi("associationGoals.title")} />
            <BiField label="المقدمة" {...getBi("associationGoals.intro")} multiline />
            {getItems("associationGoals.items").map((_, i) => (
              <div key={i} className="relative group">
                <BiField label={`الهدف ${i + 1}`} {...getArr("associationGoals.items", i)} />
                <RemoveBtn onClick={() => removeArrayItem("associationGoals.items", i)} />
              </div>
            ))}
            <AddButton label="إضافة هدف" onClick={() => addArrayItem("associationGoals.items", { ar: "", en: "" })} />
          </div>
        );

      case "board":
        return (
          <div className="space-y-4">
            <SectionTitle icon="👥" title="مجلس الإدارة والأعضاء" />
            <h4 className="text-sm font-bold text-primary px-1">مجلس الإدارة</h4>
            {getItems("boardOfDirectors.members").map((_, i) => (
              <div key={i} className="relative group p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-primary text-sm font-bold">عضو {i + 1}</p>
                  <RemoveBtn onClick={() => removeArrayItem("boardOfDirectors.members", i)} inline />
                </div>
                <BiField label="الاسم" {...getArr("boardOfDirectors.members", i, "name")} />
                <BiField label="المنصب" {...getArr("boardOfDirectors.members", i, "role")} />
                <BiField label="اللقب" {...getArr("boardOfDirectors.members", i, "title")} />
              </div>
            ))}
            <AddButton label="إضافة عضو مجلس إدارة" onClick={() => addArrayItem("boardOfDirectors.members", { name: { ar: "", en: "" }, role: { ar: "", en: "" }, title: { ar: "", en: "" } })} />


            <h4 className="text-sm font-bold text-foreground px-1 pt-6">أعضاء الجمعية</h4>
            {getItems("associationMembers.members").map((_, i) => (
              <div key={i} className="relative group">
                <BiField label={`العضو ${i + 1}`} {...getArr("associationMembers.members", i)} />
                <RemoveBtn onClick={() => removeArrayItem("associationMembers.members", i)} />
              </div>
            ))}
            <AddButton label="إضافة عضو" onClick={() => addArrayItem("associationMembers.members", { ar: "", en: "" })} />
          </div>
        );



      case "governance":
        return (
          <div className="space-y-4">
            <SectionTitle icon="🛡️" title="الحوكمة" />
            <div className="p-4 rounded-xl border border-border bg-white space-y-3">
              <h4 className="text-sm font-bold text-foreground">اللائحة الأساسية (المستند الرئيسي)</h4>
              <p className="text-xs text-muted-foreground">يمكنك رفع/تغيير الملف من تبويب "عام"، أو إخفاء القسم بالكامل من الموقع.</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!lc.governance_pdf_hidden}
                  onChange={(e) => setLc({ ...lc, governance_pdf_hidden: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">إخفاء قسم اللائحة الأساسية من الموقع</span>
              </label>
            </div>
            <SectionTitle icon="📚" title="مكتبة مستندات الحوكمة" />
            <DocsManager
              docs={lc.governance_docs || []}
              onChange={(next) => setLc({ ...lc, governance_docs: next })}
              accent="amber"
              itemLabel="مستند"
              categories={[
                { key: "board_minutes", label: "محاضر مجلس الإدارة" },
                { key: "assembly_minutes", label: "محاضر الجمعية العمومية" },
                { key: "strategic_plans", label: "الخطط الاستراتيجية" },
                { key: "operational_plan", label: "الخطة التشغيلية" },
                { key: "budget", label: "الموازنة التقديرية" },
                { key: "satisfaction", label: "نتائج قياس الرضا" },
                { key: "financial_statements", label: "القوائم المالية" },
              ]}
            />
          </div>
        );

      case "reports":
        return (
          <div className="space-y-4">
            <SectionTitle icon="📄" title="التقارير" />
            <div className="p-4 rounded-xl border border-border bg-white space-y-3">
              <h4 className="text-sm font-bold text-foreground">قرار التأسيس (المستند الرئيسي)</h4>
              <p className="text-xs text-muted-foreground">يمكنك رفع/تغيير الملف من تبويب "عام"، أو إخفاء القسم بالكامل من الموقع.</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!lc.reports_pdf_hidden}
                  onChange={(e) => setLc({ ...lc, reports_pdf_hidden: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">إخفاء قسم قرار التأسيس من الموقع</span>
              </label>
            </div>
            <SectionTitle icon="📚" title="مكتبة التقارير والمستندات" />
            <DocsManager
              docs={lc.reports_docs || []}
              onChange={(next) => setLc({ ...lc, reports_docs: next })}
              accent="primary"
              itemLabel="تقرير"
              categories={[
                { key: "assessments", label: "التقييمات والدراسات" },
                { key: "financial_policies", label: "السياسات المالية والتبرعات" },
                { key: "annual", label: "التقارير السنوية" },
                { key: "financial", label: "التقارير المالية" },
              ]}
            />
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            <SectionTitle icon="📚" title="الدورات والمشاريع" />
            <BiField label="عنوان الصفحة" {...getBi("projects.title")} />
            <BiField label="العنوان الفرعي" {...getBi("projects.subtitle")} multiline />
            <BiField label="شارة القسم" {...getBi("projects.sectionBadge")} />
            <BiField label="عنوان القسم - بداية" {...getBi("projects.sectionTitleStart")} />
            <BiField label="عنوان القسم - تمييز" {...getBi("projects.sectionTitleHighlight")} />
            <BiField label="عنوان القسم - نهاية" {...getBi("projects.sectionTitleEnd")} />
            <BiField label="وسم الدورة" {...getBi("projects.courseTag")} />

            <div className="space-y-4 mt-6">
              <h4 className="text-sm font-bold text-foreground px-1">قائمة الدورات</h4>
              {getItems("projects.items").map((item: any, i: number) => (
                <div key={i} className="relative group p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-primary text-sm font-bold">دورة {i + 1}</p>
                    <RemoveBtn onClick={() => removeArrayItem("projects.items", i)} inline />
                  </div>

                  <FileUpload
                    label="صورة الدورة"
                    currentUrl={item.image || ""}
                    folder="courses"
                    type="image"
                    accept="image/*"
                    onUploaded={(url) => {
                      const c = clone();
                      const arr = getArrayItems(c, "projects.items", translations);
                      arr[i] = { ...arr[i], image: url };
                      setArrayItems(c, "projects.items", arr);
                      setLc(c);
                    }}
                    onRemove={() => {
                      const c = clone();
                      const arr = getArrayItems(c, "projects.items", translations);
                      arr[i] = { ...arr[i], image: "" };
                      setArrayItems(c, "projects.items", arr);
                      setLc(c);
                    }}
                  />

                  <div className="space-y-2 p-4 rounded-xl bg-white border border-border">
                    <label className="text-sm font-semibold text-foreground">العنوان</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-bold text-primary mb-1 block">عربي</span>
                        <input
                          value={item.titleAr || ""}
                          onChange={(e) => {
                            const c = clone();
                            const arr = getArrayItems(c, "projects.items", translations);
                            arr[i] = { ...arr[i], titleAr: e.target.value };
                            setArrayItems(c, "projects.items", arr);
                            setLc(c);
                          }}
                          dir="rtl"
                          className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-600 mb-1 block">English</span>
                        <input
                          value={item.titleEn || ""}
                          onChange={(e) => {
                            const c = clone();
                            const arr = getArrayItems(c, "projects.items", translations);
                            arr[i] = { ...arr[i], titleEn: e.target.value };
                            setArrayItems(c, "projects.items", arr);
                            setLc(c);
                          }}
                          dir="ltr"
                          className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 p-4 rounded-xl bg-white border border-border">
                    <label className="text-sm font-semibold text-foreground">الوصف</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-bold text-primary mb-1 block">عربي</span>
                        <textarea
                          value={item.descAr || ""}
                          rows={4}
                          onChange={(e) => {
                            const c = clone();
                            const arr = getArrayItems(c, "projects.items", translations);
                            arr[i] = { ...arr[i], descAr: e.target.value };
                            setArrayItems(c, "projects.items", arr);
                            setLc(c);
                          }}
                          dir="rtl"
                          className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-600 mb-1 block">English</span>
                        <textarea
                          value={item.descEn || ""}
                          rows={4}
                          onChange={(e) => {
                            const c = clone();
                            const arr = getArrayItems(c, "projects.items", translations);
                            arr[i] = { ...arr[i], descEn: e.target.value };
                            setArrayItems(c, "projects.items", arr);
                            setLc(c);
                          }}
                          dir="ltr"
                          className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <AddButton
                label="إضافة دورة جديدة"
                onClick={() =>
                  addArrayItem("projects.items", {
                    titleAr: "",
                    titleEn: "",
                    descAr: "",
                    descEn: "",
                    image: "",
                  })
                }
              />
            </div>
          </div>
        );



      case "contact":
        return (
          <div className="space-y-4">
            <SectionTitle icon="📞" title="التواصل" />
            <BiField label="عنوان الصفحة" {...getBi("contact.title")} />
            <BiField label="العنوان الفرعي" {...getBi("contact.subtitle")} multiline />
            <BiField label="حقل الاسم" {...getBi("contact.name")} />
            <BiField label="حقل البريد" {...getBi("contact.email")} />
            <BiField label="حقل الموضوع" {...getBi("contact.subject")} />
            <BiField label="حقل الرسالة" {...getBi("contact.message")} />
            <BiField label="زر الإرسال" {...getBi("contact.send")} />
          </div>
        );

      case "footer":
        return (
          <div className="space-y-4">
            <SectionTitle icon="📝" title="الفوتر" />
            <BiField label="الوصف" {...getBi("footer.description")} multiline />
            <BiField label="روابط سريعة" {...getBi("footer.quickLinks")} />
            <BiField label="معلومات التواصل" {...getBi("footer.contactInfo")} />
            <BiField label="الحقوق" {...getBi("footer.rights")} />
          </div>
        );

      default:
        return null;
    }
  };

  if (contentLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="text-primary animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} bg-white border-l border-border flex flex-col transition-all duration-300 shrink-0 shadow-sm`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
              <LayoutDashboard className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h2 className="text-foreground font-bold text-sm">لوحة التحكم</h2>
              <p className="text-muted-foreground text-xs">إدارة المحتوى</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={16} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground p-1">
              {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-foreground font-bold text-lg">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
          </div>
          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="text-xl">{icon}</span>
    <h3 className="text-lg font-bold text-foreground">{title}</h3>
  </div>
);

const RemoveBtn = ({ onClick, inline = false }: { onClick: () => void; inline?: boolean }) => (
  <button
    onClick={onClick}
    className={`${inline ? "" : "absolute top-3 left-3 opacity-0 group-hover:opacity-100"} flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all text-xs font-medium`}
  >
    حذف
  </button>
);

export default AdminDashboard;
