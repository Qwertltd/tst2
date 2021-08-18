const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignSchema = new Schema({
    title:{type: String,required: true},
    user_id:{type: Schema.Types.ObjectId,ref: User},
    file:{type: String,required: true},
},{
    timestamps: true,
});

const Design = mongoose.model('Design', DesignSchema);

module.exports = Design;