const {ContactUs} = require("../Models/ContactUs");
const {Design} = require("../Models/Design");


exports.createContactMessage = async payload => {
    const newMessage = await ContactUs.create(payload);
    return newMessage
};

exports.createDesign = async payload => {
    const newDesign = await Design.create(payload);
    return newDesign
};

exports.userDesigns = async userId => {
    const designs = await Design.find({userId: userId});
    return designs;
};

exports.userDesign = async (designId) => {
    const design = await Design.findById(designId);
    return design;
};