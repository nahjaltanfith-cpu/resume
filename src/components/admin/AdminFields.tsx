import { Plus, Trash2 } from "lucide-react";

interface BiFieldProps {
  label: string;
  arValue: string;
  enValue: string;
  onArChange: (v: string) => void;
  onEnChange: (v: string) => void;
  multiline?: boolean;
}

export const BiField = ({ label, arValue, enValue, onArChange, onEnChange, multiline = false }: BiFieldProps) => {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className="space-y-2 p-4 rounded-xl bg-white border border-border">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <span className="text-xs font-bold text-primary mb-1 block">عربي</span>
          <Tag
            value={arValue}
            onChange={(e: any) => onArChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 resize-none transition-all"
            dir="rtl"
            {...(multiline ? { rows: 3 } : {})}
          />
        </div>
        <div>
          <span className="text-xs font-bold text-amber-600 mb-1 block">English</span>
          <Tag
            value={enValue}
            onChange={(e: any) => onEnChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 resize-none transition-all"
            dir="ltr"
            {...(multiline ? { rows: 3 } : {})}
          />
        </div>
      </div>
    </div>
  );
};

export const SingleField = ({ label, value, onChange, placeholder = "", dir = "ltr", type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; dir?: string; type?: string;
}) => (
  <div className="space-y-2 p-4 rounded-xl bg-white border border-border">
    <label className="text-sm font-semibold text-foreground">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      type={type}
      className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
    />
  </div>
);

export const ArrayControls = ({ onAdd, onRemove, canRemove = true }: { onAdd: () => void; onRemove: () => void; canRemove?: boolean }) => (
  <div className="flex gap-2">
    {canRemove && (
      <button onClick={onRemove} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all text-xs font-medium">
        <Trash2 size={12} /> حذف
      </button>
    )}
  </div>
);

export const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary hover:bg-primary/5 transition-all text-sm font-medium"
  >
    <Plus size={16} />
    {label}
  </button>
);
