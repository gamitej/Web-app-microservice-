import { useMemo, useState } from "react";
import TableCell from "./TableCell";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
// type
import { BasicTabelProps } from "./type";

const BasicTable = <T extends string | number>({
  tableData,
}: BasicTabelProps<T>) => {
  const rowsPerPage = 3;
  const totalPages = Math.ceil(tableData.rows.length / rowsPerPage);

  const [pagination, setPagination] = useState<number>(0);

  const filteredRows = useMemo(() => {
    const { rows } = tableData;
    const totalItems = pagination * rowsPerPage;
    return rows.slice(totalItems, totalItems + rowsPerPage);
  }, [pagination, tableData]);

  const handlePagination = (inc: number) => {
    setPagination((prev) => {
      if (inc > 0) {
        return prev < totalPages - 1 ? prev + 1 : prev;
      } else {
        return prev > 0 ? prev - 1 : prev;
      }
    });
  };

  /**
   * TSX
   */
  return (
    <div className="w-[90vw] md:w-[50vw] lg:w-[60vw] bg-gray-50 rounded-md shadow border text-xl text-gray-600">
      <TableToolbar />
      <table className="w-full border-y">
        <TableHeader cols={tableData?.cols || []} />
        <TableCell rows={filteredRows || []} />
      </table>
      <TableFooter
        totalPages={totalPages}
        pagination={pagination}
        handlePagination={handlePagination}
        totalRows={tableData?.rows?.length || 0}
      />
    </div>
  );
};

export default BasicTable;
