import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, Database, Play, ChevronDown,
  FileCode, Table2, ImageIcon, Type,
} from "lucide-react";
import { FileDropZone } from "@/components/xai/FileDropZone";
import { LoadingSequence } from "@/components/xai/LoadingSequence";

type Modality = "tabular" | "image" | "text";
type Task = "classification" | "regression" | "clustering";
type Framework = "shap" | "lime" | "gradcam" | "integrated_gradients";

const dataAcceptMap: Record<Modality, { types: string; desc: string }> = {
  tabular: { types: ".csv,.json", desc: "Upload CSV or JSON tabular data" },
  image: { types: ".jpg,.jpeg,.png,.bmp", desc: "Upload JPG/PNG images" },
  text: { types: ".txt,.csv,.json", desc: "Upload text corpus (.txt)" },
};

export default function ConfigPage() {
  const navigate = useNavigate();
  const [modality, setModality] = useState<Modality>("tabular");
  const [task, setTask] = useState<Task>("classification");
  const [framework, setFramework] = useState<Framework>("shap");
  const [isLoading, setIsLoading] = useState(false);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);

  const handleRun = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    navigate("/dashboard", { state: { modality, task, framework } });
  }, [navigate, modality, task, framework]);

  if (isLoading) {
    return <LoadingSequence onComplete={handleLoadingComplete} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Configuration & Ingestion
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload your trained model and inference data to generate explainability reports.
        </p>
      </div>

      {/* Upload zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <FileCode className="h-3.5 w-3.5" /> Model Artifact
          </label>
          <FileDropZone
            label="Drop Model File"
            acceptedTypes=".pkl,.joblib,.pt,.h5,.onnx"
            description="Supports PyTorch, TF, Scikit-learn, ONNX"
            onFileSelect={setModelFile}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5" /> Inference Data
          </label>
          <FileDropZone
            label="Drop Data File"
            acceptedTypes={dataAcceptMap[modality].types}
            description={dataAcceptMap[modality].desc}
            onFileSelect={setDataFile}
          />
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SelectField
          label="Data Modality"
          icon={<Table2 className="h-3.5 w-3.5" />}
          value={modality}
          onChange={(v) => setModality(v as Modality)}
          options={[
            { value: "tabular", label: "Tabular (CSV/JSON)", icon: <Table2 className="h-3.5 w-3.5" /> },
            { value: "image", label: "Image (JPG/PNG)", icon: <ImageIcon className="h-3.5 w-3.5" /> },
            { value: "text", label: "Text (NLP)", icon: <Type className="h-3.5 w-3.5" /> },
          ]}
        />
        <SelectField
          label="ML Task"
          icon={<Brain className="h-3.5 w-3.5" />}
          value={task}
          onChange={(v) => setTask(v as Task)}
          options={[
            { value: "classification", label: "Classification" },
            { value: "regression", label: "Regression" },
            { value: "clustering", label: "Clustering" },
          ]}
        />
        <SelectField
          label="XAI Framework"
          icon={<FileCode className="h-3.5 w-3.5" />}
          value={framework}
          onChange={(v) => setFramework(v as Framework)}
          options={[
            { value: "shap", label: "SHAP" },
            { value: "lime", label: "LIME" },
            { value: "gradcam", label: "Grad-CAM" },
            { value: "integrated_gradients", label: "Integrated Gradients" },
          ]}
        />
      </div>

      {/* Run button */}
      <motion.button
        onClick={handleRun}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm xai-glow transition-all hover:brightness-110"
      >
        <Play className="h-4 w-4" />
        Run Explanation
      </motion.button>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "🧮", title: "SHAP", desc: "SHapley Additive exPlanations – game-theoretic feature attribution" },
          { icon: "🍋", title: "LIME", desc: "Local Interpretable Model-agnostic Explanations" },
          { icon: "🔥", title: "Grad-CAM", desc: "Gradient-weighted Class Activation Mapping for CNNs" },
        ].map((card) => (
          <div key={card.title} className="xai-surface p-4 space-y-1.5">
            <div className="text-lg">{card.icon}</div>
            <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SelectField({
  label, icon, value, onChange, options,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; icon?: React.ReactNode }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-3 py-2.5 pr-8 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
