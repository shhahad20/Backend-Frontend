import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

import productRouter from "./routes/productsRoute.js";

const app = express();
const PORT = process.env.SERVER_PORT || 3002;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use('/products',productRouter);

app.listen(PORT, () => {
  console.log(`server running on at http://localhost:${PORT}`);
});



app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});
