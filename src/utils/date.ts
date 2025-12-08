// ============================================
// DATE HELPERS
// Common date formatting and manipulation utilities
// ============================================

import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addDays,
  addWeeks,
  addMonths,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isBefore,
  isAfter,
  isSameDay,
} from "date-fns";

// Parse date safely
export const parseDate = (date: string | Date): Date => {
  if (date instanceof Date) return date;
  return parseISO(date);
};

// Format date with common patterns
export const formatDate = (
  date: string | Date,
  pattern: string = "MMM d, yyyy"
): string => {
  return format(parseDate(date), pattern);
};

// Format time
export const formatTime = (
  date: string | Date,
  pattern: string = "h:mm a"
): string => {
  return format(parseDate(date), pattern);
};

// Format date and time
export const formatDateTime = (
  date: string | Date,
  pattern: string = "MMM d, yyyy 'at' h:mm a"
): string => {
  return format(parseDate(date), pattern);
};

// Smart relative time formatting
export const formatRelativeTime = (date: string | Date): string => {
  const d = parseDate(date);
  
  if (isToday(d)) {
    return formatDistanceToNow(d, { addSuffix: true });
  }
  
  if (isYesterday(d)) {
    return `Yesterday at ${format(d, "h:mm a")}`;
  }
  
  if (isThisWeek(d)) {
    return format(d, "EEEE 'at' h:mm a");
  }
  
  if (isThisYear(d)) {
    return format(d, "MMM d 'at' h:mm a");
  }
  
  return format(d, "MMM d, yyyy");
};

// Format for display in lists/tables
export const formatSmartDate = (date: string | Date): string => {
  const d = parseDate(date);
  const now = new Date();
  const diffMins = differenceInMinutes(now, d);
  const diffHours = differenceInHours(now, d);
  const diffDays = differenceInDays(now, d);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (isThisYear(d)) return format(d, "MMM d");
  return format(d, "MMM d, yyyy");
};

// Format duration
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  const days = Math.floor(seconds / 86400);
  return `${days}d`;
};

// Date range helpers
export const getDateRange = (
  range: "today" | "yesterday" | "thisWeek" | "thisMonth" | "last7Days" | "last30Days"
): { start: Date; end: Date } => {
  const now = new Date();

  switch (range) {
    case "today":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "yesterday":
      const yesterday = addDays(now, -1);
      return { start: startOfDay(yesterday), end: endOfDay(yesterday) };
    case "thisWeek":
      return { start: startOfWeek(now), end: endOfWeek(now) };
    case "thisMonth":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "last7Days":
      return { start: startOfDay(addDays(now, -6)), end: endOfDay(now) };
    case "last30Days":
      return { start: startOfDay(addDays(now, -29)), end: endOfDay(now) };
    default:
      return { start: startOfDay(now), end: endOfDay(now) };
  }
};

// Check if date is in range
export const isDateInRange = (
  date: string | Date,
  start: Date,
  end: Date
): boolean => {
  const d = parseDate(date);
  return (isAfter(d, start) || isSameDay(d, start)) && 
         (isBefore(d, end) || isSameDay(d, end));
};

// Export utilities
export const dateUtils = {
  parse: parseDate,
  format: formatDate,
  formatTime,
  formatDateTime,
  formatRelative: formatRelativeTime,
  formatSmart: formatSmartDate,
  formatDuration,
  getRange: getDateRange,
  isInRange: isDateInRange,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  isBefore,
  isAfter,
  isSameDay,
  addDays,
  addWeeks,
  addMonths,
};

export default dateUtils;
