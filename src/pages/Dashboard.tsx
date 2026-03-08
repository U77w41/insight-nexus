import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box, Database, Hash, Target, TrendingUp, Gauge,
  Table2, ImageIcon, Type,
} from "lucide-react";
import { modelSummary } from "@/lib/mockData";
import { MetricCard } from "@/components/xai/MetricCard";
import { FeatureImportanceChart } from "@/components/xai/FeatureImportanceChart";
import { BeeswarmPlot } from "@/components/xai/BeeswarmPlot";
import { DataTableView } from "@/components/xai/DataTableView";
import { ImageExplainView } from "@/components/xai/ImageExplainView";
import { TextExplainView } from "@/components/xai/TextExplainView";

type Modality = "tabular" | "image" | "text";

const modalityTabs: { value: Modality; label: string; icon: React.ElementType }[] = [
  { value: "tabular", label: "Tabular", icon: Table2 },
  { value: "image", label: "Image", icon: ImageIcon },
  { value: "text", label: "Text", icon: Type },
];

export default function Dashboard() {
  const location = useLocation();
  const initModality = (location.state as any)?.modality || "tabular";
  const [activeModality, setActiveModality] = useState<Modality>(initModality);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Summary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard label="Model Format" value={modelSummary.format} icon={Box} accent="primary" />
        <MetricCard label="Modality" value={modelSummary.modality} icon={Database} accent="primary" />
        <MetricCard label="Features" value={modelSummary.features} icon={Hash} accent="warn" />
        <MetricCard label="Parameters" value={modelSummary.parameters} icon={Target} />
        <MetricCard label="Base Value" value={modelSummary.baseValue.toFixed(3)} icon={TrendingUp} accent="negative" />
        <MetricCard label="AUC-ROC" value={modelSummary.auc.toFixed(3)} icon={Gauge} accent="positive" />
      </div>

      {/* Modality tabs */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary w-fit">
        {modalityTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveModality(tab.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeModality === tab.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabular view */}
      {activeModality === "tabular" && (
        <motion.div
          key="tabular"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <FeatureImportanceChart />
            <BeeswarmPlot />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Local Explanations — Click a row for SHAP Waterfall</h2>
            <DataTableView />
          </div>
        </motion.div>
      )}

      {/* Image view */}
      {activeModality === "image" && (
        <motion.div
          key="image"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ImageExplainView />
        </motion.div>
      )}

      {/* Text view */}
      {activeModality === "text" && (
        <motion.div
          key="text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TextExplainView />
        </motion.div>
      )}
    </motion.div>
  );
}
