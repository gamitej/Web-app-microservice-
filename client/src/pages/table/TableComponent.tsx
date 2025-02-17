import BasicTable from "@/components/table";

const tableData = {
  cols: [
    { headerName: "Name", accessorKey: "name" },
    { headerName: "Age", accessorKey: "age" },
    { headerName: "Salary", accessorKey: "salary" },
    { headerName: "Gender", accessorKey: "gender" },
  ],
  rows: [
    { name: "Amit", age: 12, salary: "0", gender: "M" },
    { name: "Rohan", age: 22, salary: "12k", gender: "M" },
    { name: "Saloni", age: 27, salary: "90k", gender: "F" },
    { name: "Neha", age: 25, salary: "45k", gender: "F" },
    { name: "Amar", age: 32, salary: "132k", gender: "M" },
  ],
};

const TableComponent = () => {
  /**
   * TSX
   */
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <BasicTable tableData={tableData} />
    </div>
  );
};

export default TableComponent;
