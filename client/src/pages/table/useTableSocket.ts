import io, { Socket } from "socket.io-client";
import { ReactNode, useEffect, useState } from "react";
import { apiGateWayUrl } from "@/apiServices/apiServer";
import { TableData } from "./type";

export const useTableSocket = <T extends ReactNode>() => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<TableData<T>>({
    rows: [],
    columns: [],
  });
  const [socket, setSocket] = useState<typeof Socket | null>(null);
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

  /**
   * ============================ EVENT HANDLER'S ============================
   */

  // edit row data web-socket connection
  const handleEditRowData = (rowIndex: number, key: string, editValue: T) => {
    if (socket) socket.emit("update-row", rowIndex, key, editValue);
  };

  return { isLoading, errorMessage, handleEditRowData, tableData };
};
