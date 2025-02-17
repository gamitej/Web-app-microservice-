import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
// components
import GridTable from "@/components/table/GridTable";
// data
import { TableData } from "./type";
// services
import { apiGateWayUrl } from "@/apiServices/apiServer";

const App = <T,>() => {
  const [tableData, setTableData] = useState<TableData<T>>({
    rows: [],
    columns: [],
  });
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${apiGateWayUrl}`, { path: "/crud/socket.io" });
    setSocket(newSocket);

    newSocket.emit("fetch-table");

    newSocket.on("table-data", (data: TableData<T>) => {
      setTableData(data);
    });

    newSocket.on(
      "row-updated",
      (rowIndex: number, key: string, editValue: T) => {
        console.log({ rowIndex, key, editValue });

        setTableData((table: TableData<T>) => {
          table.rows[rowIndex][key] = editValue;
          return { columns: table.columns, rows: table.rows };
        });
      }
    );
  }, []);

  const handleEditRowData = (rowIndex: number, key: string, editValue: T) => {
    if (socket) {
      socket.emit("update-row", rowIndex, key, editValue);
    }
  };

  /**
   * TSX
   */
  return (
    <GridTable
      onSave={handleEditRowData}
      data={tableData?.rows || []}
      columns={tableData?.columns || []}
    />
  );
};

export default App;
