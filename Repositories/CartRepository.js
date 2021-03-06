const {Cart} = require("../Models/Cart");

exports.cart = async userId => {
    const carts = await Cart.find({userId: userId}).populate({
        path: "items.productId",
        select: "title imageUrl price total"
    });
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
};
exports.cartItemsCount = async userId => {
    const carts = await Cart.find({userId: userId});
    return carts[0];
}