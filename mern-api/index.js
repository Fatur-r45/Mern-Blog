const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json()); // bentuk JSON
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PACTH, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
//   next();
// });

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const monngodb_url =
  "mongodb://fatur:fatur12345@cluster0-shard-00-00.ydxpb.mongodb.net:27017,cluster0-shard-00-01.ydxpb.mongodb.net:27017,cluster0-shard-00-02.ydxpb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ke2f23-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(monngodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000, () => console.log("Connect Database Succes"));
  })
  .catch((err) => {
    console.log("mondb not connected");
    console.log(err);
  });
