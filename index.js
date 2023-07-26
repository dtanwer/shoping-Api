import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRouter from "./router/client.js";
import productRouter from "./router/product.js";
import orderRouter from "./router/order.js";
import bannerRouter from "./router/banner.js";
import uploadRouter from "./router/upload.js";
import mongoConnection from "./config/mongoConfig.js";
import path from "path";
import * as url from "url";
const app = express();
dotenv.config();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Api is working!!");
});

app.use("/auth", clientRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/banner", bannerRouter);
app.use("/uploads", uploadRouter);

mongoConnection();

app.listen(5000, () => {
  console.log("server is Working!! 5000");
});
