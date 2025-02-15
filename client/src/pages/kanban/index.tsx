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
    const newSocket = io(`${apiGateWayUrl}`, {
      path: "/kanban/socket.io",
    });

    setSocket(newSocket);

    // Fetch initial tasks data
    newSocket.emit("fetch-tasks");

    // Get all task updates
    newSocket.on("tasks", (tasks: TaskType[]) => {
      setTasks(tasks);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  /**
   * TSX
   */
  return (
    <div className="w-full md:w-1/2 m-auto p-6 flex flex-col gap-6 justify-center items-center mt-10">
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-xl font-bold text-gray-600 uppercase">
          Kanban Board
        </h2>
        <button className="rounded-md px-4 py-1 shadow bg-gray-600 text-white hover:bg-gray-500">
          Add
        </button>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {kanbanStatusColumns.map(({ label, value }: ColumnsType) => (
          <div key={value} className="col-span-1 flex flex-col gap-4">
            <h3 className="font-bold uppercase text-blue-400 bg-gray-100 text-center py-2">
              {label}
            </h3>
            {tasks
              .filter((task) => task.status === value)
              .map(({ id, title, description }) => (
                <div
                  key={id}
                  className="border rounded-md shadow p-2 cursor-pointer hover:shadow-md hover:shadow-yellow-300"
                >
                  <h5 className="text-gray-800">{title}</h5>
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
