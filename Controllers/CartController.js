const createError = require('http-errors')
const {User} = require('../Models/User')
const {Product} = require('../Models/Product')
const cartRepository = require('../Repositories/CartRepository')
const productRepository = require('../Repositories/ProductRepository')
  
module.exports = {
    addItemToCart: async (req, res) => {
        const {userId} = req.body;
        const {productId} = req.body;
        const {paper_stock} = req.body;
        const quantity = Number.parseInt(req.body.quantity);
        try {
            let cart = await cartRepository.cart(userId);
            let productDetails = await productRepository.productById(productId);
                if (!productDetails) {
                return res.status(500).json({
                    type: "Not Found",
                    msg: "Invalid request"
                })
            }
            //--If Cart Exists ----
            if (cart) {
                //---- Check if index exists ----
                const indexFound = cart.items.findIndex(item => item.productId.id == productId);
                if (indexFound !== -1 && quantity === -1) {
                    cart.items[indexFound].paper_stock = paper_stock,
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
                else if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = quantity;
                    cart.items[indexFound].paper_stock = paper_stock,
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if quantity is greater than 0 then add item to items array ----
                else if (quantity > 0) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        paper_stock: paper_stock,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----If quantity of price is 0 throw the error -------
                else {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: data
                })
            }
            //------------ This creates a new cart and then adds the item to the cart that has been created------------
            else {
                const cartData = {
                    items: [{
                        productId: productId,
                        quantity: quantity,
                        paper_stock: paper_stock,
                        total: parseInt(productDetails.price * quantity),
                        price: productDetails.price
                    }],
                    userId: userId,
                    subTotal: parseInt(productDetails.price * quantity)
                }
                cart = await cartRepository.addItem(cartData)
                // let data = await cart.save();
                res.json(cart);
            }
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    getCart: async (req, res) => {
        try {
            const {userId} = req.query;
            let cart = await cartRepository.cart(userId)
            if (!cart) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: cart
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    removeItem: async (req, res) => {
        try {
            const {userId} = await req.query;
            const {productId} = await req.query;
            let cart = await cartRepository.cart(userId);
            const indexFound = cart.items.findIndex(item => item.productId.id == productId);
            cart.items.splice(indexFound, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0;
            } else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Item successfully removed from Cart",
                data: data
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    emptyCart: async (req, res) => {
        try {
            const {userId} = req.query;
            let cart = await cartRepository.cart(userId);
            cart.items = [];
            cart.subTotal = 0
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Cart has been emptied",
                data: data
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    getCartItemsCount: async (req, res) => {
        try {
            const {userId} = req.query;
            let cart = await cartRepository.cartItemsCount(userId)
            if (!cart) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: cart.items.length
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }
}