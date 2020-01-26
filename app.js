const express = require('express')
const Sequelize = require('Sequelize')
const bodyParser = require('body-parser')
 
const Admin = require('././modules/admin')
const app = express()

app.use(bodyParser.json())

app.post('/api/admin',(req,res)=>{
    console.log(req.body)
    Admin.create({
        full_Name:req.body.full_Name,
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        permission:+req.body.permission,
        jobTitle:req.body.jobTitle,
        createAt:req.body.createAt,
        updateAt:req.body.updateAt
    
    }).then((admin)=>{

        res.json(admin)
    })
})

app.post('/api/adminLogin',(req,res)=>{
    console.log(req.body)

    Admin.findOne({

        where :{
            email :req.body.email,
            password:req.body.password
        }
    }).then((loginInfo)=>{
     
        if(loginInfo== null){
            res.json({
                "massage":"not found"
            })
        }else{
            res.json(loginInfo)
        }
    })

})

app.listen(3000,()=>{
console.log('server is running')
})