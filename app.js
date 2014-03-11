var express = require('express')
var path = require('path')
var port = 3000
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var _ = require('underscore')

mongoose.connect('mongodb://localhost/imooc')

var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.bodyParser())
app.listen(port)

app.use(express.static(path.join(__dirname, 'assets')))

console.log('imooc started on port ' + port)

// index page
app.get('/', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
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
  Movie.findById(req.params.id, function(err, movie) {
    if (err) {
      console.log(err)
    }

    res.render('detail', {
      title: 'imooc ' + movie.title,
      movie: movie
    })
  })
})

// admin page
app.get('/admin/new/:id', function(req, res) {
  var id = req.params.id

  if (id) {
    Movie.findById(req.params.id, function(err, movie) {
      if (err) {
        console.log(err)
      }

      res.render('admin', {
        title: 'imooc 后台修改 ' + movie.title,
        movie: movie
      })
    })
  }
  else {
    res.render('admin', {
      title: 'imooc 后台录入页',
      movie: {}
    })
  }
})

// admin page
app.post('/admin/movie', function(req, res) {
  var _movie = req.body.movie

  if (!_movie._id) {
    _movie = new Movie({
      doctor: req.body.movie,
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
  }
  else {
    Movie.findById(_movie._id, function(err, movie) {
      if (err) {
        console.log(err)
      }
      _movie = _.extend(movie, _movie)
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err)
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  }
})

// list page
app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err)
    }

    res.render('list', {
      title: 'imooc 列表页',
      documents: {
        results: movies
      }
    })
  })
})

// delete item
app.delete('/admin/list', function(req, res) {
  var id = req.query.id

  if (id) {
    Movie.remove({_id: id}, function(err, home) {
      if (err) {
        console.log(err)
      }
      else {
        res.json({success: 1})
      }
    })
  }
})