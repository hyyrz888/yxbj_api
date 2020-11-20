//token
const jwt = require('jsonwebtoken')

//设置一个秘钥
const tokenkey = "zxx@cwl"

module.exports = {
	//加密
	encrypt(data,time){
		return jwt.sign(data,tokenkey,{expiresIn:time})
	},
	//解密方法
	decrypt(token){
		try{
			let data = jwt.verify(token,tokenkey)
			//表示token合法，返回data信息
			return {
				token:true,
				data:data
			}
		}catch(err){
			//token不合法,返回错误信息
			return {
				token:false,
				data:err
			}
		}
	}
}