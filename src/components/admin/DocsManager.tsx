import { useMemo, useState } from "react";
import { Search, ChevronDown, ChevronRight, Trash2, Plus, FileText, Upload, X } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";

export type AdminDoc = {
  title_ar?: string;
  title_en?: string;
  url?: string;
  category?: string;
};

export type AdminCategory = {
  key: string;
  label: string;
};

interface Props {
  /** All docs in this section (governance or reports) */
  docs: AdminDoc[];
  /** Available categories for grouping */
  categories: AdminCategory[];
  /** Color theme for the manager (controls accents) */
  accent?: "amber" | "primary";
  /** Friendly singular label e.g. "مستند" or "تقرير" */
  itemLabel?: string;
  onChange: (next: AdminDoc[]) => void;
}

const accentClasses = {
  amber: {
    chipBg: "bg-amber-50",
    chipBorder: "border-amber-200",
    chipText: "text-amber-700",
    chipActive: "bg-amber-500 text-white border-amber-500",
    headerBg: "bg-amber-50/60",
    cardBorder: "border-amber-200",
    addBtn: "bg-amber-500 hover:bg-amber-600 text-white",
  },
  primary: {
    chipBg: "bg-primary/5",
    chipBorder: "border-primary/30",
    chipText: "text-primary",
    chipActive: "bg-primary text-primary-foreground border-primary",
    headerBg: "bg-primary/5",
    cardBorder: "border-primary/30",
    addBtn: "bg-primary hover:bg-primary/90 text-primary-foreground",
  },
};

const DocsManager = ({
  docs,
  categories,
  accent = "amber",
  itemLabel = "مستند",
  onChange,
}: Props) => {
  const cls = accentClasses[accent];
  const [search, setSearch] = useState("");
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null);
  const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});
  const [filterCat, setFilterCat] = useState<string>("all");

  // Build groups based on indices (so we can update by index)
  const filteredIdx = useMemo(() => {
    const q = search.trim().toLowerCase();
    return docs
      .map((d, i) => ({ d, i }))
      .filter(({ d }) => {
        if (filterCat !== "all" && (d.category || "") !== filterCat) return false;
        if (!q) return true;
        return (
          (d.title_ar || "").toLowerCase().includes(q) ||
          (d.title_en || "").toLowerCase().includes(q)
        );
      });
  }, [docs, search, filterCat]);

  const groups = useMemo(() => {
    const map: Record<string, { i: number; d: AdminDoc }[]> = {};
    for (const cat of categories) map[cat.key] = [];
    map["_uncat"] = [];
    for (const item of filteredIdx) {
      const k = item.d.category && map[item.d.category] ? item.d.category : "_uncat";
      map[k].push(item);
    }
    return map;
  }, [filteredIdx, categories]);

  const updateDoc = (i: number, patch: Partial<AdminDoc>) => {
    const next = [...docs];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const removeDoc = (i: number) => {
    const next = [...docs];
    next.splice(i, 1);
    onChange(next);
    if (expandedDoc === i) setExpandedDoc(null);
  };

  const addDoc = (category?: string) => {
    const next = [
      ...docs,
      { title_ar: "", title_en: "", url: "", category: category || categories[0]?.key || "" },
    ];
    onChange(next);
    setExpandedDoc(next.length - 1);
  };

  const toggleCat = (key: string) => {
    setCollapsedCats((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalCount = docs.length;
  const visibleCount = filteredIdx.length;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="rounded-xl border border-border bg-card p-3 space-y-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`ابحث في ${itemLabel}ات...`}
              dir="rtl"
              className="w-full ps-3 pe-10 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>
          <button
            type="button"
            onClick={() => addDoc()}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-bold shadow ${cls.addBtn}`}
          >
            <Plus size={16} />
            <span>إضافة</span>
          </button>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setFilterCat("all")}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
              filterCat === "all" ? cls.chipActive : `${cls.chipBg} ${cls.chipBorder} ${cls.chipText}`
            }`}
          >
            الكل ({totalCount})
          </button>
          {categories.map((cat) => {
            const count = docs.filter((d) => d.category === cat.key).length;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setFilterCat(cat.key)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                  filterCat === cat.key
                    ? cls.chipActive
                    : `${cls.chipBg} ${cls.chipBorder} ${cls.chipText}`
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
          {docs.some((d) => !d.category || !categories.find((c) => c.key === d.category)) && (
            <button
              type="button"
              onClick={() => setFilterCat("_uncat")}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                filterCat === "_uncat" ? cls.chipActive : `${cls.chipBg} ${cls.chipBorder} ${cls.chipText}`
              }`}
            >
              غير مصنّف
            </button>
          )}
        </div>

        {search && (
          <p className="text-xs text-muted-foreground">
            عرض {visibleCount} من أصل {totalCount}
          </p>
        )}
      </div>

      {/* Groups */}
      {totalCount === 0 && (
        <div className="text-center py-12 rounded-xl border border-dashed border-border bg-muted/20">
          <FileText className="mx-auto text-muted-foreground mb-2" size={32} />
          <p className="text-sm text-muted-foreground">لا توجد {itemLabel}ات بعد. اضغطي "إضافة" للبدء.</p>
        </div>
      )}

      {visibleCount === 0 && totalCount > 0 && (
        <div className="text-center py-8 rounded-xl border border-dashed border-border bg-muted/20">
          <p className="text-sm text-muted-foreground">لا توجد نتائج مطابقة.</p>
        </div>
      )}

      {[...categories.map((c) => ({ key: c.key, label: c.label })), { key: "_uncat", label: "— غير مصنّف —" }].map(
        (cat) => {
          const items = groups[cat.key] || [];
          if (items.length === 0) return null;
          const collapsed = !!collapsedCats[cat.key];
          return (
            <div key={cat.key} className={`rounded-xl border ${cls.cardBorder} bg-card overflow-hidden`}>
              <button
                type="button"
                onClick={() => toggleCat(cat.key)}
                className={`w-full flex items-center justify-between px-4 py-3 ${cls.headerBg} hover:bg-muted/40 transition`}
              >
                <div className="flex items-center gap-2">
                  {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                  <span className="font-bold text-sm text-foreground">{cat.label}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${cls.chipBg} ${cls.chipText}`}>
                  {items.length}
                </span>
              </button>

              {!collapsed && (
                <div className="divide-y divide-border">
                  {items.map(({ d, i }) => {
                    const expanded = expandedDoc === i;
                    const title = d.title_ar || d.title_en || `${itemLabel} بدون عنوان`;
                    return (
                      <div key={i} className="bg-background">
                        {/* Compact row */}
                        <div className="flex items-center gap-2 px-3 py-2.5 hover:bg-muted/30">
                          <button
                            type="button"
                            onClick={() => setExpandedDoc(expanded ? null : i)}
                            className="flex-1 flex items-center gap-2 text-start min-w-0"
                          >
                            <FileText className="text-muted-foreground flex-shrink-0" size={16} />
                            <span className="text-sm font-semibold text-foreground truncate">{title}</span>
                            {!d.url && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 flex-shrink-0">
                                بدون ملف
                              </span>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpandedDoc(expanded ? null : i)}
                            className="px-2 py-1 text-xs font-semibold text-primary hover:underline"
                          >
                            {expanded ? "إغلاق" : "تعديل"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`هل تريدين حذف "${title}"؟`)) removeDoc(i);
                            }}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                            title="حذف"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Expanded editor */}
                        {expanded && (
                          <div className="px-4 pb-4 pt-2 space-y-3 bg-muted/20 border-t border-border">
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-foreground">العنوان (عربي)</label>
                                <input
                                  type="text"
                                  value={d.title_ar || ""}
                                  onChange={(e) => updateDoc(i, { title_ar: e.target.value })}
                                  dir="rtl"
                                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-foreground">Title (English)</label>
                                <input
                                  type="text"
                                  value={d.title_en || ""}
                                  onChange={(e) => updateDoc(i, { title_en: e.target.value })}
                                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-bold text-foreground">القسم</label>
                              <select
                                value={d.category || ""}
                                onChange={(e) => updateDoc(i, { category: e.target.value })}
                                dir="rtl"
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                              >
                                <option value="">— غير مصنّف —</option>
                                {categories.map((c) => (
                                  <option key={c.key} value={c.key}>
                                    {c.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-bold text-foreground">ملف PDF</label>
                              <FileUpload
                                label=""
                                currentUrl={d.url}
                                folder="pdfs"
                                type="pdf"
                                accept=".pdf"
                                onUploaded={(url) => updateDoc(i, { url })}
                                onRemove={() => updateDoc(i, { url: "" })}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default DocsManager;
