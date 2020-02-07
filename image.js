const express = require('express')

const bodyParser = require('body-parser')
const multer = require("multer")
const app = express()
const fs = require('fs');
app.use(express.static('uploads'));
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
        console.log(req.body)
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        callBack(null, file.originalname)
    }


})
//to gidaq
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const upload = multer({
    storage: storage
})
app.use(bodyParser.json())

app.post('/api/image',upload.single('image'),(req,res)=>{

    res.json({
        'qeury':1,
        'cause':'done'

})

})

app.delete('/api/image',(req,res)=>{
    fs.unlink('./uploads/'+req.body.name, function (err) {            
        if (err) {                                                 
            res.json(err)                                   
        }                                                          
       res.json(
           {'query':1,
            'cause':'File has been Deleted'});                           
    });       
})

app.listen(3010,()=>{
    console.log('running at port 3010')
})