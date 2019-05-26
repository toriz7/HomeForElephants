let express=require('express');
let app=express();
var session=require('express-session');
var path = require('path');

var bodyParser=require("body-parser");

var login = require('./routes/router_login');
var board = require('./routes/board');
var community=require('./routes/community');
var categories=require('./routes/categories')
/*
아래는 라우팅
*/
app.use('/',login);
app.use('/',board);
app.use('/',community);
app.use('/',categories);

//env 설정
app.set('views','./template');//여기 디렉토리에 템플릿 파일을 넣겠다는 선언
app.set('view engine','ejs');//어떤 형식의 템플릿을 사용할 것인지 선언

app.locals.pretty=true;
app.use(express.static(path.join(__dirname, 'routes'))); //path 사용

app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60*5000 }
  //using secure flag means that the cookie will be set on Https only
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/template',express.static('./template/'));
app.use('/css', express.static('./template/css/'));
app.use('/js', express.static('./template/js/'));
app.use('/img', express.static('./template/img/'));
app.use('/icon-fonts', express.static('./template/icon-fonts/'));
////////////////////////////
let mongoose = require('mongoose');
let Board=require('./models/dbModel');
mongoose.Promise = global.Promise;

/*
var promise = mongoose.connect('mongodb://localhost/mylab', {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected successfully');
});
*/
////////////////////////////

app.get('/',function(req,res){
  if(req.session.user){
    res.render('index',{email:req.session.user.email, name:req.session.user.name})

    //console.log(req.session.user.email);
  }else{
    res.render('index',{email:null, name:null})
  }
});

app.listen(3000,function(req,res){
  console.log('port 3000 connected!');
});
