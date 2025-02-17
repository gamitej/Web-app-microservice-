import { Row } from "./type";

const TableCell = <T extends string | number>({ rows }: { rows: Row<T>[] }) => {
  /**
   * TSX
   */
  return (
    <tbody>
      {rows.map((row, idx: number) => (
        <tr key={idx}>
          {Object.entries(row).map(([accessorKey, value], idx) => {
            const isLast: boolean = idx === rows.length - 1;

            return (
              <td
                key={`${accessorKey}-${idx}`}
                className={`px-4 py-2 ${isLast ? "" : "border-r"}`}
              >
                {value}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableCell;
