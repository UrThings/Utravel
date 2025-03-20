import express from "express";
import orderRoutes from "./router/index.router";  
import cors from "cors";
import * as dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS тохиргоо
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization"
  })
);

app.use(express.json());
app.use("/api/", orderRoutes);
app.use(errorHandler);
app.options("*", cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
