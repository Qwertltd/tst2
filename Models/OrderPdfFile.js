const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderPdfFileSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    dataUrl:{type: String,required: true},
    numberofColumns: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    topMargin: {
        type: Number,
        required: true,
    },
    leftMargin: {
        type: Number,
        required: true,
    },
    verticalSpacing: {
        type: Number,
        required: true,
    },
    horizontalSpacing: {
        type: Number,
        required: true,
    },
    itemWidth: {
        type: Number,
        required: true,
    },
    itemHeight: {
        type: Number,
        required: true,
    },
},{
    timestamps: true,
});

const OrderPdfFile = mongoose.model('OrderPdfFile', OrderPdfFileSchema);

module.exports = {OrderPdfFileSchema, OrderPdfFile};