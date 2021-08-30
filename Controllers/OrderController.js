const createError = require('http-errors')
const orderRepository = require('../Repositories/OrderRepository')
  
module.exports = {
    getOrder: async (req, res) => {
        try {
            const {paymentId} = req.query;
            let order = await orderRepository.single(paymentId)
            if (!order) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Order not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: order
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    getOrders: async (req, res) => {
        try {
            const {userId} = req.query;
            let orders = await orderRepository.all(userId)
            if (!orders) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: orders
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
}