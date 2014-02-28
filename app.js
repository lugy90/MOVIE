var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.listen(port)

app.use(express.static(path.join(__dirname, 'public')))

console.log('imooc-movie started on port ' + port)

// index page
app.get('/', function(req, res) {
  res.render('index', {
    title: 'imooc',
    movies: [{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    }]
  })
})

// detail page
app.get('/movie/:id', function(req, res) {
  res.render('detail', {
    title: 'imooc 《机械战警》',
    movie: {
      doctor: '何塞·帕迪里亚',
      country: '美国',
      title: '机械战警',
      year: 2014,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      language: '英语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '翻拍自1987年同名科幻经典、由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星乔尔·金纳曼化身新“机械战警”酷黑战甲亮相，加里·奥德曼、塞缪尔·杰克逊、迈克尔·基顿三大戏骨绿叶护航。预告片末更亮出了本片将登陆IMAX巨幕。新版《机械战警》故事背景跟原版一样，依旧设定在工业城市底特律，但故事年代已由之前设定的2020年变为了2028年，并且故事格局也明显扩大。在片中，金纳曼饰演的好警察墨菲将会被歹徒“杀死”，然后被进行军火开发的机器人公司Omni Corp改造成半人半机器的“机械战警”。'
    }
  })
})

// admin page
app.get('/admin', function(req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页'
  })
})

exports = module.exports = app