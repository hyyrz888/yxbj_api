require("../config/db")
var mg = require('mongoose')

module.exports = mg.model('Ipa', {
	name: {
		type: String,
		defalut: '未填写'
	},
	gender: {
		type: Number,
		required: true
	},
	mobile: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		defalut: "温州"
	},
	job: {
		type: String
	}
})
