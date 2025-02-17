import { ReactNode, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
// components
import GridTable from "@/components/table/GridTable";
// data
import { TableData } from "./type";
// services
import { apiGateWayUrl } from "@/apiServices/apiServer";

const App = <T extends ReactNode>() => {
  const [tableData, setTableData] = useState<TableData<T>>({
    rows: [],
    columns: [],
  });
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(`${apiGateWayUrl}`, { path: "/crud/socket.io" });

    setSocket(newSocket);
    setIsLoading(true);
    setErrorMessage(null);

    newSocket.emit("fetch-table");

    newSocket.on("table-data", (data: TableData<T>) => {
      setTableData(data);
      setIsLoading(false);
    });

    newSocket.on("connect_error", (err: any) => {
      console.error("Socket connection error:", err);
      setErrorMessage("Failed to connect to the server.");
      setIsLoading(false);
    });

    newSocket.on("error", (err: any) => {
      console.error("Socket error:", err);
      setErrorMessage("An error occurred while communicating with the server.");
    });

    newSocket.on(
      "row-updated",
      (rowIndex: number, key: string, editValue: T) => {
        console.log({ rowIndex, key, editValue });

        setTableData((table) => {
          const updatedRows = [...table.rows];
          updatedRows[rowIndex] = {
            ...updatedRows[rowIndex],
            [key]: editValue,
          };
          return { columns: table.columns, rows: updatedRows };
        });
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleEditRowData = (rowIndex: number, key: string, editValue: T) => {
    if (socket) {
      socket.emit("update-row", rowIndex, key, editValue);
    }
  };

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
