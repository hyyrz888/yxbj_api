//数据库配置
const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
//数据库连接失败
db.on("error",console.error.bind(console,"数据库连接失败"))

db.once('open',function(){
	console.log("数据库连接成功")
})

module.exports = db