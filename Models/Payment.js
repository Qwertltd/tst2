const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    tokenId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    livemode: {
        type: String,
        required: true
    },
    last4: {
        type: String,
        required: true
    },
    exp_month: {
        type: String,
        required: true
    },
    exp_year: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = {PaymentSchema, Payment};