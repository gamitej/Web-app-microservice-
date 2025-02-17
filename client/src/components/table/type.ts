import { ReactNode } from "react";

export interface ColumnsType {
  width: string;
  accessorKey: string;
  headerName: string;
}

export type RowType<T> = Record<string, T>;

export interface TableProps<T extends ReactNode> {
  data: RowType<T>[];
  columns: ColumnsType[];
  onSave?: (rowIndex: number, key: string, editValue: T) => void;
}
