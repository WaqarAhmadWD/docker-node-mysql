const { Op } = require("sequelize");
const { RestaurantProductSale } = require("../models");

const updateSaleStatuses = async () => {
    const now = new Date();
  
    await RestaurantProductSale.update(
      { status: 'expired' }, 
      {
        where: {
          sale_end_date: { [Op.lt]: now }, // If the end date is less than the current date
        },
      }
    );
  
    await RestaurantProductSale.update(
      { status: 'active' },
      {
        where: {
          sale_start_date: { [Op.lte]: now }, // If the start date is less than or equal to the current date
          sale_end_date: { [Op.gte]: now }, // And if the end date is greater than or equal to the current date
        },
      }
    );
  
    await RestaurantProductSale.update(
      { status: 'upcoming' },
      {
        where: {
          sale_start_date: { [Op.gt]: now }, // If the start date is greater than the current date
        },
      }
    );
  };

module.exports = { updateSaleStatuses };