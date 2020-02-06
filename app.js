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
//club module
const  Club = require("./modules/club")
//Type of event
const TypeOfEvent = require("./modules/typeOfEvent")
//eventWithArtist
const EventWithArtist = require("./modules/eventWithArtist")
//eventWithMovies
const EventWithMovies = require("./modules/eventWithMovies")
//eventWithSponsor
const EventWithSponsor = require("./modules/eventWithSponsor")
//eventWithClub
const EventWithClub = require("./modules/eventWithClub")

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
//Event with type of event ..end

//Event with artist ..start
Event.belongsToMany(Artist,{
    through:"event_with_artist",
    foreignKey: 'event_id',
    timestamps:false
})
Artist.belongsToMany(Event,{
    through:"event_with_artist",
    foreignKey: 'artist_id',
    timestamps:false
})
//event with artist ..end


//Event with movie ..start
Event.belongsToMany(Movies,{
    through:"event_with_movies",
    foreignKey: 'event_id',
    timestamps:false
})
Movies.belongsToMany(Event,{
    through:"event_with_movies",
    foreignKey: 'movie_id',
    timestamps:false
})
//event with movie ..end

//Event with Sponsor ..start
Event.belongsToMany(Sponsor,{
    through:"event_with_sponsor",
    foreignKey: 'event_id',
    timestamps:false
})
Sponsor.belongsToMany(Event,{
    through:"event_with_sponsor",
    foreignKey: 'sponsor_id',
    timestamps:false
})
//event with Sponsor ..end


// Create event 
// you cant create event without the 2 forieng keys (event id, tyep of event id )

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
    Event.findByPk(id,{
        include:[Artist]
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
//update Event 
app.put('/api/event/:id', (req, res) => {
    let id = req.params.id

    Event.findByPk(id).then((event) => {
        //check if exisits
        if (event) {
            // updating
            event.update({
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
            }).then(() => {
                res.json(req.body)
            })
        } else {
            res.json({
                'query': -1,
                "cause": "not found"
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

//getting a vendor by id
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
//update vendor with out image
app.put('/api/vendor/:id', (req, res) => {
    let id = req.params.id
    Vendor.findByPk(id).then((vendor) => {
        //check if exisits
        if (vendor) {
            // updating

            vendor.update(
          req.body  
          ).then(() => {
                res.json(req.body)
            vendor.update(req.body).then((vendorU) => {
                res.json(vendorU)
            })
        })} else {
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
//create new artist
app.post('/api/artist', upload.single('artist_image'), (req, res) => {
    Artist.create({
        nameAr: req.body.name_ar,
        nameEn: req.body.name_en,
        image: req.file.filename

    }).then((Artist) => {
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
app.post('/api/sponsor', upload.single('sponsor_image'), (req, res) => {
    Sponsor.create({
        nameAr: req.body.name_ar,
        nameEn: req.body.name_en,
        image: req.file.filename

    }).then((Sponsor) => {
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
app.post('/api/movie', upload.single('movie_image'), (req, res) => {
    Movies.create({
        nameAr: req.body.name_ar,
        nameEn: req.body.name_en,
        image: req.file.filename

    }).then((Movie) => {
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

//create new club
app.post('/api/club', upload.single('club_image'), (req, res) => {
    Club.create({
        nameAr: req.body.name_ar,
        nameEn: req.body.name_en,
        image: req.file.filename

    }).then((club) => {
        res.json(club)
    })
})

//getting all clubs
app.get('/api/club', (req, res) => {
    Club.findAll().then((club) => {
        res.json(club)
    })

})

//getting clubs by id
app.get('/api/club/:id', (req, res) => {
    let id = req.params.id
    Club.findByPk(id).then((club) => {
        //check if exisits
        if (club)
            res.json(club)
        else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})



//create new Type of event
app.post('/api/typeOfEvent', upload.single('Type_of_event_image'), (req, res) => {
    TypeOfEvent.create({
        nameAr: req.body.name_ar,
        nameEn: req.body.name_en,
        image: req.file.filename

    }).then((typeOfEvent) => {
        res.json(typeOfEvent)
    })
})
//update Type of event with out photo
app.put('/api/typeOfEvent/:id', (req, res) => {
    let id = req.params.id

    TypeOfEvent.findByPk(id).then((typeOfEvent) => {
        //check if exisits
        if (typeOfEvent) {
            // updating
            typeOfEvent.update({
                nameAr: req.body.name_ar,
        nameEn: req.body.name_en,
            }).then(() => {
                res.json(req.body)
            })
        } else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})


//create new EventWithArtist
app.post('/api/eventWithArtist', (req, res) => {
    EventWithArtist.create({
        eventId: req.body.eventId,
        artistId: req.body.artistId,


    }).then((eventWithArtist) => {
        res.json(eventWithArtist)
    })
})
//create new EventWithMovies
app.post('/api/eventWithMovies', (req, res) => {
    EventWithMovies.create({
        eventId: req.body.eventId,
        moviesId: req.body.moviesId,

    }).then((eventWithMovies) => {
        res.json(eventWithMovies)
    })
})
//create eventWithSponsor
app.post('/api/eventWithSponsor', (req, res) => {
    EventWithSponsor.create({
        eventId: req.body.eventId,
        sponsorId: req.body.sponsorId,

    }).then((eventWithSponsor) => {
        res.json(eventWithSponsor)
    })
})

//create EventWithClub
app.post('/api/eventWithClub', (req, res) => {
    EventWithClub.create({
        eventId: req.body.eventId,
        clubId: req.body.clubId,

    }).then((eventWithClub) => {
        res.json(eventWithClub)
    })
})

app.listen(3000, () => {
    console.log('server is running')
}
    )