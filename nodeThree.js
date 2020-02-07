const express = require('express')

const bodyParser = require('body-parser')
const multer = require("multer")
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
        callBack(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
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


// admin module
const Admin = require('././modules/admin')

//create admin account
app.post('/api/admin', (req, res) => {
    console.log(req.body)
    Admin.findOne({
        where:
        {userName:req.body.userName}}
        ).then((admin)=>{
        if(!admin){
            Admin.create({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                permission: +req.body.permission,
                jobTitle: req.body.jobTitle
        
            }).then((admin) => {
                if(admin){
                    res.json({
                        'query': 1,
                        'admins':admin})
                }else{
                    res.json({
                        'query': -1,
                        'cuase':''
                    })
                }
            
            })
        }else{
            res.json({
                'query': -1,
                'cuase':'user Name its found',
               

            })
        }
    })

   
})

//login admin
app.post('/api/adminLogin', (req, res) => {
    console.log(req.body)

    Admin.findAll({

        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then((admin) => {

        if (admin) {
            res.json({
                'query': 1,
                'admins':admin})
        } else {
            res.json({
                'query': -1,
                'cause':'admin not found'})
        }
    })

})
//getting all admins
app.get('/api/admin', (req, res) => {
    Admin.findAll().then((admin) => {
        if (admin) {
            res.json({
                'query': 1,
                'admins':admin})
        } else {
            res.json({
                'query': -1,
                'cause':'admin not found'})
        }
    })

})
//update admin 
app.put('/api/admin/:id', (req, res) => {
    let id = req.params.id
    Admin.findByPk(id).then((admin) => {
        //check if exisits
        if (admin) {
            // updating
            admin.update(req.body).then((admin1) => {
                res.json(admin1)
            })
        } else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})

//delete from Admin
app.delete('/api/admin/:id', (req, res) => {
    let id = req.params.id

    Admin.findByPk(id).then((admin) => {
        //check if exisits
        if (admin) {
           
           admin.destroy().then(()=>{
               res.json({
                'query': 1,
                "cause": "deleted"
               })
           })
        } else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})

app.listen(3003,()=>{
    console.log('app it running in port 3003')
})