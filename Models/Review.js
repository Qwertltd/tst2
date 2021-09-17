const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    productId:{type: Schema.Types.ObjectId,ref: 'Product'},
    userId:{type: Schema.Types.ObjectId,ref: 'User'},
    comment:{type: String},
    rating:{
        type: Number,
        default: 0
    },

},{
    timestamps: true,
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = {ReviewSchema, Review};