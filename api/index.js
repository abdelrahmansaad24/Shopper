const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const reviewRoute = require("./routes/review.js");
const orderRoute = require("./routes/order.js");
const userRoute = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./controllers/error.js");
const error = require("./controllers/error.js");

const PORT = process.env.PORT || 8900;

const app = express();
dotenv.config();

console.log(process.env.MONGO);
const connect = () => {
  try {
    mongoose.connect(
      "mongodb://127.0.0.1:27017/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => {
        if (error) console.log(error);
        else console.log("connected");
      }
    );
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// middleware to set headers security
app.use(helmet());

// middleware to limit too many requests from same api
// const limiter = rateLimit({
//   max: 100,
//   window: 60 * 60 * 1000,
//   message: "Too Many requests from this Ip, Please Try agian in an hour",
// });

// app.use("/api", limiter);

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// Data Sanitization against nosql query injection
app.use(mongoSanitize());

// Data Sanitization against XSS attach
app.use(xss());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  connect();
  console.log("Connected to backend.");
});
