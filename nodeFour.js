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
// update artist
app.put('/api/artist/:id', (req, res) => {
    let id = req.params.id
    Artist.findByPk(id).then((artist) => {
        //check if exisits
        if (artist) {
            // updating
            artist.update(req.body).then(() => {
                res.json(
                    { 'query': 1
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

//delete artist
app.delete('/api/artist/:id', (req, res) => {
    let id = req.params.id

    Artist.findByPk(id).then((artist) => {
        //check if exisits
        if (artist) {
           
           artist.update( {state:0}).then(()=>{
               res.json({
                'query': 1,
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




//getting all sponsor
app.get('/api/sponsor', (req, res) => {
    Sponsor.findAll().then((sponsor) => {
        res.json(sponsor)
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

// update sponser
app.put('/api/sponsor/:id', (req, res) => {
    let id = req.params.id
    Sponsor.findByPk(id).then((sponser) => {
        //check if exisits
        if (sponser) {
            // updating
            sponser.update(req.body).then(() => {
                res.json(
                    { 'query': 1,
                
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

//delete sponsor
app.delete('/api/sponsor/:id', (req, res) => {
    let id = req.params.id

    Sponsor.findByPk(id).then((sponsor) => {
        //check if exisits
        if (sponsor) {
           
            sponsor.update( {state:0}).then(()=>{
               res.json({
                'query': 1,
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

// update Movies
app.put('/api/movies/:id', (req, res) => {
    let id = req.params.id
    Movies.findByPk(id).then((movies) => {
        //check if exisits
        if (movies) {
            // updating
            movies.update(req.body).then(() => {
                res.json(
                    { 'query': 1,
                
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

//delete Movies
app.delete('/api/sponsor/:id', (req, res) => {
    let id = req.params.id

    Movies.findByPk(id).then((movies) => {
        //check if exisits
        if (movies) {
           
            movies.update( {state:0}).then(()=>{
               res.json({
                'query': 1,
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

// update clubs
app.put('/api/club/:id', (req, res) => {
    let id = req.params.id
    Club.findByPk(id).then((club) => {
        //check if exisits
        if (club) {
            // updating
            club.update(req.body).then(() => {
                res.json(
                    { 'query': 1,
                
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

//delete club
app.delete('/api/club/:id', (req, res) => {
    let id = req.params.id

    Club.findByPk(id).then((club) => {
        //check if exisits
        if (club) {
           
            movies.update( {state:0}).then(()=>{
               res.json({
                'query': 1,
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


app.listen(3004,()=>{
    console.log('app it running in port 3004')
})