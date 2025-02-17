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

const columns = [
  { accessorKey: "name", headerName: "Name", width: "200px" },
  { accessorKey: "age", headerName: "Age", width: "100px" },
  { accessorKey: "salary", headerName: "Salary", width: "150px" },
  { accessorKey: "gender", headerName: "Gender", width: "120px" },
  { accessorKey: "location", headerName: "Location", width: "1fr" },
];

let rows = [
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

let tableData = { columns, rows };

io.on("connection", (socket) => {
  console.log("A user connected");

  // fetch all tasks on connection
  socket.on("fetch-table", async () => {
    socket.emit("table-data", tableData);
  });

  // Add a new task
  socket.on("add-row", async () => {});

  // Update a task
  socket.on("update-row", async (rowIndex, key, editValue) => {
    rows[rowIndex][key] = editValue;
    io.emit("row-updated", rowIndex, key, editValue);
  });

  // Delete a task
  socket.on("delete-row", async () => {});

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 8002;
server.listen(PORT, () => {
  console.log(`CRUD Microservice running on port ${PORT}`);
});
