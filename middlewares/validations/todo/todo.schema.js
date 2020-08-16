const joi = require('@hapi/joi');

const schema = {
  todo: joi.object({
    id: joi.string().max(255),
    todo: joi.string().max(1000).required(),
    completed: joi.boolean().required(),
    user: joi.object(),
  }),
};

module.exports = schema;
