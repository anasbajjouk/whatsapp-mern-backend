import express from "express";
import mongoose from "mongoose";
import Messages from "./models/dbMessages.js";
import Pusher from "pusher";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1067881",
  key: "9667449f8d9edfb9e7ef",
  secret: "b6c5a52337b72ce9884e",
  cluster: "eu",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
});

// middlewares
app.use(express.json());

// DB config
const connection_url =
  "mongodb+srv://admin:yqRMuhgrmh4fuo7r@cluster0.ailak.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("connected to DB"))
  .catch((error) => console.error(error.message));

//????

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`Listenning on port: ${port}`));
