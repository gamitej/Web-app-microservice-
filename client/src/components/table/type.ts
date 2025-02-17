import { ReactNode } from "react";

export interface ColumnType {
  width: string;
  accessorKey: string;
  headerName: string;
}

export type RowType<T> = Record<string, T>;

export interface TableProps<T extends ReactNode> {
  data: RowType<T>[];
  columns: ColumnType[];
  onSave?: (rowIndex: number, key: string, editValue: T) => void;
}
