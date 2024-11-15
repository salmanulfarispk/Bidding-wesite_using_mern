const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')
const biddingRoute=require('./routes/biddingRoute')
const categoryRoute=require('./routes/categoryRoute')
const errorHandler=require('./middleware/errorHandler')
const path=require('path')


const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3003"],
    credentials: true,
  })
);  
 
const PORT = process.env.PORT || 5000;

app.use(errorHandler)

//Routes Middleware
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/bidding", biddingRoute);
app.use("/api/category", categoryRoute);


app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // middleware for takes stored images from upload folder




mongoose 
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB Connection Error:', err); 
  }); 