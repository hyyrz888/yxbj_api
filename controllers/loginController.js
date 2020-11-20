//系统方法
const fs = require('fs')
const path = require('path')
//密码md5加密
var md5 = require('md5-node')
//日期格式化
const dateFormat = require("dateFormat")


//常量
const constant = require('../common/constant')
//公共方法
const common = require('../common/funs')
//token验证
const Token = require("../common/token")
const TOKEN_EXPIRE_SENCOND = 3600 //设置token过期


//admin模块
const AdminModel = require('../models/adminModel')

//添加测试数据
// AdminModel.create({
// 	username:"章新新",
// 	password:"weilong"
// },function(err,res){
// 	console.log(err,res)
// 	return false;
// })



module.exports = {
	login
}

function login(req, res) {
	//定义一个返回对象
	const resObj = common.clone(constant.DEFAULT_SUCCESS)
	//设置任务
	let tasks = {
		//校验参数
		checkParams: (cb) => {
			common.checkParams(req.body, ['username', 'password'], cb)
			// return cb(null)
		},
		query: ['checkParams', (result, cb) => {
			
			let md5pwd = md5(req.body.password)
			req.body.password = md5pwd
			console.log("传进来的用户名和密码"+req.body.username,req.body.password)
			//如果参数校验通过,那就拿用户名和密码查找数据库
			AdminModel.findOne({
				username: req.body.username,
				password: req.body.password
			},function(err,res){
				//查询成功,操作查询到的数据
				if(res){
					resObj.data = {
						id: res.id,
						username: res.username,
						name: res.name,
						role: res.role,
						lastLogin: dateFormat(res.last_login_at, 'yyyy-mm-dd HH:MM:ss'),
						createdAt: dateFormat(res.created_at, 'yyyy-mm-dd HH:MM:ss')
					}
					//将id保存在token里
					const adminToken = {
						id: res.id
					}
					//生成token
					let token = Token.encrypt(adminToken, TOKEN_EXPIRE_SENCOND)
					//将token保存到resObj 返回给前端
					resObj.data.token = token
					//返回给接下来的操作
					cb(null, res.id)
				}else{
					//未查到数据
					cb(constant.LOGIN_ERROR)
				}
			})
		}]
	}
//执行方法
	common.autoFn(tasks, res, resObj)
}
	