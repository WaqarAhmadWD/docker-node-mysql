const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const ROUTES = require("./routes/index");
const path = require("path");

require("dotenv").config();
require("./models");

app.use(
  session({
    secret: process.env.JWD_TOKEN,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use("/api/v1", ROUTES);
app.get("/uploads/:photoType/:id", async (req, res) => {
  const { photoType, id } = req.params;
  if (!photoType || !id) {
    return res.status(404).json({
      message: `type and id is required`,
    });
  }
  const imagePath = path.join(__dirname, `/uploads/${photoType}/${id}`); // Replace with your image path
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(500).send(`Error sending ${photoType} the image`);
    }
  });
});
app.use((req, res) => {
  return res.status(404).json({
    message: `Invalid path: ${req.originalUrl}`,
  });
});

module.exports = app;
