import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { featureImportances } from "@/lib/mockData";
import { ChartWidget } from "./ChartWidget";

export function FeatureImportanceChart() {
  const data = [...featureImportances].sort((a, b) => b.importance - a.importance);

  return (
    <ChartWidget title="Global Feature Importance" subtitle="Mean |SHAP value| across all predictions">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
          <XAxis type="number" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            dataKey="feature"
            type="category"
            width={160}
            tick={{ fill: "hsl(210 20% 85%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(222 44% 10%)",
              border: "1px solid hsl(222 25% 16%)",
              borderRadius: 8,
              color: "hsl(210 20% 92%)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={18}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.direction === "positive" ? "hsl(0 78% 55%)" : "hsl(210 100% 56%)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWidget>
  );
}
