var express = require('express');
var router = express.Router();

let loginController  = require('../controllers/loginController.js')
router.get('/', function(req,res,next){
	res.send('我是登录页面')
})

//post登录
router.post("/",loginController.login)


module.exports = router