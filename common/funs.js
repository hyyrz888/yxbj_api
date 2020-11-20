//公共方法文件
const async = require('async')

const constant = require('./constant')

module.exports = {

	clone,
	checkParams,
	//返回统一方法，返回json格式数据
	autoFn
}
//克隆方法
function clone(obj) {
	return JSON.parse(JSON.stringify(obj))
}

//校验参数全局方法
function checkParams(params, checkArr, cb) {
	let flag = true;
	checkArr.forEach(function(v){
		if (!params[v]) flag = false
		//验证通过
	})
	flag ? cb(null) : cb(constant.LACK) //缺少参数
}

//运行task
function autoFn(tasks, res, resObj) {
	async.auto(tasks, function(err) {
		if (!!err) {
			//打印错误信息
			console.log(JSON.stringify(err))
			//返回json数据
			res.json({
				code: err.code || constant.DEFAULT_ERROR.code,
				msg: err.msg || JSON.stringify(err)
			})
		} else {
			//返回正确信息
			res.json(resObj)
		}
	})
}