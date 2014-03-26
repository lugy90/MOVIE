var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var _ = require('underscore')
var port = 3000
var app = express()

//mongoose.connect('mongodb://localhost/imooc')
mongoose.connect('mongodb://nodejitsu_wolf18387:iu4rgdu4djkq3j0afobj3hvu86@ds061548.mongolab.com:61548/nodejitsu_wolf18387_nodejitsudb9547922664')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.bodyParser())
app.listen(port)
app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname, 'public')))

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
  var id = req.params.id

  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'imooc 详情页',
      movie: movie
    })
  })
})


// admin new page
app.get('/admin/new', function(req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: '',
    }
  })
})

// admin update page
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id

  if (id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: 'imooc 后台更新页',
        movie: movie
      })
    })
  }
})

// admin post movie
app.post('/admin/movie', function(req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err)
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err)
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      language: movieObj.language,
      country: movieObj.country,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }

      res.redirect('/movie/' + movie._id)
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
      movies: movies
    })
  })
})

// list page
app.delete('/admin/list', function(req, res) {
  var id = req.query.id

  if (id) {
    Movie.remove({_id: id}, function(err, movie) {
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    })
  }
})

