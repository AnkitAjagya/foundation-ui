import * as React from "react";
import { cn } from "@/lib/utils";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface BarChartProps {
  data: Record<string, any>[];
  bars: {
    dataKey: string;
    color?: string;
    name?: string;
    stackId?: string;
  }[];
  xAxisKey: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  horizontal?: boolean;
  stacked?: boolean;
  rounded?: boolean;
  gradient?: boolean;
  className?: string;
}

export const BarChartWrapper = ({
  data,
  bars,
  xAxisKey,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  horizontal = false,
  stacked = false,
  rounded = true,
  gradient = true,
  className,
}: BarChartProps) => {
  const defaultColors = [
    "hsl(226, 100%, 54%)",
    "hsl(270, 100%, 60%)",
    "hsl(142, 76%, 36%)",
    "hsl(38, 92%, 50%)",
    "hsl(0, 84%, 60%)",
  ];

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
        >
          {gradient && (
            <defs>
              {bars.map((bar, index) => (
                <linearGradient
                  key={bar.dataKey}
                  id={`bar-gradient-${bar.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={bar.color || defaultColors[index % defaultColors.length]}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={bar.color || defaultColors[index % defaultColors.length]}
                    stopOpacity={0.6}
                  />
                </linearGradient>
              ))}
            </defs>
          )}
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
          )}
          {horizontal ? (
            <>
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                dataKey={xAxisKey}
                type="category"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
            </>
          )}
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
            />
          )}
          {showLegend && <Legend />}
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={
                gradient
                  ? `url(#bar-gradient-${bar.dataKey})`
                  : bar.color || defaultColors[index % defaultColors.length]
              }
              stackId={stacked ? "stack" : bar.stackId}
              radius={rounded ? [4, 4, 0, 0] : 0}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartWrapper;
