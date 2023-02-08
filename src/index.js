require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const cors = require("cors");

const app = express();

// Json Response
app.use(express.json());

//  Cors
app.use(cors());

// Routes
app.use("/", (req, res) => res.send("Welcome to Authg"));
app.use("/user", userRoutes);

// Mongose
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log("connection established"));
  })
  .catch((err) => console.log(err));
