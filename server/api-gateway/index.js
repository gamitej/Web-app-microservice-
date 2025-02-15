const cors = require("cors");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
// app.use(express.json());
app.use(cors());

//  proxy middleware
app.use(
  "/kanban",
  createProxyMiddleware({
    target: `http://localhost:8001`,
    changeOrigin: true,
    ws: true,
  })
);

app.use(
  "/crud",
  createProxyMiddleware({
    target: `http://localhost:8002`,
    changeOrigin: true,
    ws: true,
  })
);

app.use(
  "/user",
  createProxyMiddleware({ target: `http://localhost:8003`, changeOrigin: true })
);

// Start the gateway
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
