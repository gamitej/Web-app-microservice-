import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
// services
import { apiGateWayUrl } from "@/apiServices/apiServer";
import { ColumnsType, kanbanStatusColumns } from "./data";

interface TaskType {
  id: number;
  title: string;
  status: string;
  description: string;
}

const KanbanPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${apiGateWayUrl}/kanban`);
    setSocket(newSocket);

    // Fetch initial tasks data
    newSocket.emit("fetch-tasks");
  }, []);

  /**
   * TSX
   */
  return (
    <div className="w-full p-6 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-xl font-bold text-gray-600 text-center uppercase">
        Kanban Board
      </h2>
      <div className="w-full grid grid-cols-3 gap-4">
        {kanbanStatusColumns.map(({ label, value }: ColumnsType) => (
          <div key={value} className="col-span-1">
            <h3 className="font-bold uppercase text-blue-400 bg-gray-100 text-center py-2">
              {label}
            </h3>
            {tasks
              .filter((task) => task.status === value)
              .map(({ id, title, description }) => (
                <div key={id} className="border rounded-md shadow p-2">
                  <h5>{title}</h5>
                  <span className="text-gray-400">{description}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanPage;
