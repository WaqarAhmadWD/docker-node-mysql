const { Users, BusinessProfile } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendResponse = require("../utils/responseFormatter");

module.exports = {
  authenticateToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return sendResponse(
          res,
          401,
          "401 Unauthorized | No Token Found",
          null
        );
      }

      const decode = await jwt.verify(token, process.env.JWD_TOKEN);

      const user = await Users.findByPk(decode.userId);
      if (!user) {
        return sendResponse(
          res,
          401,
          "401 Unauthorized | User not found",
          null
        );
      }

      if (!user.is_verified_mail) {
        return sendResponse(
          res,
          403,
          "403 Forbidden | Email not verified",
          null
        );
      }

      req.user = user;

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return sendResponse(
          res,
          403,
          "403 Forbidden | Token has been expired",
          null
        );
      } else {
        return sendResponse(res, 401, "401 Unauthorized | Invalid Token", null);
      }
    }
  },

  authenticateAdmin: (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      return sendResponse(res, 403, "403 Forbidden | Admin access only", null);
    }
  },

  authenticateBusiness: async (req, res, next) => {
    if (req.user && req.user.role === "business") {
      const business = await BusinessProfile.findOne({
        where: { user_id: req.user.id },
      });

      if (!business) {
        return sendResponse(
          res,
          404,
          "404 Not Found | Business not found",
          null
        );
      }

      req.user.businessID = business.id;
      return next();
    } else {
      return sendResponse(
        res,
        403,
        "403 Forbidden | Business access only",
        null
      );
    }
  },
};
