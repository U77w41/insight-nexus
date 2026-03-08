import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function ChartWidget({ title, subtitle, children, className = "" }: ChartWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`xai-card overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
