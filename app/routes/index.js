const router = require("express").Router();

const authRoutes = require("./auth");

router.use("/auth", authRoutes);
// Route to upload an image

module.exports = router;
