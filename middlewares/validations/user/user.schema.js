const joi = require('@hapi/joi');

const schema = {
  user: joi.object({
    id: joi.number().required(),
    first_name: joi.string().max(100).required(),
    last_name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    // Password must contain at least 8 characters one letter and one number
    password: joi
      .string()
      .pattern(new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
      .message(
        'Password must contain at least 8 characters including one letter and one number'
      )
      .required(),
  }),
};

module.exports = schema;
