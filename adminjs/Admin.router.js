const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const options = require('./admin.options')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const adminJs = new AdminJS(options);

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@zooprint.com',
    password: process.env.ADMIN_PASSWORD || 'password1234'
}

/**
 * @param {AdminJs} adminJs
 * @return {express.Router} router
 */
 const buildAdminRouter = (adminJs) => {
    const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
        cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-zooprint',
        cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecretpassword',
        authenticate: async (email, password) => {
            if(email === ADMIN.email && password === ADMIN.password){
                return ADMIN
            }
            return null;
        },
    }, null, {
        resave: false,
        saveUninitialized: true,    
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    });
    return router;
};

module.exports = buildAdminRouter