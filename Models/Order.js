const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
let BillingSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    company_name:{
        type: String
    },
    phone:{
        type: String,
        required: true
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    post_code: {
        type: String
    },
    order_notes: {
        type: String
    }
}, {
    timestamps: true
})
let ShippingSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    company_name:{
        type: String
    },
    phone:{
        type: String,
        required: true
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    post_code: {
        type: String
    }
}, {
    timestamps: true
})
const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    },
    status: {
        type: String,
    },
    billing: [BillingSchema],
    shipping: [ShippingSchema],
}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = {OrderSchema, Order};