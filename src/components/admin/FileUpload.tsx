import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Loader2, FileText, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  label: string;
  currentUrl?: string;
  accept?: string;
  folder: string;
  onUploaded: (url: string) => void;
  onRemove?: () => void;
  type?: "image" | "pdf";
}

const FileUpload = ({ label, currentUrl, accept = "image/*", folder, onUploaded, onRemove, type = "image" }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("site-assets").upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("site-assets").getPublicUrl(fileName);
      onUploaded(publicUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2 p-4 rounded-xl bg-white border border-border">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {currentUrl && (
        <div className="relative group">
          {type === "image" ? (
            <img src={currentUrl} alt="" className="w-full max-h-40 object-contain rounded-lg border border-border bg-muted/30" />
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
              <FileText className="text-primary shrink-0" size={20} />
              <span className="text-sm text-foreground truncate flex-1">{currentUrl.split("/").pop()}</span>
            </div>
          )}
          {onRemove && (
            <button onClick={onRemove} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          )}
        </div>
      )}
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary hover:bg-primary/5 transition-all text-sm font-medium disabled:opacity-50"
      >
        {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
        {uploading ? "جاري الرفع..." : "رفع ملف جديد"}
      </button>
      <input ref={inputRef} type="file" accept={accept} onChange={handleUpload} className="hidden" />
    </div>
  );
};

export default FileUpload;
