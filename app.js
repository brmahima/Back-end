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


// admin module
const Admin = require('././modules/admin')
// vendor module
var Vendor = require('./modules/vendor')
// event module
var Event = require('./modules/event')
//artist module
const Artist = require("./modules/artist")
//movies module
const Movies = require("./modules/movies")
//sponsor module
const Sponsor = require("./modules/sponsor")
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
                "cause": "ok"
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


//create admin account
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

//login admin
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

//create new artist
app.post('/api/artist',upload.single('artist_image'),(req,res)=>{
    Artist.create({
        nameAr :req.body.name_ar,
        nameEn :req.body.name_en,
        image :req.file.filename
        
    }).then((Artist)=>{
        res.json(Artist)
    })
})

//getting all artist
app.get('/api/artist', (req, res) => {
    Artist.findAll().then((artist) => {
        res.json(artist)
    })

})

//getting artist by id
app.get('/api/artist/:id', (req, res) => {
    let id = req.params.id
    Artist.findByPk(id).then((artist) => {
        //check if exisits
        if (artist)
            res.json(artist)
        else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})

//create new sponsor
app.post('/api/sponsor',upload.single('sponsor_image'),(req,res)=>{
    Sponsor.create({
        nameAr :req.body.name_ar,
        nameEn :req.body.name_en,
        image :req.file.filename
        
    }).then((Sponsor)=>{
        res.json(Sponsor)
    })
})

//getting all sponsor
app.get('/api/sponsor', (req, res) => {
    Sponsor.findAll().then((Sponsor) => {
        res.json(Sponsor)
    })

})

//getting sponsor by id
app.get('/api/sponsor/:id', (req, res) => {
    let id = req.params.id
    Sponsor.findByPk(id).then((sponsor) => {
        //check if exisits
        if (sponsor)
            res.json(sponsor)
        else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})

//create new movie
app.post('/api/movie',upload.single('movie_image'),(req,res)=>{
    Movies.create({
        nameAr :req.body.name_ar,
        nameEn :req.body.name_en,
        image :req.file.filename
        
    }).then((Movie)=>{
        res.json(Movie)
    })
})

//getting all movies
app.get('/api/movie', (req, res) => {
    Movies.findAll().then((movie) => {
        res.json(movie)
    })

})

//getting movie by id
app.get('/api/movie/:id', (req, res) => {
    let id = req.params.id
    Movies.findByPk(id).then((movie) => {
        //check if exisits
        if (movie)
            res.json(movie)
        else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})
app.listen(3000, () => {
    console.log('server is running')
})