const express = require('express') 
const morgan = require('morgan')
const { default: AdminJs } = require('adminjs');
const createError = require('http-errors')
require('dotenv').config()
require('./db/mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')

const cors = require('cors')

const AppRoute = require('./Routes/App')
const AuthRoute = require('./Routes/Auth')
const CategoryRoute = require('./Routes/Category')
const SubCategoryRoute = require('./Routes/SubCategory')
const ProductRoute = require('./Routes/Product')
const CartRoute = require('./Routes/Cart')
const PaymentRoute = require('./Routes/Payment')
const OrderRoute = require('./Routes/Order')
const OrderPdfFileRoute = require('./Routes/OrderPdfFile')
const TemplateRoute = require('./Routes/Template')
const PasswordResetRoute = require('./Routes/PasswordReset')

const options = require('./adminjs/admin.options');
const buildAdminRouter = require('./adminjs/Admin.router')

const app = express()
app.use(morgan('dev'))
app.use(cors())



app.get('/', async(req, res, next) => {
    res.send('Hello from Express')
    console.log("Hello from Express")
})

app.get('/dashboard', verifyAccessToken, async(req, res, next) => {
    res.send('Verified route')
})

const admin = new AdminJs(options);
const router = buildAdminRouter(admin);

app.use(admin.options.rootPath, router);
app.use('/uploads', express.static('uploads'));
//import json for form data
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use('/api', AppRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/categories', CategoryRoute);
app.use('/api/subCategories', SubCategoryRoute);
app.use('/api/products', ProductRoute);
app.use('/api/cart', CartRoute);
app.use('/api', PaymentRoute);
app.use('/api', OrderRoute);
app.use('/api', PasswordResetRoute);
app.use('/api', TemplateRoute);
app.use('/api', OrderPdfFileRoute);

app.use(async (req, res, next) => {
    error = createError.NotFound('This route does not exist')
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
    console.log(`Server now running on port ${PORT}`);
})
