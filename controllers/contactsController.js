const contactsModel = require('../models/contactsModel')


let res = contactsModel.create({
	name:'陈威龙',
	gender:0,
	mobile:13486731033,
	address:"温州",
	job:"码农"
})

console.log(res)