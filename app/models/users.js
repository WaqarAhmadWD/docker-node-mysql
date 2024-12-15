const { ROLES } = require("../constants");

const table = "users";

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    table,
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(Object.values(ROLES)),
        allowNull: false,
      },
      email_otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_otp_expires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_verified_mail: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      device_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Users;
};
