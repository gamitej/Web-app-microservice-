import { OptionsType } from "@/data/type";

export type ColumnsType = { label: string; value: string };

export interface TaskType {
  id: string;
  title: string;
  status: string;
  description: string;
}

export type TaskFormDataType = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: OptionsType[];
};
