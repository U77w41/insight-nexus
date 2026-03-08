import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { generateWaterfallData } from "@/lib/mockData";
import { ChartWidget } from "./ChartWidget";

interface WaterfallPlotProps {
  rowId: number;
}

export function WaterfallPlot({ rowId }: WaterfallPlotProps) {
  const steps = useMemo(() => generateWaterfallData(rowId), [rowId]);

  const chartData = steps.slice(1).map((step) => ({
    feature: step.feature,
    contribution: step.contribution,
    cumulative: step.cumulative,
    start: step.cumulative - step.contribution,
  }));

  return (
    <ChartWidget title={`SHAP Waterfall — Row #${rowId}`} subtitle={`Base E[f(X)] = ${steps[0].contribution} → f(x) = ${steps[steps.length - 1].cumulative.toFixed(4)}`}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
          <XAxis type="number" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis
            dataKey="feature"
            type="category"
            width={160}
            tick={{ fill: "hsl(210 20% 85%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
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
          <ReferenceLine x={steps[0].contribution} stroke="hsl(215 15% 35%)" strokeDasharray="3 3" />
          {/* Invisible bar for offset */}
          <Bar dataKey="start" stackId="stack" fill="transparent" barSize={16} />
          <Bar dataKey="contribution" stackId="stack" radius={[0, 3, 3, 0]} barSize={16}>
            {chartData.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.contribution >= 0 ? "hsl(0 78% 55%)" : "hsl(210 100% 56%)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWidget>
  );
}
