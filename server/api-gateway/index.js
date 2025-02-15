const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

//  proxy middleware
app.use(
  "/kanban",
  createProxyMiddleware({ target: `http://localhost:8001`, changeOrigin: true })
);

app.use(
  "/crud",
  createProxyMiddleware({ target: `http://localhost:8002`, changeOrigin: true })
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
