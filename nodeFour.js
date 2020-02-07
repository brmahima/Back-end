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

//artist module
const Artist = require("./modules/artist")
//movies module
const Movies = require("./modules/movies")
//sponsor moduleF
const Sponsor = require("./modules/sponsor")
//club module
const  Club = require("./modules/club")



//create new artist
app.post('/api/artist', upload.single('artistImage'), (req, res) => {
    
    Artist.findOne({
        where:
        {nameEn:req.body.nameEn}}
        ).then((artists)=>{
        if(!artists){
            Artist.create({
                nameAr: req.body.nameAr,
                nameEn: req.body.nameEn,
                image: req.file.filename
        
            }).then((artist) => {
                if(artist){
                    res.json({
                        'query': 1,
                        'artists':artist})
                }else{
                    res.json({
                        'query': -1,
                        'cuase':''
                    })
                }
            
            })
        }else{
            res.json({
                'query': -1,
                'cuase':'name its founded',
               

            })
        }
    })

})


app.get('/api/artists/:start/:limit', (req, res) => {
    let start = req.params.start
    let limt = req.params.limit
        Artist.findAndCountAll().then((artist) => {
            if(artist.rows.length!=0){
                if(+artist.count<= +limt){
                    res.json({
                        'query':1,
                        'artists':artist.rows,
                        'state':'its end'
                })
                }else if(+artist.count> +limt){
                    Artist.findAndCountAll({
                        offset:+start,
                        limit:+limt,
                        subQuery:false
                    }).then((art)=>{
                        if(art.rows.length!=0){   
                        if(art.rows.length< +limt){
                            res.json({
                                'query':1,
                                'start':+start +art.rows.length,
                                'artists':art.rows,
                                'state':'its end'
                            })
                        }else if(art.rows.length>= +limt) {
                            res.json({
                                'query':1,
                                'start':+start + +limt,
                                'artists':art.rows,
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


//getting all artist
app.get('/api/artist', (req, res) => {
    Artist.findAll().then((artist) => {
        if(artist){
            res.json({ 
                'query': 1,
                'artists':artist})
        }else{
            res.json({
                'query': -1,
                'cuase':''
            })
        }
    })

})

//getting artist by id
app.get('/api/artist/:id', (req, res) => {
    let id = req.params.id
    Artist.findByPk(id).then((artist) => {
        //check if exisits
        if (artist)
            res.json({
                'query': 1,
                'artists':artist})
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
        } })
    })


//create new sponsor
app.post('/api/sponsor', upload.single('sponsorImage'), (req, res) => {
    
      
    Sponsor.findOne({
        where:
        {nameEn:req.body.nameEn}}
        ).then((sponsor)=>{
        if(!sponsor){
            Sponsor.create({
                nameAr: req.body.nameAr,
                nameEn: req.body.nameAn,
                image: req.file.filename
        
            }).then((sponsor) => {
                if(sponsor){
                    res.json({
                        'query': 1,
                        'sponsors':sponsor})
                }else{
                    res.json({
                        'query': -1,
                        'cuase':''
                    })
                }
            
            })
        }else{
            res.json({
                'query': -1,
                'cuase':'name its founded',
               

            })
        }

    })
    

})

app.get('/api/sponsors/:start/:limit', (req, res) => {
    let start = req.params.start
    let limt = req.params.limit
        Sponsor.findAndCountAll().then((sponsor) => {
            if(sponsor.rows.length!=0){
                if(+sponsor.count<= +limt){
                    res.json({
                    'query':1,
                    'sponsors':sponsor.rows,
                    'state':'its end'
                })
                }else if(+sponsor.count> +limt){
                    Sponsor.findAndCountAll({
                        offset:+start,
                        limit:+limt,
                        subQuery:false
                    }).then((spon)=>{
                        if(spon.rows.length!=0){ 
                        if(spon.rows.length< +limt){
                            res.json({
                                'query':1,
                                'start':+start +spon.rows.length,
                                'sponsors':spon.rows,
                                'state':'its end'
                            })
                        }else if(spon.rows.length>= +limt) {
                            res.json({
                                'query':1,
                                'start':+start + +limt,
                                'sponsors':spon.rows,
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




//getting all sponsor
app.get('/api/sponsor', (req, res) => {
    Sponsor.findAll().then((sponsor) => {

        res.json(sponsor)

        if (sponsor)
        res.json({
            'query': 1,
            'sponsors':sponsor})
    else {
        res.json({
            'query': -1,
            "cause": "not found"
        })
    }

    })

})

//getting sponsor by id
app.get('/api/sponsor/:id', (req, res) => {
    let id = req.params.id
    Sponsor.findByPk(id).then((sponsor) => {
        if (sponsor)
        res.json({
            'query': 1,
            'sponsors':sponsor})
    else {
        res.json({
            'query': -1,
            "cause": "not found"
        })
    }

    })
})

//create new movie
app.post('/api/movie', upload.single('movieImage'), (req, res) => {
    Movies.findOne({
        where:
        {nameEn:req.body.nameEn}}
        ).then((movie)=>{
        if(!movie){
            Movies.create({
                nameAr: req.body.nameAr,
                nameEn: req.body.nameAn,
                image: req.file.filename
        
            }).then((movie) => {
                if(movie){
                    res.json({
                        'query': 1,
                        'movies':movie})
                }else{
                    res.json({
                        'query': -1,
                        'cuase':''
                    })
                }
            
            })
        }else{
            res.json({
                'query': -1,
                'cuase':'name its founded',
               

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

app.get('/api/movies/:start/:limit', (req, res) => {
    let start = req.params.start
    let limt = req.params.limit
        Movies.findAndCountAll().then((movie) => {
            if(movie.rows.length!=0){
                if(+movie.count<= +limt){
                    res.json({
                    'query':1,
                    'movies':movie.rows,
                    'state':'its end'
                })
                }else if(+movie.count> +limt){
                    Movies.findAndCountAll({
                        offset:+start,
                        limit: +limt,
                        subQuery:false
                    }).then((mov)=>{
                        if(mov.rows.length!=0){ 
                        if(mov.rows.length< +limt){
                            res.json({'query':1,
                                'start':+start +mov.rows.length,
                                'movies':mov.rows,
                                'state':'its end'
                            })
                        }else if(mov.rows.length>= +limt) {
                            res.json({'query':1,
                                'start':+start + +limt,
                                'movies':mov.rows,
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


//getting all movies
app.get('/api/movie', (req, res) => {
    Movies.findAll().then((movie) => {
        if (movie)
        res.json({
            'query': 1,
            'movies':movie})
    else {
        res.json({
            'query': -1,
            "cause": "not found"
        })
    }
    })

})

//getting movie by id
app.get('/api/movie/:id', (req, res) => {
    let id = req.params.id
    Movies.findByPk(id).then((movie) => {
        //check if exisits
        if (movie)
            res.json({
                'query': 1,
                'movies':movie})
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
app.delete('/api/movies/:id', (req, res) => {
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
//create new club
app.post('/api/club', upload.single('clubImage'), (req, res) => {
    Club.findOne({
        where:
        {nameEn:req.body.nameEn}}
        ).then((club)=>{
        if(!club){
            Club.create({
                nameAr: req.body.nameAr,
                nameEn: req.body.nameAn,
                image: req.file.filename
        
            }).then((club) => {
                if(club){
                    res.json({
                        'query': 1,
                        'clubs':club})
                }else{
                    res.json({
                        'query': -1,
                        'cuase':''
                    })
                }
            
            })
        }else{
            res.json({
                'query': -1,
                'cuase':'name its founded',
               

            })
        }

    })
})

app.get('/api/clubs/:start/:limit', (req, res) => {
    let start = req.params.start
    let limt = req.params.limit
        Club.findAndCountAll().then((club) => {
            if(club.rows.length!=0){
                if(+club.count<= +limt){
                    res.json({
                        'query':1,
                        'clubs':club.rows,
                        'state':'its end'
                    })
                }else if(+club.count> +limt){
                    Club.findAndCountAll({
                        offset:+start,
                        limit:+limt,
                        subQuery:false
                    }).then((clb)=>{
                        if(clb.rows.length!=0){ 
                        if(clb.rows.length< +limt){
                            res.json({
                                'query':1,
                                'start':+start +clb.rows.length,
                                'clubs':clb.rows,
                                'state':'its end'
                            })
                        }else if(clb.rows.length>= +limt) {
                            res.json({
                                'query':1,
                                'start':+start + +limt,
                                'clubs':clb.rows,
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

//getting all clubs
app.get('/api/club', (req, res) => {
    Club.findAll().then((club) => {
        if (club)
        res.json({'query': 1,
           'clubs': club})
    else {
        res.json({
            'query': -1,
            "cause": "not found"
        })
    }
    })

})

//getting clubs by id
app.get('/api/club/:id', (req, res) => {
    let id = req.params.id
    Club.findByPk(id).then((club) => {
        //check if exisits
        if (club)
            res.json({'query': 1,
               'clubs': club})
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