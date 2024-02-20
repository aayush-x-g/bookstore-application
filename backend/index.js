import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send(`All Good`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`App connected to Database`);
    app.listen(process.env.PORT, () => {
      console.log(`Listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((e) => console.log(e));
