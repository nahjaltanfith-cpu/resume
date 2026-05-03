import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface PdfViewerProps {
  url: string;
  title?: string;
}

const loadPdfjsScript = (() => {
  let promise: Promise<any> | null = null;
  return () => {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = () => {
          const pdfjsLib = (window as any).pdfjsLib;
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          resolve(pdfjsLib);
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return promise;
  };
})();

const PdfViewer = ({ url, title }: PdfViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const pdfjsLib = await loadPdfjsScript();
        const doc = await pdfjsLib.getDocument(url).promise;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
      } catch (err) {
        console.error("Failed to load PDF:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [url]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
    };
    renderPage();
  }, [pdfDoc, currentPage, scale]);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1} className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[80px] text-center">{currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
        {title && <span className="text-sm font-semibold text-foreground hidden md:block">{title}</span>}
        <div className="flex items-center gap-1">
          <button onClick={() => setScale((s) => Math.max(0.5, s - 0.25))} className="p-2 rounded-lg hover:bg-muted transition-colors"><ZoomOut size={18} /></button>
          <span className="text-xs font-medium text-muted-foreground min-w-[45px] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale((s) => Math.min(3, s + 0.25))} className="p-2 rounded-lg hover:bg-muted transition-colors"><ZoomIn size={18} /></button>
        </div>
      </div>
      <div className="overflow-auto bg-muted/30" style={{ maxHeight: "750px" }}>
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex justify-center p-4">
            <canvas ref={canvasRef} className="shadow-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
