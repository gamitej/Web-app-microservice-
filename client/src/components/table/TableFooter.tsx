import { IoIosArrowForward as RightArrowIcon } from "react-icons/io";

interface TableFooterProps {
  totalRows: number;
  totalPages: number;
  pagination: number;
  handlePagination: (val: -1 | 1) => void;
}

const TableFooter = ({
  totalRows = 0,
  pagination,
  totalPages = 0,
  handlePagination,
}: TableFooterProps) => {
  return (
    <div className="flex justify-between items-center py-3 px-4 text-blue-500 font-[550]">
      <div>Rows - {totalRows}</div>
      <div className="flex justify-center items-center gap-2">
        <span
          aria-disabled={pagination === 0}
          onClick={() => handlePagination(-1)}
          className={`cursor-pointer hover:bg-gray-200 rounded-full p-2 ${
            pagination === 0 ? "text-gray-400 cursor-not-allowed" : ""
          }`}
        >
          <RightArrowIcon className="-rotate-180 text-2xl mr-1" />
        </span>
        <span>
          {pagination + 1} / {totalPages}
        </span>
        <span
          aria-disabled={pagination === totalPages - 1}
          onClick={() => handlePagination(1)}
          className={`cursor-pointer hover:bg-gray-200 rounded-full p-2 ${
            pagination === totalPages - 1
              ? "text-gray-400 cursor-not-allowed"
              : ""
          }`}
        >
          <RightArrowIcon className="text-2xl ml-1" />
        </span>
      </div>
    </div>
  );
};

export default TableFooter;
