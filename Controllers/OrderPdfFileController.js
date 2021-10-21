global.window = {document: {createElementNS: () => {return {}} }};
global.navigator = {};
global.btoa = () => {};
var path = require('path');
var mime = require('mime');
const fs = require('fs')
const AWS = require('aws-sdk');
const https = require('https');

const createError = require('http-errors')
const {OrderPdfFile} = require("../Models/OrderPdfFile");
const orderPdfFileRepository = require('../Repositories/OrderPdfFileRepository')
const { jsPDF } = require("jspdf");
const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
  
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
            const orderPdfFile = await orderPdfFileRepository.byOrderId(id);
            res.status(200).json({
                status: true,
                data: orderPdfFile
            })
            
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
            pdf.save('orderPdf/'+itemId+'.pdf');
            // fs.writeFileSync(`orderPdf/${itemId}.pdf`, pdf.output())
            var fifi = __dirname + `/../orderPdf/${itemId}`+'.pdf';
            var filename = path.basename(fifi);
            var mimetype = mime.lookup(fifi);
          
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
          
            var filestream = fs.createReadStream(fifi);
            filestream.pipe(res);
            // res.download('', `${itemId}.pdf`, (err) => {
            //     if (err) {
            //       res.status(500).send({
            //         message: "Could not download the file. " + err,
            //       });
            //     }
            // });

            // let uri = pdf.output("datauristring")
            // var dataUri = uri.split(',')[1]; 
            // const uploadFile = {
            //     buffer: Buffer.from(dataUri).toString('base64')
            // }
            // const filePath = `orders/designPdf/${itemId}.pdf`;
            // console.log(filePath)
            // const params = {
            //     Bucket: 'zooprints',
            //     Key: filePath,
            //     Body: uploadFile.buffer,
            //     ACL:'public-read'
            // };
            // s3.upload(params, function(err, data) {
            //     if (err) {
            //         throw err;
            //     }
            //     console.log(data.Location)
            //     res.download(data.Location, 'test.pdf', (err) => {
            //         if (err) {
            //           res.status(500).send({
            //             message: "Could not download the file. " + err,
            //           });
            //         }
            //     });
            // });
            // res.send({ response })
        } catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    },
}
delete global.window;
delete global.navigator;
delete global.btoa;