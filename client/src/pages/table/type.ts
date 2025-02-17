import { ColumnsType, RowType } from "@/components/table/type";

export type TableData<T> = { rows: RowType<T>[]; columns: ColumnsType[] };
