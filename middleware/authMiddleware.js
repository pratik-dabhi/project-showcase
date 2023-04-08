const jwt = require('jsonwebtoken');

function authToken(req,res,next){
    jwt.verify(req.cookies.user,'pratik',async (e,data)=>{
        if(data && data.code == 1)
            {
                req.data = data;
                next()
            }
        else 
            return res.render('login',{err_msg:''})
    })   
}

module.exports = authToken;

