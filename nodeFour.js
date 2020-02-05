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

app.listen(3004,()=>{
    console.log('app it running in port 3004')
})