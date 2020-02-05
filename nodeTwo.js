const express = require('express')
const Sequelize = require('Sequelize')
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

const upload = multer({
    storage: storage
})
app.use(bodyParser.json())

var Vendor = require('./modules/vendor')

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
                'vendor': vendor
            })
        }
    })

})


// Create veondror by mody
//upload the logo bu brma
app.post('/api/vendor', upload.single('vender_logo'), (req, res) => {


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
                'vendor': vendor
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
    Vendor.findByPk(id).then((vendor) => {
        //check if exisits
        if (vendor) {
            // updating
            vendor.update(req.body).then((vendorU) => {
                res.json(vendorU)
            })
        } else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})

app.listen(3002,()=>{
    console.log('app it running at port 3002')
})