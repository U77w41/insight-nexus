import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { generateBeeswarmData, featureImportances } from "@/lib/mockData";
import { ChartWidget } from "./ChartWidget";

export function BeeswarmPlot() {
  const rawData = useMemo(() => generateBeeswarmData(), []);
  const features = featureImportances.map((f) => f.feature);

  // Transform for scatter: y = feature index, x = shap value, color = feature value
  const scatterData = rawData.map((p) => ({
    x: p.shapValue,
    y: features.indexOf(p.feature) + (Math.random() - 0.5) * 0.4,
    featureValue: p.featureValue,
    feature: p.feature,
  }));

  return (
    <ChartWidget title="SHAP Summary Plot (Beeswarm)" subtitle="Each dot = one feature for one prediction">
      <div className="flex items-center gap-2 mb-3 justify-end">
        <span className="text-[10px] text-muted-foreground">Feature value</span>
        <div className="flex h-2 w-24 rounded-full overflow-hidden">
          <div className="flex-1" style={{ background: "hsl(210 100% 56%)" }} />
          <div className="flex-1" style={{ background: "hsl(260 60% 50%)" }} />
          <div className="flex-1" style={{ background: "hsl(0 78% 55%)" }} />
        </div>
        <span className="text-[10px] text-muted-foreground">Low → High</span>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <ScatterChart margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <XAxis
            type="number"
            dataKey="x"
            name="SHAP value"
            tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            label={{ value: "SHAP value (impact on output)", position: "bottom", fill: "hsl(215 15% 55%)", fontSize: 10, offset: -5 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            tick={(props: any) => {
              const { x, y, payload } = props;
              const feat = features[Math.round(payload.value)];
              if (!feat) return <text />;
              return (
                <text x={x} y={y} dy={4} textAnchor="end" fill="hsl(210 20% 85%)" fontSize={10} fontFamily="JetBrains Mono">
                  {feat}
                </text>
              );
            }}
            ticks={features.map((_, i) => i)}
            width={150}
            axisLine={false}
            tickLine={false}
            domain={[-0.5, features.length - 0.5]}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(222 44% 10%)",
              border: "1px solid hsl(222 25% 16%)",
              borderRadius: 8,
              color: "hsl(210 20% 92%)",
              fontSize: 11,
            }}
            formatter={(val: number) => val.toFixed(4)}
          />
          <Scatter data={scatterData} isAnimationActive={false}>
            {scatterData.map((entry, i) => {
              const hue = 210 + entry.featureValue * (0 - 210);
              return (
                <Cell
                  key={i}
                  fill={`hsl(${hue} 80% 55%)`}
                  fillOpacity={0.7}
                  r={2.5}
                />
              );
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartWidget>
  );
}
