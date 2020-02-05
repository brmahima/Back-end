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

//artist module
const Artist = require("./modules/artist")
//movies module
const Movies = require("./modules/movies")
//sponsor module
const Sponsor = require("./modules/sponsor")
//club module
const  Club = require("./modules/club")
//eventWithArtist
const EventWithArtist = require("./modules/eventWithArtist")
//eventWithMovies
const EventWithMovies = require("./modules/eventWithMovies")
//eventWithSponsor
const EventWithSponsor = require("./modules/eventWithSponsor")
//eventWithClub
const EventWithClub = require("./modules/eventWithClub")
// vendor module
var Vendor = require('./modules/vendor')
// event module
var Event = require('./modules/event')

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

app.listen(3005,()=>{
    console.log('app it running in port 3005')
})