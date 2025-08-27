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

<<<<<<< HEAD
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

mongoose.connect(db)
  .then(() => app.listen(port, () => 
    console.log(`Server running on http://localhost:5000`)))
  .catch((err) => console.log(err));
=======
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/match", matchRoutes);
app.use("/api/v1/questionnaire", questionnaireRoutes);


>>>>>>> db28076 (update code)
// console.log(db)


app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Example app listening on http://localhost:${port}`);
});
=======
  console.log(`Example app listening on port http://localhost:${port}`)
})
>>>>>>> db28076 (update code)
