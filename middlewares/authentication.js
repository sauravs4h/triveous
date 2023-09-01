var jwt = require('jsonwebtoken');


const authentication=(req,res,next)=>{

    const payload=req.body;

    let token=req.headers.authorization?.split(" ")[1];

    if(token){
        jwt.verify(token, 'hush', function(err, decoded) {

            if(err){
              res.status(401).json({msg:err.message,status:"error"})
            }
              const userid=decoded.userid
             // console.log(userid) 
              payload.userID=userid;
              next()
            });

    }else{
        res.status(401).json({msg:"please login first",status:"error"});
    }

}

module.exports={authentication}