import express from "express";
import job from "./utils/cron";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import cors from "cors"
import AuthRoute from './routes/authRoutes'
import UserRoute from './routes/userRoutes'

dotenv.config();
//initialize express app
const app = express();

connectDB()

job.start();

//middleware
app.use(cors());
app.use(express.json());



app.use("/api/v1/user",AuthRoute )
app.use("/api/v1",UserRoute)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("Server is working");
});
