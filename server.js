import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import "dotenv/config";
import Cards from "./dbCards.js";

const db_url = process.env.DB_URL;
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(Cors());

// mongoose.connect(db_url, {
//   useUnifiedTopology: true,
// });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

mongoose.connect(db_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {
    console.log("MongoDB database connection established successfully");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});


app.get("/", (req, res) => res.status(200).send("Hello The Web Dev"));


app.post("/dating/cards", async (req, res) => {
    console.log("Received POST request");
    try {
        const dbCard = req.body;
        const createdCard = await Cards.create(dbCard);
        res.status(201).send(createdCard);
    } catch (error) {
        res.status(500).send(error);
    }
});
  
  app.get("/dating/cards", (req, res) => {
    console.log("Received GET request"); // Add log statement
    Cards.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });
  

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
