const jwt = require('jsonwebtoken');
const  secretKey  = require('../../config/db').secretKey;

 function verifyToken(req,res,next)
{
     //checking for authorization bearer in req. header
   if(!req.headers['authorization'])
   {
       return res.status(401).json({"msg":"Unauthorised Request!"});
   }
   try
   {
     let token=req.headers.authorization.split(' ')[1];
     if(!token)
     {
          return res.status(401).json({"msg":"Unauthorised Request!"});
     }
     //verifying the token
     jwt.verify(token,secretKey,(err,payload)=>
     {
          if(err)
          {
               return res.status(401).json({"msg":"Unauthorised Request!"});
          }
          else
          {
               if(!payload)   //if payload is missing - token is invalid
               {
                    return res.status(401).json({"msg":"Unauthorised Request!"});
               }
               next();   //token verified => continue with the req.
          }
     });
     
   }
   catch(err)
   {
     return res.status(401).json({"msg":"Unauthorised Request!"});
   }
}
module.exports=verifyToken;