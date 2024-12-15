const Sequelize = require("sequelize");
require("dotenv").config();
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require("../models/users")(sequelize, Sequelize);

// --------------  Accociations. -------------------------------- //

// db.businessSpot.belongsTo(db.BusinessProfile, { foreignKey: "businessId" });
// db.BusinessProfile.hasMany(db.businessSpot, { foreignKey: "businessId" });

// Run the sync method to create the tables
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("tables connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

module.exports = db;
