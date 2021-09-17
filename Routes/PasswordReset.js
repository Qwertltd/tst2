const createError = require('http-errors')
const { User } = require("../Models/User");
const { Token } = require("../Models/Token");
const sendEmail = require("../helpers/email/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const bcrypt = require('bcrypt')
const express = require("express");
const router = express.Router();

router.post("/requestResetPassword", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({type: "Invalid",msg: error.details[0].message,err: error});

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json({type: "Invalid",msg: "user with given email doesn't exist"});

        let token = await Token.findOne({ userId: user._id });
        if (token) { await token.deleteOne()};
        
            

        let resetToken = crypto.randomBytes(32).toString("hex");
        const salt = await bcrypt.genSalt(20)
        const hash = await bcrypt.hash(resetToken, salt);
        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save();

        const link = `${process.env.FRONTEND_BASE_URL}/password-reset/${user._id}/${resetToken}`;
        await sendEmail(user.email, "Password Reset Request",{name: user.first_name,link: link},"./template/requestResetPassword.handlebars");

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: error
        })
    }
});

router.post("/resetPassword", async (req, res) => {
    try {
        const schema = Joi.object({ userId: Joi.string().required(), token: Joi.string().required(), password: Joi.string().min(6).required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({type: "Invalid",msg: error.details[0].message,err: error});

        const { userId, token, password } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(400).json({type: "Invalid",msg: "User Account not Found"});

        const checkToken = await Token.findOne({
            userId: user._id,
        });
        if (!checkToken) return res.status(400).json({type: "Invalid",msg: "Invalid password reset token"});

        const isValid = await bcrypt.compare(token, checkToken.token);
        if (!isValid) {
            return res.status(400).json({type: "Invalid",msg: "Invalid or expired password reset token"});
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        await user.save();
        sendEmail(
            user.email,
            "Password Reset Successfully",
            {
              name: user.first_name,
            },
            "./template/resetPassword.handlebars"
        );
        await checkToken.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: error
        })
    }
});

module.exports = router;