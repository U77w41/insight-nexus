import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  accent?: "primary" | "positive" | "negative" | "warn";
}

const accentMap = {
  primary: "text-primary border-primary/20",
  positive: "text-shap-negative border-shap-negative/20",
  negative: "text-shap-positive border-shap-positive/20",
  warn: "text-gradcam-warm border-gradcam-warm/20",
};

const iconBgMap = {
  primary: "bg-primary/10",
  positive: "bg-shap-negative/10",
  negative: "bg-shap-positive/10",
  warn: "bg-gradcam-warm/10",
};

export function MetricCard({ label, value, icon: Icon, subtitle, accent = "primary" }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`xai-card p-4 ${accentMap[accent]}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold font-mono text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-lg ${iconBgMap[accent]}`}>
          <Icon className={`h-4 w-4 ${accentMap[accent].split(" ")[0]}`} />
        </div>
      </div>
    </motion.div>
  );
}
