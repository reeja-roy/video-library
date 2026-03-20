import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* serve uploaded videos */
app.use("/uploads", express.static("uploads"));

/* database connection */
connectDB();

/* routes */
app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});