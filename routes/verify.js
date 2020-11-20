//路由验证中间件(有定义了验证的路由加载前都经过这里先验证)
const Token = require('../common/token')

const constant = require("../common/constant")

module.exports = {
	verifyToken(req,res,next){
		if(req.path==="/login"){
			return next()
		}
		//请求头中获取参数token
		let token = req.headers.token;
		console.log(token)
		//对参数token进行解密
		let tokenVerifyObj  = Token.decrypt(token)
		//token验证通过
		if(tokenVerifyObj.token){
			next()
		}else{
			res.json(constant.TOKEN_ERROR)
		}
	}
}