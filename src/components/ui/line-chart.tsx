import * as React from "react";
import { cn } from "@/lib/utils";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface LineChartProps {
  data: Record<string, any>[];
  lines: {
    dataKey: string;
    color?: string;
    name?: string;
    strokeWidth?: number;
    dashed?: boolean;
  }[];
  xAxisKey: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  curved?: boolean;
  area?: boolean;
  gradient?: boolean;
  className?: string;
}

export const LineChartWrapper = ({
  data,
  lines,
  xAxisKey,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  curved = true,
  area = false,
  gradient = true,
  className,
}: LineChartProps) => {
  const defaultColors = [
    "hsl(226, 100%, 54%)",
    "hsl(270, 100%, 60%)",
    "hsl(142, 76%, 36%)",
    "hsl(38, 92%, 50%)",
    "hsl(0, 84%, 60%)",
  ];

  const Chart = area ? AreaChart : RechartsLineChart;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data}>
          {gradient && (
            <defs>
              {lines.map((line, index) => (
                <linearGradient
                  key={line.dataKey}
                  id={`gradient-${line.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={line.color || defaultColors[index % defaultColors.length]}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={line.color || defaultColors[index % defaultColors.length]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
          )}
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
          )}
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            className="text-xs fill-muted-foreground"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            className="text-xs fill-muted-foreground"
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
          )}
          {showLegend && <Legend />}
          {lines.map((line, index) =>
            area ? (
              <Area
                key={line.dataKey}
                type={curved ? "monotone" : "linear"}
                dataKey={line.dataKey}
                name={line.name || line.dataKey}
                stroke={line.color || defaultColors[index % defaultColors.length]}
                strokeWidth={line.strokeWidth || 2}
                fill={gradient ? `url(#gradient-${line.dataKey})` : "transparent"}
                strokeDasharray={line.dashed ? "5 5" : undefined}
              />
            ) : (
              <Line
                key={line.dataKey}
                type={curved ? "monotone" : "linear"}
                dataKey={line.dataKey}
                name={line.name || line.dataKey}
                stroke={line.color || defaultColors[index % defaultColors.length]}
                strokeWidth={line.strokeWidth || 2}
                strokeDasharray={line.dashed ? "5 5" : undefined}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            )
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWrapper;
