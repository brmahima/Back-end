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

var Vendor = require('./modules/vendor')

// vendor login
app.post('/api/vendorLogin', (req, res) => {
    

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
                'vendors': vendor
            })
        }
    })

})


// Create veondror by mody
//upload the logo bu brma
app.post('/api/vendor', upload.single('venderImage'), (req, res) => {


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
            
                'vendors': vendor
            })
        } else {
            res.json({
                'query': -1,
                //here is the error message
                "cause": "not found"
            })
        }
    })

})

app.get('/api/vendors/:start/:limit', (req, res) => {
    let start = req.params.start
let limt = req.params.limit
    Vendor.findAndCountAll().then((vendor) => {
        if(vendor){
            if(+vendor.count<= +limt){
                res.json({
                    'query':1,
                    'vendors':vendor.rows,
                    'state':'its end'
                })
            }else if(+vendor.count>+limt){
                Vendor.findAndCountAll({
                    offset:+start,
                    limit:+limt,
                    subQuery:false
                }).then((vend)=>{
                    if(vend.rows.length!=0){ 
                    if(vend.rows.length<+limt){
                        res.json({
                            'query':1,
                            'start':+start +vend.rows.length,
                            'vendors':vend.rows,
                            'state':'its end'
                        })
                    }else if(vend.rows.length>= +limt) {
                        res.json({
                            'query':1,
                            'start':+start + +limt,
                            'vendors':vend.rows,
                            'state':'load more'
                        })
                    }}else{
                        res.json({
                            'query': -1,
                            'cuase':'not found'
                        }) 
                    }
                })
            }
        }else {
            res.json({
                'query': -1,
                'cuase':'not found'
            })
        }
        
    })

})

//getting all vendors
app.get('/api/vendor', (req, res) => {
    Vendor.findAll().then((vendor) => {
        if (vendor) {
            res.json({
                'query': 1,
                'vendors': vendor
            })
        } else {
            res.json({
                'query': -1,
                //here is the error message
                "cause": "not found"
            })
        }
    })

})

//getting avendor by id
app.get('/api/vendor/:id', (req, res) => {
    let id = req.params.id
    Vendor.findByPk(id).then((vendor) => {
        //check if exisits
        if (vendor) {
            res.json({
                'query': 1,
                'vendors': vendor
            })
        } else {
            res.json({
                'query': -1,
                //here is the error message
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
                vendor.destroy().then(()=>{
                    res.json({
                        'query': 1,
                        "cause": "deleted"
                       })
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
//update vendor
app.put('/api/vendor/:id', (req, res) => {
    let id = req.params.id
    Vendor.findByPk(id).then((vendor) => {
        //check if exisits
        if (vendor) {
            // updating
            vendor.update(req.body).then((vendorU) => {
                if(vendorU){
                    res.json({
                        'query': 1,
                        "vendors": vendorU
                       })
                }else{
                    res.json({
                        'query': -1,
                        'cause': 'not updated'
                       })
                }
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