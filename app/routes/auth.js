const { Router } = require("express");
const router = Router();
const { authController } = require("../controllers");
const {
  authenticateToken,
  authenticateAdmin,
  authenticateBusiness,
} = require("../middlewares/verifyIdToken");
router.post("/register", authController.register);
router.post("/verifyotp", authController.verifyOTP);
router.post("/login", authController.login);
router.post(
  "/store-token",
  [authenticateToken],
  authController.storeDeviceToken
);

router.post("/forgot-password", authController.forgotPass);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
