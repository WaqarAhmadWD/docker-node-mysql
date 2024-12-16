const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/responseFormatter");
const { generateCode } = require("../utils/generatecode");
const { ROLES } = require("../constants");
const { Users, sequelize } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  register: async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
      const { email, password } = req.body;
      const isCustomer = req.body.role === "customer";
      const isBusiness = req.body.role === "business";

      const existingUser = await Users.findOne({ where: { email } });

      if (existingUser) {
        return sendResponse(
          res,
          409,
          "User with this email already exists",
          null
        );
      }

      let assignedRole;
      if (isCustomer) {
        assignedRole = ROLES.CUSTOMER;
      } else if (isBusiness) {
        assignedRole = ROLES.BUSINESS;
      } else {
        return sendResponse(
          res,
          403,
          "Role is not defined to create this user",
          null
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const code = generateCode();
      const codeExpiry = Date.now() + 3600000;

      const user = await Users.create(
        {
          email,
          password: hashedPassword,
          role: assignedRole,
          is_verified_mail: false,
        },
        { transaction }
      );

      user.email_otp = code;
      user.email_otp_expires = codeExpiry;
      await user.save({ transaction });

      await transaction.commit();

      return sendResponse(
        res,
        201,
        "OTP sent to your email. Please verify your email."
      );
    } catch (err) {
      await transaction.rollback();
      return sendResponse(
        res,
        err.status || 500,
        err.message || `Something went wrong! || ${err.message}`
      );
    }
  },

  verifyOTP: async (req, res) => {
    const { email, code, purpose } = req.body;

    try {
      const user = await Users.findOne({
        where: {
          email,
          email_otp: code,
          email_otp_expires: { [Op.gt]: Date.now() },
        },
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return sendResponse(
          res,
          400,
          "Verification code is invalid or has expired"
        );
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWD_TOKEN,
        {
          expiresIn: "8h",
        }
      );

      user.is_verified_mail = true;
      // reset
      if (purpose !== "reset") {
        user.email_otp = null;
        user.email_otp_expires = null;
      }
      await user.save();

      return sendResponse(res, 201, "OTP verified successfully", {
        token,
        user,
      });
    } catch (err) {
      return sendResponse(
        res,
        err.status || 500,
        err.message || "Something went wrong!"
      );
    }
  },

  storeDeviceToken: async (req, res) => {
    try {
      const id = req.user.id;
      const { device_token } = req.body;
      if (!device_token) {
        return sendResponse(res, 404, "device_token is required");
      }

      const user = await Users.findByPk(id);
      if (!user) {
        return sendResponse(res, 404, "User not found");
      }
      user.device_token = device_token;
      user.save();
      return sendResponse(res, 200, "Device token saved successfully");
    } catch (error) {
      return sendResponse(res, 500, "Internal Server Error " + error?.message);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return sendResponse(res, 404, "Incorrect Username", null);
      }

      if (!user.is_verified_mail) {
        return sendResponse(
          res,
          403,
          "Please verify your email before logging in.",
          null
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return sendResponse(res, 401, "Incorrect password", null);
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWD_TOKEN,
        {
          expiresIn: "8h",
        }
      );

      // Return success response with token
      return sendResponse(res, 200, "Login successful", {
        token,
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch (err) {
      return sendResponse(
        res,
        err.status || 500,
        err.message || `Something went wrong! || ${err.message}`
      );
    }
  },

  forgotPass: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return sendResponse(
          res,
          404,
          "User with this email does not exist",
          null
        );
      }

      const code = generateCode();
      const codeExpiry = Date.now() + 3600000; // 1 hour from now

      user.email_otp = code;
      user.email_otp_expires = codeExpiry;
      const message = `You are receiving this because you have requested to reset the password for your account. <br><br>
                 Your verification code is: ${code}<br><br>
                 This code will expire in one hour.<br><br>
                 If you did not request this, please ignore this email and your password will remain unchanged.<br><br>`;

      await user.save();

      return sendResponse(res, 201, "check your email, please.");
    } catch (err) {
      return sendResponse(
        res,
        err.status || 500,
        err.message || "Something went wrong!"
      );
    }
  },

  resetPassword: async (req, res) => {
    const { email, code, password } = req.body;

    try {
      const user = await Users.findOne({
        where: {
          email,
          email_otp: code,
          email_otp_expires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) {
        return sendResponse(res, 404, "User not found or email not verified.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;

      user.email_otp = null;
      user.email_otp_expires = null;

      await user.save();

      return sendResponse(res, 200, "Password has been reset");
    } catch (err) {
      return sendResponse(
        res,
        err.status || 500,
        err.message || "Something went wrong!"
      );
    }
  },
};
