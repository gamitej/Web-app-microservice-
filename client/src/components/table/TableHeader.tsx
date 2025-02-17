import { Column } from "./type";

const TableHeader = ({ cols }: { cols: Column[] }) => {
  /**
   * TSX
   */
  return (
    <thead className="border-b bg-gray-100 text-left font-[550] text-gray-600">
      <tr>
        {cols.map((col, idx) => {
          const { headerName, accessorKey } = col;
          const isLast: boolean = idx === cols.length - 1;

          return (
            <th
              key={accessorKey}
              className={`py-2 px-4 ${isLast ? "" : "border-r"}`}
            >
              {headerName}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
