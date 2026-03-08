import { textTokens } from "@/lib/mockData";
import { ChartWidget } from "./ChartWidget";

export function TextExplainView() {
  const maxWeight = Math.max(...textTokens.map((t) => Math.abs(t.weight)));

  return (
    <ChartWidget title="Token-Level Attribution (SHAP/LIME)" subtitle="Word-level impact on classification output">
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/30 leading-8 text-base">
          {textTokens.map((t, i) => {
            const opacity = Math.min(Math.abs(t.weight) / maxWeight, 1) * 0.6 + 0.05;
            const isPositive = t.weight > 0.05;
            const isNegative = t.weight < -0.05;

            return (
              <span
                key={i}
                className={`${isPositive ? "token-positive" : isNegative ? "token-negative" : ""} relative group cursor-default`}
                style={{ "--token-opacity": isPositive || isNegative ? opacity : 0 } as React.CSSProperties}
              >
                {t.token}{" "}
                {(isPositive || isNegative) && (
                  <span className="invisible group-hover:visible absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-popover text-[10px] font-mono text-foreground border border-border whitespace-nowrap z-10">
                    {t.weight > 0 ? "+" : ""}{t.weight.toFixed(3)}
                  </span>
                )}
              </span>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm token-positive" style={{ "--token-opacity": 0.5 } as React.CSSProperties} />
              <span className="text-[10px] text-muted-foreground">Positive impact</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm token-negative" style={{ "--token-opacity": 0.5 } as React.CSSProperties} />
              <span className="text-[10px] text-muted-foreground">Negative impact</span>
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">Hover tokens for SHAP values</span>
        </div>
      </div>
    </ChartWidget>
  );
}
