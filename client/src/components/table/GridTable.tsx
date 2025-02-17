import React, { useState } from "react";

interface Column {
  accessorKey: string;
  headerName: string;
  width: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const GridTable: React.FC<TableProps> = ({ columns, data }) => {
  const [tableData, setTableData] = useState(data);
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    key: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (rowIndex: number, key: string, value: string) => {
    setEditingCell({ rowIndex, key });
    setEditValue(value);
  };

  const handleSave = () => {
    if (editingCell) {
      const { rowIndex, key } = editingCell;
      const updatedData = [...tableData];
      updatedData[rowIndex][key] = editValue;
      setTableData(updatedData);
      setEditingCell(null);
    }
  };

  /**
   * TSX
   */
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
        {tableData.map((row, rowIndex) =>
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
                  value={editValue}
                  onBlur={handleSave}
                  className="border p-1 w-full text-center"
                  onChange={(e) => setEditValue(e.target.value)}
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
