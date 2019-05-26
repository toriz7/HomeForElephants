var express = require('express');
var router = express.Router();
/*
여기서 세션설정가지 코드 없으면 세션에러가 난다...왜?
아마도 세션 선언 user가 여기서 이루어지기 때문에인듯하다
*/
var bodyParser=require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var session=require('express-session');
router.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60*5000 }
  //using secure flag means that the cookie will be set on Https only
}))
/*
불가침 구역 끝
*/
router.get('/login',function(req,res){
  console.log("로그인 페이지 접속")
  res.render('login')
});
router.get('/verify',function(req,res){
  console.log("로그인 페이지 접속2")
  res.render('login_naver_verify')
});
router.get('/about',function(req,res){
  if(req.session.user){
    res.render('about',{email:req.session.user.email, name:req.session.user.name})

    //console.log(req.session.user.email);
  }else{
    res.render('about',{email:null, name:null})
  }
});
/*
temp 에 중간 들려서 세션값 저장하고 메인으로 리턴함
*/

router.post('/temp',function(req,res){
  console.log("OMG");
  req.session.user={
    email:req.body.email,
    name:req.body.email.split("@")[0], //req.body.name,
    id:req.body.id
  };
  //console.log(req.session.user.name);
  req.session.save();
  res.redirect('/')
});

router.get('/logout',function(req,res){
  req.session.user= null;
  res.redirect('/')
});
module.exports=router
