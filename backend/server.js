import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

//app config
const app = express();
const PORT = 4000;

// midlleware
app.use(express.json());
app.use(cors());

//DB connection
connectDB();

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
