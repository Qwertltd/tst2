const createError = require('http-errors')
const {User} = require('../Models/User')
const { authRegisterSchema, authLoginSchema, authUpdateSchema } = require('../helpers/validation')
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require('../helpers/jwt_helper')
  
module.exports = {
    register: async (req, res, next) => {
        try {
            const result = await authRegisterSchema.validateAsync(req.body)

            const doesExist = await User.findOne({ email: result.email })
            if (doesExist)
                throw createError.Conflict(`${result.email} is already been registered`)

            const user = new User(result)
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser.id)
            //const refreshToken = await signRefreshToken(savedUser.id)

            res.send({ accessToken, user })
        } catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const result = await authLoginSchema.validateAsync(req.body)
            const user = await User.findOne({ email: result.email })
            if (!user) throw createError.NotFound('User not registered')

            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch)
                throw createError.Unauthorized('Username/password not valid')

            const accessToken = await signAccessToken(user.id)
            //const refreshToken = await signRefreshToken(user.id)

            res.send({ accessToken, user })
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Invalid Username/Password'))
            next(error)
        }
    },
    
    update: async (req, res, next) => {
        try {
            const result = await authUpdateSchema.validateAsync(req.body)

            const user_id = req.query.id;
            const first_name = result.first_name;
            const last_name = result.last_name;
            const email = result.email;

            const user = await User.findByIdAndUpdate(user_id, {'first_name': first_name, 'last_name': last_name, 'email': email}, {
                new: true
              });
            const accessToken = await signAccessToken(user_id)
            res.send({ accessToken, user })
        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)

            const accessToken = await signAccessToken(userId)
            const refToken = await signRefreshToken(userId)
            res.send({ accessToken: accessToken, refreshToken: refToken })
        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken)
            client.DEL(userId, (err, val) => {
                if (err) {
                throw createError.InternalServerError()
                }
                res.sendStatus(204)
            })
        } catch (error) {
            next(error)
        }
    },
}