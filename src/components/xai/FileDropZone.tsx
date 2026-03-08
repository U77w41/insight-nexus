import { useState, useCallback } from "react";
import { Upload, FileCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileDropZoneProps {
  label: string;
  acceptedTypes: string;
  description: string;
  icon?: React.ReactNode;
  onFileSelect?: (file: File | null) => void;
}

export function FileDropZone({ label, acceptedTypes, description, onFileSelect }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent, entering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(entering);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      onFileSelect?.(dropped);
    }
  }, [onFileSelect]);

  const removeFile = () => {
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <div
      className={`xai-dropzone cursor-pointer text-center transition-all duration-300 ${isDragging ? "xai-dropzone-active" : ""}`}
      onDragEnter={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = acceptedTypes;
        input.onchange = (e) => {
          const f = (e.target as HTMLInputElement).files?.[0];
          if (f) { setFile(f); onFileSelect?.(f); }
        };
        input.click();
      }}
    >
      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <FileCheck className="h-8 w-8 text-primary" />
            <p className="text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            <button
              onClick={(e) => { e.stopPropagation(); removeFile(); }}
              className="mt-1 p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">{acceptedTypes}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
