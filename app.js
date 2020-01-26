const express = require('express')
const Sequelize = require('Sequelize')
const bodyParser = require('body-parser')

const Admin = require('././modules/admin')
const app = express()

app.use(bodyParser.json())

let Vendor = require('./modules/vendor')


// Creat veondror
app.post('/api/vendor', (req, res) => {

    Vendor.create({
        vendorId: req.body.vendorId,
        fullName: req.body.fullName,
        companyName: req.body.companyName,
        bankName: req.body.bankName,
        bAN: req.body.bAN,
        bankBranch: req.body.bankBranch,
        password: req.body.password,
        phone: req.body.phone,
        logo: req.body.logo,
        vendorType: req.body.vendorType,
        state: req.body.state,
        createAt: req.body.createAt,
        updateAt: req.body.updateAt,
    }).then((vendor) => {
        // if error send it. if not send ok query
        if (vendor) {
            res.json({
                'query': 1,
                "cause": "ok"
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