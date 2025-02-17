export type Row<T> = { [key: string]: T };
export type Column = { headerName: string; accessorKey: string };

export interface BasicTabelProps<T> {
  tableData: { rows: Row<T>[]; cols: Column[] };
}
