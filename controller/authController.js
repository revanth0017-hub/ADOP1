const UserModel = require('../models/Auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
try{

    const existingUser = await UserModel.findOne({
        email:req.body.email
    })
    if(existingUser){
       return res.status(400).json({
        message:"user already registered"
       })
    }
const hashedPassword = await  bcrypt.hash(req.body.password,10)

    const newUser = await UserModel.create({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    res.status(201).json({
    message: "register done......",
    user: newUser
 })

}catch(error){
    res.status(500).json({ message: error.message || "registration failed" })
}
}

exports.login = async (req,res)=>{
try{

    const userAccount = await UserModel.findOne({
        email:req.body.email
    })

    if(!userAccount){
return res.status(400).json({
        message:"user not found "
       })
    }

    const passwordMatches = await bcrypt.compare(
        req.body.password,
        userAccount.password
    )

    if(!passwordMatches){
  return res.status(400).json({
    message:"invalid pswrd"
  })
    }

    const authToken = jwt.sign(
        {
            id:userAccount._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    res.json({
         message: "login done...",
        token: authToken
    })




}catch(error){
    res.status(500).json({ message: error.message || "login failed" })
}
}

exports.authenticate = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
        const receivedToken = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(receivedToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
};
