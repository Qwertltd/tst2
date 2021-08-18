const Joi = require('@hapi/joi')

const authLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
})
const authRegisterSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
})
const authUpdateSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
})

module.exports = {
    authLoginSchema, authRegisterSchema, authUpdateSchema
}