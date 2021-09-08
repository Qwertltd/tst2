const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignSchema = new Schema({
    title:{type: String,required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    design:{type: String},
    description:{type: String},
},{
    timestamps: true,
});

const Design = mongoose.model('Design', DesignSchema);

module.exports = {DesignSchema, Design};