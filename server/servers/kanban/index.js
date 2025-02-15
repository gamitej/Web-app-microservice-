/**
 * Kanban Board Microservice
 */
const http = require("http");
const { Pool } = require("pg");
const express = require("express");
const { Server } = require("socket.io");

// configuration
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

// database configuration
const pool = new Pool({
  user: "user",
  host: "postgres-master",
  database: "kanban",
  password: "password",
  port: 5432,
});

const data = [
  { id: 1, title: "Cooking", description: "Cooking food", status: "todo" },
  {
    id: 2,
    title: "Iron",
    description: "Iron all office clothes",
    status: "in-progress",
  },
  { id: 3, title: "Clean", description: "Clean room", status: "completed" },
  {
    id: 4,
    title: "Office",
    description: "Complete office work",
    status: "todo",
  },
];

io.on("connection", (socket) => {
  console.log("A user connected");

  // fetch all tasks on connection
  socket.on("fetch-tasks", async () => {
    socket.emit("tasks", data);
  });

  // Add a new task
  socket.on("add-task", async () => {});

  // Update a task
  socket.on("update-task", async () => {});

  // Delete a task
  socket.on("delete-task", async () => {});

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Kanban Microservice running on port ${PORT}`);
});
