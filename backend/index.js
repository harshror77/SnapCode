import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import snippetRoutes from "./routes/snippets.js"
import dotenv from "dotenv"
dotenv.config({path:'./.env'})


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/snippets", snippetRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("DB connection failed:", err));
