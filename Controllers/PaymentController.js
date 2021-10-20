const stripe = require('stripe')("sk_test_51IqbbqDVoQdiHrR5mzhP7nlvQ0tsn9SSmMH01nYiRjfVseGjgu55GZvOhdKdEChpnjQ0cg9il3KkEtmMKJbUByI000fYbDtYwV");
//Add a stripe key to top
const uuid = require('uuid/v4');

const cartRepository = require('../Repositories/CartRepository')
const orderRepository = require('../Repositories/OrderRepository')
const paymentRepository = require('../Repositories/PaymentRepository')
const productRepository = require('../Repositories/ProductRepository')
const orderPdfFileRepository = require('../Repositories/OrderPdfFileRepository')

module.exports = {
    payment: async (req, res, next) => {
        const {carts, token, total, userId, values} = req.body;
        const idempontencyKey = uuid()

        try{
            stripe.customers.create({
                email: token.email,
                source: token.id
            }).then(async (customer) => { 
                stripe.charges.create(
                    {
                        amount: total * 100,
                        currency: 'gbp',
                        customer: customer.id,
                        receipt_email: token.email,
                        description: 'purchase of products',
                        shipping: {
                            name: token.card.name,
                            address: {
                                country: token.card.address_country
                            }
                        }
                    }, 
                    { idempotencyKey: idempontencyKey }
                );
                const paymentData = {
                    userId: userId,
                    amount: total,
                    tokenId: token.id,
                    type: token.type,
                    livemode: token.livemode,
                    last4: token.card.last4,
                    exp_month: token.card.exp_month,
                    exp_year: token.card.exp_year,
                    brand: token.card.brand,
                    country: token.card.country,
                }
                let payment = await paymentRepository.create(paymentData);
                const paymentId = payment._id
                carts.forEach( async product => {
                    let order = await orderRepository.single(paymentId);
                    if(!order){
                        const orderData = {
                            items: [{
                                productId: product.productId._id,
                                quantity: product.quantity,
                                total: product.total,
                                paper_stock: product.paper_stock,
                                price: product.productId.price
                            }],
                            billing: [{
                                first_name: values.first_name,
                                last_name: values.last_name,
                                company_name: values.company_name,
                                phone: values.phone,
                                country: values.country,
                                address: values.address,
                                city: values.city,
                                post_code: values.post_code,
                                order_notes: values.order_notes
                            }],
                            shipping: [{
                                first_name: values.shipping_first_name,
                                last_name: values.shipping_last_name,
                                company_name: values.shipping_company_name,
                                phone: values.shipping_phone,
                                country: values.shipping_country,
                                address: values.shipping_address,
                                city: values.shipping_city,
                                post_code: values.shipping_post_code,
                            }],
                            userId: userId,
                            paymentId: paymentId,
                            status: 'paid',
                            subTotal: parseInt(total)
                        }
                        let order = await orderRepository.create(orderData)

                        const orderPdfFiles = await orderPdfFileRepository.byProductId(product.productId._id)
                        if(orderPdfFiles){
                            console.log("1")
                            for (i = 0; i < orderPdfFiles.length; i++) {    
                                console.log("2") 
                                if(typeof orderPdfFiles[i].orderId === "undefined"){
                                    console.log("3")
                                    const orderPdfFile = await orderPdfFileRepository.getById(orderPdfFiles[i]._id)
                                    console.log(orderPdfFile)
                                    orderPdfFile.orderId = order._id;
                                    orderPdfFile.save();
                                    break;   
                                }
                            }; 
                            
                        }
                    }else{
                        await order.items.push({
                            productId: product.productId._id,
                            quantity: product.quantity,
                            paper_stock: product.paper_stock,
                            total: product.total,
                            price: product.productId.price
                        })
                    }
                });
                let cart = await cartRepository.cart(userId);
                cart.items = [];
                cart.subTotal = 0
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Cart has been emptied",
                    data: data
                })
                    
            })
            .then(result => res.status(200).json(result))
        }catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
}