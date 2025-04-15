
  const express = require("express");
  const mongoose = require("mongoose");
  require("dotenv").config();

  const app = express();
  
  app.listen(5002,()=>console.log("Server running succesfully at port number 5002...!!"));

  app.use(express.json());

  app.use(require("./routes/route"));

  mongoose
    .connect(process.env.DB_URL)
    .then(()=>console.log("MongoDB connection Success....!!"))
    .catch((err)=>console.log("unable to connect check your connection"));
