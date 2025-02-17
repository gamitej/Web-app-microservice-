const http = require("http");
const { Pool } = require("pg");
const express = require("express");
const { Server } = require("socket.io");

// Configuration
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());

// Database Configuration
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

// Socket.io Handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Fetch table data
  socket.on("fetch-table", async () => {
    try {
      socket.emit("table-data", tableData);
    } catch (error) {
      console.error("Error fetching table data:", error);
      socket.emit("error", "Failed to fetch table data.");
    }
  });

  // Update a row
  socket.on("update-row", async (rowIndex, key, editValue) => {
    try {
      if (!rows[rowIndex]) throw new Error("Row index out of bounds");
      rows[rowIndex][key] = editValue;

      // Emit the updated row
      io.emit("row-updated", rowIndex, key, editValue);
    } catch (error) {
      console.error("Error updating row:", error.message);
      socket.emit("error", "Failed to update row.");
    }
  });

  // Handle errors
  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 8002;
server.listen(PORT, () => {
  console.log(`CRUD Microservice running on port ${PORT}`);
});
