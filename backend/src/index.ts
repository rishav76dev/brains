import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import cors from "cors"
import AuthRoute from './routes/authRoutes'
import UserRoute from './routes/userRoutes'

//initialize express app
const app = express();

connectDB()

//middleware
app.use(cors());
app.use(express.json());



dotenv.config();

app.use("/api/v1/user",AuthRoute )
app.use("/api/v1",UserRoute)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("Server is working");
});
