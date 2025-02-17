import TableCell from "./TableCell";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
// type
import { BasicTabelProps } from "./type";

const BasicTable = <T extends string | number>({
  tableData,
}: BasicTabelProps<T>) => {
  /**
   * TSX
   */
  return (
    <div className="w-[40rem] bg-gray-50 rounded-md shadow border text-xl text-gray-600">
      <TableToolbar />
      <table className="w-full border-y">
        <TableHeader cols={tableData?.cols || []} />
        <TableCell rows={tableData?.rows || []} />
      </table>
      <TableFooter noOfRows={tableData?.rows?.length || 0} />
    </div>
  );
};

export default BasicTable;
