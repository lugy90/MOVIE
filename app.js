var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port)

console.log('imooc-movie started on port ' + port)

// index page
app.get('/', function(req, res) {
  res.render('index', {
    title: 'imooc 首页'
  })
})

// detail page
app.get('/movie', function(req, res) {
  res.render('detail', {
    title: 'imooc 详情页'
  })
})

// admin page
app.get('/admin', function(req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页'
  })
})

exports = module.exports = app