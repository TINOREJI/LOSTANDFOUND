import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import itemRoutes from "./routes/items.js";
import matchRoutes from "./routes/match.js";
import questionnaireRoutes from "./routes/questionnaire.js";
import connectDB from "./models/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8800

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get('/',(req,res)=>{
  res.send("hello world")
})


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/match", matchRoutes);
app.use("/api/v1/questionnaire", questionnaireRoutes);



app.listen(port,()=>{
  console.log(`Example app listening on port: http://localhost:${port}`);
})
