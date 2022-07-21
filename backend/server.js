const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://anesuy:anesuy@cluster0.owvqj.mongodb.net/notesDB");

app.use("/", require("./routes/noteRoute"));

app.listen(4000, () => {
    console.log("express server is running on port 4000");
});