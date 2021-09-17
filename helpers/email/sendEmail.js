const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // service: process.env.MAIL_SERVICE,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: process.env.MAIL_USER,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        // Send email
        await transporter.sendMail(options(), (error, info) => {
            if (error) {
                return error;
            } else {
                return res.status(200).json({
                    success: true,
                });
            }
        });
    } catch (error) {
        return error;
    }
};

module.exports = sendEmail;