import GridTable from "@/components/table/GridTable";

const columns = [
  { accessorKey: "name", headerName: "Name", width: "200px" },
  { accessorKey: "age", headerName: "Age", width: "100px" },
  { accessorKey: "salary", headerName: "Salary", width: "150px" },
  { accessorKey: "gender", headerName: "Gender", width: "120px" },
  { accessorKey: "location", headerName: "Location", width: "1fr" }, // Flexible width
];

const data = [
  { name: "Amitej", age: 22, salary: "12k", gender: "Male", location: "Delhi" },
  { name: "John", age: 30, salary: "25k", gender: "Male", location: "Mumbai" },
  {
    name: "Sara",
    age: 28,
    salary: "20k",
    gender: "Female",
    location: "Bangalore",
  },
];

const App = () => {
  return <GridTable columns={columns} data={data} />;
};

export default App;
