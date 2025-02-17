// components
import GridTable from "@/components/table/GridTable";
import { useTableSocket } from "./useTableSocket";

const App = () => {
  const { isLoading, errorMessage, handleEditRowData, tableData } =
    useTableSocket();

  return (
    <div>
      {isLoading && <p>Loading data...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {!isLoading && !errorMessage && (
        <GridTable
          onSave={handleEditRowData}
          data={tableData?.rows || []}
          columns={tableData?.columns || []}
        />
      )}
    </div>
  );
};

export default App;
