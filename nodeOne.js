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
// vendor module
var Vendor = require('./modules/vendor')
// event module
var Event = require('./modules/event')
const TypeOfEvent = require("./modules/typeOfEvent")
// realtionships
//vendor with event ..start
Vendor.hasMany(Event, {
    foreignKey: 'vendor_id'
})
Event.belongsTo(Vendor, {
    foreignKey: 'vendor_id'
})
//vendor with event ..end

//Event with type of event ..start
TypeOfEvent.hasMany(Event, {
    foreignKey: 'type_of_event_id'
})
Event.belongsTo(TypeOfEvent, {
    foreignKey: 'type_of_event_id'
})

app.post('/api/event', (req, res) => {

    Event.create({
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
        vendorId: req.body.vendorId,
        typOfEventId: req.body.typOfEventId
    }).then((event) => {
        // if error send it. if not send ok query
        if (event) {
            res.json({
                'query': 1,
                "cause": "ok",
                'event': event
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

//getting all events
app.get('/api/events/:start', (req, res) => {
    let start = req.params.start
    Event.findAndCountAll().then((event) => {
        if(event){
            if(+event.count<=3){
                res.json({'events':event.rows})
            }else if(+event.count>3){
                Event.findAndCountAll({
                    offset:+start,
                    limit:3,
                    subQuery:false
                }).then((even)=>{
                        console.log(even.rows.length)
                    if(even.rows.length<3){
                        res.json({
                            'start':+start +even.rows.length,
                            'events':even.rows,
                            'state':'its end'
                        })
                    }else if(even.rows.length>=3) {
                        res.json({
                            'start':+start +3,
                            'events':even.rows,
                            'state':'load more'
                        })
                    }
                })
            }
        }
        
    })

})

//getting active event where state =1 'active' ,0 'not active
app.get('/api/eventActive/:state', (req, res) => {
    let state = req.params.state
    Event.findAll(
        {
            where :{
                'state':state
            }
        }
    ).then((event) => {

        res.json(event)
    })

})


//getting event by id
app.get('/api/event/:id', (req, res) => {
    let id = req.params.id
    Event.findAll({where:{
        eventId:id
    }}).then((event) => {
        //check if exisits
        console.log(event)
        if (event)
            res.json(event)
        else {
            res.download
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})
//getting event by vendor id and type of event id
// key 1 == vendor id ,, key 2== type event id
app.get('/api/event/:id/:key', (req, res) => {
    let id = req.params.id
    let key = req.params.key
    if (key == 1) {


        Event.findOne({

            where: {
                vendorId: id
            }
        }).then((event) => {
            //check if exisits
            if (event)
                res.json(event)
            else {
                res.json({
                    'query': -1,
                    "cause": "not found"
                })
            }

        })
    } else if (key == 2) {
        Event.findOne({

            where: {
                typOfEventId: id
            }
        }).then((event) => {
            //check if exisits
            if (event)
                res.json(event)
            else {
                res.json({
                    'query': -1,
                    "cause": "not found"
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

app.listen(3001,()=>{
    console.log('app it running at port 3001')
})