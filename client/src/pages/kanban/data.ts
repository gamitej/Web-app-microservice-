import { ColumnsType, TaskFormDataType } from "./type";

export const kanbanStatusColumns: ColumnsType[] = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export const statusOptions = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export const taskFormData: TaskFormDataType[] = [
  { id: "title", type: "text", label: "Title", placeholder: "Enter title..." },
  {
    id: "description",
    type: "text",
    label: "Description",
    placeholder: "Enter description...",
  },
  {
    id: "status",
    type: "dropdown",
    label: "Status",
    options: statusOptions,
  },
];

export const defaultFormData = taskFormData.reduce((acc, item) => {
  acc[item.id] = "";
  return acc;
}, {} as { [key: string]: string });

// SimpleDropdown
