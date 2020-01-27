const express = require('express')
const Sequelize = require('Sequelize')
const bodyParser = require('body-parser')
const multer =require("multer")
const app = express()

const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'./uploads/')
    },
    filename:(req,file,callBack)=>{
        callBack(null,new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }


})

const upload = multer({storage: storage})  
app.use(bodyParser.json())



const Admin = require('././modules/admin')
// vendor module
var Vendor = require('./modules/vendor')
// event module
var Event = require('./modules/event')
// Creat event
app.post('/api/event', (req, res) => {

    Event.create({
        adminId: req.body.adminId,
        eventNameEn: req.body.eventNameEn,
        eventNameAr: req.body.eventNameAr,
        locationLat: req.body.locationLat,
        locationLong: req.body.locationLong,
        descriptionAr: req.body.descriptionAr,
        descriptionEn: req.body.descriptionEn,
        time: req.body.time,
        state: req.body.state,
        locationDescriptionAr: req.body.locationDescriptionAr,
        locatoinDescriptionEn: req.body.locatoinDescriptionEn,
      
    }).then((event) => {
        // if error send it. if not send ok query
        if (event) {
            res.json({
                'query': 1,
                "cause": "ok",
                'event':event
            })
        } else {
            res.json({
                'query': -1,
                //here is the error message
                "cause": "error"
            })
        }
    })

})

// vendor login
app.post('/api/vendorLogin', (req, res) => {
    console.log(req.body)

    Vendor.findOne({

        where: {
            phone: req.body.phone,
            password: req.body.password
        }
    }).then((loginInfo) => {

        if (loginInfo == null) {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        } else {
            res.json({
                'query': 1,
                "cause": "ok",
                'vendor':vendor
            })
         }
    })

})
  
// Create veondror by mody
//upload the logo bu brma
app.post('/api/vendor',upload.single('vender_logo'), (req, res) => {

    Vendor.create({
        vendorId: req.body.vendorId,
        fullName: req.body.fullName,
        companyName: req.body.companyName,
        bankName: req.body.bankName,
        bAN: req.body.bAN,
        bankBranch: req.body.bankBranch,
        password: req.body.password,
        phone: req.body.phone,
        logo: req.file.filename,
        vendorType: req.body.vendorType,
        state: req.body.state,
      
    }).then((vendor) => {
        // if error send it. if not send ok query
        if (vendor) {
            res.json({
                'query': 1,
                "cause": "ok",
                'vendor':vendor
            })
        } else {
            res.json({
                'query': -1,
                //here is the error message
                "cause": "error"
            })
        }
    })

})

//getting all vendors
app.get('/api/vendor', (req, res) => {
    Vendor.findAll().then((vendor) => {
        res.json(vendor)
    })

})

//getting avendor by id
app.get('/api/vendor/:id', (req, res) => {
    let id = req.params.id
    Vendor.findByPk(id).then((vendor) => {
        //check if exisits
        if (vendor)
            res.json(vendor)
        else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})
//deleting vendor still needs work
app.delete('/api/vendor/:id', (req, res) => {
    let id = req.params.id

    Vendor.findByPk(id).then((vendor) => {
        //check if exisits
        if (vendor) {
            // clearing joind tables beacuse i's a foriegn key
            vendor.setTracks([]).then(() => {
                vendor.destroy().then()
            })
        } else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})
//update vendor
app.put('/api/vendor/:id', (req, res) => {
    let id = req.params.id
    FullName = req.body.fullName
    Vendor.findByPk(id).then((vendor) => {
        //check if exisits
        if (vendor) {
            // updating
            vendor.update({
                fullName: FullName
            }).then(() => {
                res.json({
                    'full_name': FullName
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



app.post('/api/admin', (req, res) => {
    console.log(req.body)
    Admin.create({
        full_Name: req.body.full_Name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        permission: +req.body.permission,
        jobTitle: req.body.jobTitle,
        createAt: req.body.createAt,
        updateAt: req.body.updateAt

    }).then((admin) => {

        res.json(admin)
    })
})

app.post('/api/adminLogin', (req, res) => {
    console.log(req.body)

    Admin.findOne({

        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then((loginInfo) => {

        if (loginInfo == null) {
            res.json({
                "massage": "not found"
            })
        } else {
            res.json(loginInfo)
        }
    })

})

app.listen(3000, () => {
    console.log('server is running')
})