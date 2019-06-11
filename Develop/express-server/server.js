var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var router = require('./router/main')(app)
var path = require('path')

app.listen(8081, function(){
  console.log("Express server has started on port 8081")
})

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/email_post', function(req, res) {
  console.log('req.body', req.body)
  res.send('welcome!! ' + req.body.email)
})