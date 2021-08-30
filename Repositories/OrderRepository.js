const {Order} = require("../Models/Order");

exports.all = async userId => {
    const orders = await Order.find({userId: userId}).populate({
        path: "items.productId",
        select: "title price total"
    });
    return orders;
};
exports.single = async (paymentId) => {
    const order = await Order.findOne({paymentId: paymentId});
    return order;
};
exports.create = async payload => {
    const newOrder = await Order.create(payload);
    return newOrder
}