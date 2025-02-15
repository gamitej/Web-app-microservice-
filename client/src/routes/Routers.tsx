import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

// pages
const HomePage = lazy(() => import("@/pages/home"));
const KanbanPage = lazy(() => import("@/pages/kanban"));
const TablePage = lazy(() => import("@/pages/table"));
const UserPage = lazy(() => import("@/pages/user"));

const Routers = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "kanban",
      element: <KanbanPage />,
    },

    {
      path: "table",
      element: <TablePage />,
    },
    {
      path: "user",
      element: <UserPage />,
    },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default Routers;
