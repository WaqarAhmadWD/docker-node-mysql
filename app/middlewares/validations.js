const { body, param, check, validationResult } = require('express-validator');

const businessValidationRules = [
  check('name')
    .notEmpty().withMessage('Business name is required'),
  check('type')
    .isIn(['restaurant', 'shop']).withMessage('Business type must be either restaurant or shop'),
  check('address')
    .notEmpty().withMessage('Address is required'),
  check('contact_number')
    .notEmpty().withMessage('Valid contact number is required'),
  check('business_hours')
    .custom((value, { req }) => {
      let parsedHours;
      if (typeof value === 'string') {
        try {
          parsedHours = JSON.parse(value);
          if (!Array.isArray(parsedHours)) {
            throw new Error('Business hours must be an array');
          }
        } catch (err) {
          throw new Error('Invalid business hours format');
        }
      } else {
        parsedHours = value;
      }

      req.body.business_hours = parsedHours;

      parsedHours.forEach(hour => {
        if (!hour.day || !hour.open || !hour.close) {
          throw new Error('Each business hour must have day, open, and close fields');
        }
      });
      return true;
    })
];

const validateCreateSale = [
  param('productId').isInt().withMessage('Product ID must be a valid integer'),
  param('businessId').isInt().withMessage('Business ID must be a valid integer'),
  body('sale_price').isFloat({ gt: 0 }).withMessage('Sale price must be a positive number'),
  body('sale_start_date').isISO8601().toDate().withMessage('Sale start date must be a valid date'),
  body('sale_end_date').isISO8601().toDate().withMessage('Sale end date must be a valid date'),
];

module.exports = { businessValidationRules, validateCreateSale }
