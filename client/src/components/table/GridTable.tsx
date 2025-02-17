import { ReactNode, useState } from "react";
import { TableProps } from "./type";

const GridTable = <T extends ReactNode>({
  columns,
  data,
  onSave,
}: TableProps<T>) => {
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    key: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<T | null>(null);

  const handleEdit = (rowIndex: number, key: string, value: T) => {
    setEditingCell({ rowIndex, key });
    setEditValue(value);
  };

  const handleSave = () => {
    if (editingCell && editValue !== null) {
      const { rowIndex, key } = editingCell;
      if (onSave) onSave(rowIndex, key, editValue);
      setEditingCell(null);
      setEditValue(null);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <div
        className="grid border border-gray-300"
        style={{
          gridTemplateColumns: columns.map((col) => col.width).join(" "),
        }}
      >
        {/* Header Row */}
        {columns.map((column) => (
          <div
            key={column.accessorKey}
            className="p-2 font-bold bg-gray-200 border border-gray-300 text-center"
          >
            {column.headerName}
          </div>
        ))}

        {/* Data Rows */}
        {data.map((row, rowIndex) =>
          columns.map((column) => (
            <div
              key={`${rowIndex}-${column.accessorKey}`}
              className="p-2 border border-gray-300 text-center cursor-pointer"
              onClick={() =>
                handleEdit(
                  rowIndex,
                  column.accessorKey,
                  row[column.accessorKey]
                )
              }
            >
              {editingCell?.rowIndex === rowIndex &&
              editingCell.key === column.accessorKey ? (
                <input
                  type="text"
                  autoFocus
                  value={String(editValue ?? "")}
                  spellCheck={false}
                  onBlur={handleSave}
                  className="border p-1 w-full text-center"
                  onChange={(e) => setEditValue(e.target.value as T)}
                />
              ) : (
                row[column.accessorKey]
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GridTable;
