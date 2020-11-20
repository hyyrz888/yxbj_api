require("../config/db")
var mg = require('mongoose')

//创建一个管理员集合
module.exports = mg.model('Admin', {
	name: {
		type: String,
	},
	role: {
		type: String,
		default: 0
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	last_login_at: {
		type: Date,
		default: Date
	},
	created_at: {
		type: Date,
		default: Date
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});
