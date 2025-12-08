import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
export interface Column<T> {
  key: keyof T | string;
  header: string;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface BasicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
}

export function BasicTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  striped = false,
  hoverable = true,
  compact = false,
  emptyMessage = "No data available",
  onRowClick,
}: BasicTableProps<T>) {
  const getCellValue = (row: T, column: Column<T>, index: number) => {
    if (column.cell) {
      return column.cell(row, index);
    }
    const key = column.key as keyof T;
    return row[key] as React.ReactNode;
  };

  return (
    <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={cn(
                  "font-semibold text-foreground",
                  compact && "py-2 px-3",
                  column.headerClassName
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  striped && rowIndex % 2 === 1 && "bg-muted/30",
                  hoverable && "hover:bg-muted/50 cursor-pointer",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={cn(compact && "py-2 px-3", column.className)}
                  >
                    {getCellValue(row, column, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default BasicTable;
