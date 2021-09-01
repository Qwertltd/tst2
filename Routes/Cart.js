const express = require('express')
const router = express.Router()
const CartController = require('../Controllers/CartController')

router.get("/", CartController.getCart);
router.get("/itemCount", CartController.getCartItemsCount);
router.post("/addToCart", CartController.addItemToCart);
router.delete('/removeFromCart', CartController.removeItem);
router.delete("/empty-cart", CartController.emptyCart);

module.exports = router