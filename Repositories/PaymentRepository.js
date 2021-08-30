const {Payment} = require("../Models/Payment");

exports.all = async userId => {
    const payments = await Payment.find({userId: userId});
    return payments;
};
exports.create = async payload => {
    const newPayment = await Payment.create(payload);
    return newPayment;
}