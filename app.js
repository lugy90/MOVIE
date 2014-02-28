var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var Movie = require('./models/movie')

mongoose.connect('mongodb://localhost/imooc')

var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.listen(port)

app.use(express.static(path.join(__dirname, 'public')))

console.log('imooc-movie started on port ' + port)

// index page
app.get('/', function(req, res) {
  Movie.findAll(function(err, movies) {
    if (err !== null) {
      console.log(err)
    }

    res.render('index', {
      title: 'imooc 首页',
      movies: movies
    })
  })
})

// detail page
app.get('/movie/:id', function(req, res) {
  Movie.findById(req.query.id, function(err, movie) {
    if (err !== null) {
      console.log(err)
    }

    res.render('detail', {
      title: 'imooc 《' + movie.title + '》',
      movie: movie
    })
  })
})

// admin page
app.get('/admin', function(req, res) {
  var _movie = new Movie({
    doctor: req.body.doctor,
    title: req.body.title,
    language: req.body.language,
    country: req.body.country,
    year: req.body.year,
    poster: req.body.poster,
    flash: req.body.flash,
    summary: req.body.summary
  })

  _movie.save(function(err, movie) {
    if (err) {
      console.log(err)
    }

    res.redirect('/movie/' + movie._id)
  })
})

exports = module.exports = app