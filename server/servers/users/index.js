const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("hi");
});

const PORT = 8003;
app.listen(PORT, () => console.log(`CRUD Service running on port ${PORT}`));
