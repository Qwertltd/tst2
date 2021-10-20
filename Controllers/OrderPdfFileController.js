const createError = require('http-errors')
const {OrderPdfFile} = require("../Models/OrderPdfFile");
const orderPdfFileRepository = require('../Repositories/OrderPdfFileRepository')
const { jsPDF } = require("jspdf");
const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
  
module.exports = {
    create: async(req,res,next) => {
        const {values} = req.body;
        try{
            const orderPdfFile = await orderPdfFileRepository.create(values)
            res.json(orderPdfFile);
        }catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
    getOne: async(req,res,next) => {
        try{
            const id = await req.query.id;
            const orderPdfFiles = await orderPdfFileRepository.byProductId(id);
            res.send(orderPdfFiles)
            
        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
        
    },
    getByOrderId: async(req,res,next) => {
        try{
            const id = await req.query.id;
            const orderPdfFiles = await orderPdfFileRepository.byOrderId(id);
            res.send(orderPdfFiles)
            
        }catch (error) {
            if (error.isJoi === true) error.status = 422
            next(error)
        }
        
    },
    getDownload: async (req, res) => {
        try {
            const {id} = req.query;
            let orderFile = await orderPdfFileRepository.download(id)
            if (!orderFile) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Order not Found",
                })
            }
            const itemId =  orderFile.orderId;
            const data =  orderFile.dataUrl;
            const total = orderFile.total;
            const topMargin = orderFile.topMargin;
            const leftMargin = orderFile.leftMargin;
            const numberofColumns = orderFile.numberofColumns;
            const horizontalSpacing = orderFile.horizontalSpacing;
            const verticalSpacing = orderFile.verticalSpacing;
            const itemWidth = orderFile.itemWidth;
            const itemHeight = orderFile.itemHeight;
            var divisor = numberofColumns;
            var array = [];
            var count = 1;
            var rowCount = 1;
            for (let step = 1; step <= total; step++) {
                var obj = {};
                if(step > 1){
                const lastItem = array[array.length - 1];
                if(step/divisor > 1){
                    count=1;
                    rowCount++;
                    obj["src"] = data;
                    obj["x"] = leftMargin + ((count - 1) * itemWidth);
                    obj["y"] = topMargin + ((rowCount - 1) * verticalSpacing) + ((rowCount - 1) * itemHeight);
                    array.push(obj);
                    divisor = divisor + numberofColumns;
                    count=2;
                }else{
                    obj["src"] = data;
                    obj["x"] = leftMargin + ((count - 1) * horizontalSpacing) + ((count - 1) * itemHeight);
                    obj["y"] = lastItem["y"];
                    array.push(obj);
                    count++;
                }
                }else{
                    obj["src"] = data;
                    obj["x"] = leftMargin;
                    obj["y"] = topMargin;
                    array.push(obj);
                    count++;
                }
            }
            
            const b64 = await mergeImages(array,
            {
                Canvas: Canvas,
                Image: Image,
                width: (numberofColumns * (leftMargin + itemWidth)) + leftMargin,
                height: ((total/numberofColumns) * (topMargin + itemHeight)) + topMargin
            });
            var pdf = new jsPDF();
            pdf.text(`${itemId}`, 5, 5);
            pdf.addImage(
                b64,
                0,
                0
            );
            pdf.save(itemId+'.pdf');
            
            res.status(200).json({
                status: true,
                data: b64
            })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
}