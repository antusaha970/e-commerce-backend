const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productRouter = require("./router/Product");
const brandsRouter = require("./router/Brand");
const categoryRouter = require("./router/Category");
const morgan = require("morgan");
const cors = require("cors");
// Middleware
server.use(express.json());
server.use(morgan("dev"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

// Main function
main().catch((err) => {
  console.log(err);
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
  console.log("connected to MongoDB");
}

// Routers
server.use("/products", productRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/categories", categoryRouter.router);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
