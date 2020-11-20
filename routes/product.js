var express=require('express');
 
var router=express.Router();
 
router.get('/',function(req,res,next){
  res.send("我是商品页面");
  res.end()
})

router.post('/',function(req,res,next){
	 
})

module.exports=router;