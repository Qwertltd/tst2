const appRepository = require('../Repositories/AppRepository')
const {Design} = require('../Models/Design')
  
module.exports = {

    createContactMessage: async (req, res, next) => {
        const {full_name} = req.body;
        const {email} = req.body;
        const {phone} = req.body;
        const {subject} = req.body;
        const {message} = req.body;
        try {
            const contactData = {
                full_name: full_name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
            }
            const response = await appRepository.createContactMessage(contactData)
            res.send({ response })
        }catch (error) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong!",
                err: error
            })
        }

    },
    createDesign:  async (req, res) => {
        const {title} = req.body;
        const {description} = req.body;
        const {design} = req.body;
        const {userId} = req.query;
        try {
            const designData = {
                title: title,
                description: description,
                design: design,
                userId: userId,
            }
            const response = await appRepository.createDesign(designData)
            res.send({ response })
        }catch (error) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong!",
                err: error
            })
        }
    },
    getDesigns: async (req, res) => {
        try {
            const {userId} = req.query;
            let designs = await appRepository.userDesigns(userId)
            if (!designs) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "No Design Found",
                })
            }
            res.status(200).json({
                status: true,
                data: designs
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    getDesign: async (req, res) => {
        try {
            const {designId} = req.query;
            let design = await appRepository.userDesign(designId)
            if (!design) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Design not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: design
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    updateDesign:  async (req, res) => {
        const {title} = req.body;
        const {description} = req.body;
        const {design} = req.body;
        const {designId} = req.query;
        try {
            const response = await Design.findByIdAndUpdate(designId, {'title': title, 'description': description, 'design': design}, {
                new: true
              });
            res.send({ response })
        }catch (error) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong!",
                err: error
            })
        }
    }
}