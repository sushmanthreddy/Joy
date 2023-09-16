import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./userRoutes.js";

const app = express();

dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management System");
});

app.listen(4000, () => console.log(`Server running on port:4000`));
