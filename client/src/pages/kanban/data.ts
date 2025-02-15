export type ColumnsType = { label: string; value: string };

export const kanbanStatusColumns: ColumnsType[] = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];
