const jwt = require('jsonwebtoken')
require('dotenv').config()
const {JWT_PRIVATE_KEY} = process.env
const verifyToken = (req,res,next)=>{
  const token = req.header('token')
  if(!req.header('token')){
    return res.status(400).send({
      message:'token is required'
    })
  }else{
    jwt.verify(token,JWT_PRIVATE_KEY,(err,decoded)=>{
      if(!err){
        //author
        if(decoded.role === "admin"){
          next()
        }else if(decoded.role === "user"){
          return res.status(403).send({
            message: 'kamu tidak memiliki akses'
          })
        }else{
          return res.status(404).send({
            message: 'kamu tidak memiliki akses'
          })
        }
        console.log(decoded)
      }else{
        return res.status(404).send({
          message: 'token is not valid!'
        })
      }
    })
  }
}

module.exports = verifyToken