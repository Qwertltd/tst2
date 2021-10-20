const {OrderPdfFile} = require("../Models/OrderPdfFile");

exports.create = async payload => {
    const newOrderPdfFile = await OrderPdfFile.create(payload);
    return newOrderPdfFile
}
exports.byProductId = async (product_id) => {
    const orderPdfFile = await OrderPdfFile.find({productId: product_id});
    return orderPdfFile
}
exports.byOrderId = async (order_id) => {
    const orderPdfFile = await OrderPdfFile.find({orderId: order_id});
    return orderPdfFile
}
exports.getById = async (id) => {
    const orderPdfFile = await OrderPdfFile.findById(id);
    return orderPdfFile
}
exports.download = async(order_id) => {
    const orderPdfFile = await OrderPdfFile.findOne({orderId: order_id});
    return orderPdfFile
}