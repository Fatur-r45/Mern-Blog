import express from "express";
import db from "./config/Databse.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";
// import Users from "./model/userModel.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Conected");
  // await Users.sync();
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("server runing at port 5000"));
