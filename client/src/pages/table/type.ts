import { RowType } from "@/components/table/type";
import { ColumnsType } from "../kanban/type";

export type TableData<T> = { rows: RowType<T>[]; columns: ColumnsType[] };
