// ============================================
// CHART ADAPTER HELPERS
// Utilities for preparing data for chart components
// ============================================

// Transform array data to chart format
export function toChartData<T extends Record<string, any>>(
  data: T[],
  config: {
    xKey: keyof T;
    yKeys: (keyof T)[];
    xFormatter?: (value: any) => string;
  }
): Record<string, any>[] {
  return data.map((item) => {
    const chartItem: Record<string, any> = {
      [config.xKey as string]: config.xFormatter
        ? config.xFormatter(item[config.xKey])
        : item[config.xKey],
    };

    config.yKeys.forEach((key) => {
      chartItem[key as string] = item[key];
    });

    return chartItem;
  });
}

// Aggregate data by a key
export function aggregateBy<T extends Record<string, any>>(
  data: T[],
  groupKey: keyof T,
  valueKey: keyof T,
  aggregation: "sum" | "avg" | "count" | "min" | "max" = "sum"
): { name: string; value: number }[] {
  const grouped = data.reduce((acc, item) => {
    const key = String(item[groupKey]);
    if (!acc[key]) acc[key] = [];
    acc[key].push(Number(item[valueKey]) || 0);
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(grouped).map(([name, values]) => {
    let value: number;
    switch (aggregation) {
      case "sum":
        value = values.reduce((a, b) => a + b, 0);
        break;
      case "avg":
        value = values.reduce((a, b) => a + b, 0) / values.length;
        break;
      case "count":
        value = values.length;
        break;
      case "min":
        value = Math.min(...values);
        break;
      case "max":
        value = Math.max(...values);
        break;
    }
    return { name, value: Math.round(value * 100) / 100 };
  });
}

// Create time series data with filled gaps
export function fillTimeSeriesGaps(
  data: { date: string | Date; value: number }[],
  startDate: Date,
  endDate: Date,
  fillValue: number = 0
): { date: string; value: number }[] {
  const dateMap = new Map(
    data.map((d) => [
      new Date(d.date).toISOString().split("T")[0],
      d.value,
    ])
  );

  const result: { date: string; value: number }[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    result.push({
      date: dateStr,
      value: dateMap.get(dateStr) ?? fillValue,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

// Calculate percentage change
export function calculatePercentageChange(
  current: number,
  previous: number
): { value: number; trend: "up" | "down" | "neutral" } {
  if (previous === 0) {
    return { value: current > 0 ? 100 : 0, trend: current > 0 ? "up" : "neutral" };
  }

  const change = ((current - previous) / previous) * 100;
  const trend = change > 0 ? "up" : change < 0 ? "down" : "neutral";

  return {
    value: Math.round(Math.abs(change) * 10) / 10,
    trend,
  };
}

// Format large numbers
export function formatNumber(
  num: number,
  options?: {
    compact?: boolean;
    decimals?: number;
    prefix?: string;
    suffix?: string;
  }
): string {
  const { compact = false, decimals = 0, prefix = "", suffix = "" } = options || {};

  if (compact) {
    if (num >= 1e9) return `${prefix}${(num / 1e9).toFixed(1)}B${suffix}`;
    if (num >= 1e6) return `${prefix}${(num / 1e6).toFixed(1)}M${suffix}`;
    if (num >= 1e3) return `${prefix}${(num / 1e3).toFixed(1)}K${suffix}`;
  }

  return `${prefix}${num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
}

// Generate color palette
export function generateColorPalette(
  count: number,
  baseHue: number = 226
): string[] {
  const colors: string[] = [];
  const saturation = 70;
  const lightness = 55;
  const hueStep = 360 / Math.max(count, 1);

  for (let i = 0; i < count; i++) {
    const hue = (baseHue + i * hueStep) % 360;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}

// Prepare data for pie/donut charts
export function toPieData<T extends Record<string, any>>(
  data: T[],
  nameKey: keyof T,
  valueKey: keyof T,
  colors?: string[]
): { name: string; value: number; color?: string }[] {
  const palette = colors || generateColorPalette(data.length);

  return data.map((item, index) => ({
    name: String(item[nameKey]),
    value: Number(item[valueKey]) || 0,
    color: palette[index % palette.length],
  }));
}

// Calculate cumulative values
export function cumulativeSum(
  data: { date: string; value: number }[]
): { date: string; value: number; cumulative: number }[] {
  let sum = 0;
  return data.map((item) => {
    sum += item.value;
    return { ...item, cumulative: sum };
  });
}

// Moving average calculation
export function movingAverage(
  data: number[],
  windowSize: number
): number[] {
  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) {
      result.push(data[i]);
    } else {
      const windowData = data.slice(i - windowSize + 1, i + 1);
      const avg = windowData.reduce((a, b) => a + b, 0) / windowSize;
      result.push(Math.round(avg * 100) / 100);
    }
  }

  return result;
}

export const chartUtils = {
  toChartData,
  aggregateBy,
  fillTimeSeriesGaps,
  calculatePercentageChange,
  formatNumber,
  generateColorPalette,
  toPieData,
  cumulativeSum,
  movingAverage,
};

export default chartUtils;
