const TableFooter = ({ noOfRows = 0 }: { noOfRows: number }) => {
  /**
   * TSX
   */
  return (
    <div className="flex justify-between items-center py-3 px-4 text-blue-500">
      Rows - {noOfRows}
    </div>
  );
};

export default TableFooter;
