const prisma =require('../utils/prisma')
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
class UserController{
    constructor(){}
    

    checkUser = catchAsync(async(req,res)=>{
        const email=req.body.email
        const password=req.body.password
        try {
            const user = await prisma.Users.findOne({email:email})
            if(user){
                const passwordIsMatched=await bcrypt.compare(password,user.password)
                if(user.email===email && passwordIsMatched){
                    const key = "meChartsToken"
                    const token =jwt.sign({email:user.email},key, {expiresIn:"1h"})
                    const data = await prisma.Users.findMany({
                        select : {
                            name:true,
                            email: true,
                            username:true,
                        }
                    })
                    res.status(200).send({message :"Login Successful",token:token,data:data})
                }
            }else{
                res.status(401).send({message:"Invalid User or Password"})
            }
        } catch (error) {
            res.status(401).send({message:"Invalid User or Password"})
        }
    })
    // Users = catchAsync(async(req,res)=>{
    //     const data = await prisma.Users.findMany({
    //         select : {
    //             id: true,
    //             name:true,
    //             email: true
    //         }
    //     })
    //     res.status(200).send({data:data})
    // })
    createUsers= catchAsync(async(req,res)=>{
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const phonenumber = req.body.phonenumber
        const passwordhint = req.body.passwordhint
        const username = req.body.username
        console.log(email,"hi")
        try {
            const user = await prisma.Users.findOne({email:email})
            if(user){
                res.status(403).send({message : "Email already exist"})
            }else{
                const salt= await bcrypt.genSalt(10);
                const hashPassowrd=await bcrypt.hash(password,salt)
                const data = await prisma.Users.create({
                    data : {
                        name :name,
                        email :email,
                        password :hashPassowrd,
                        phonenumber :phonenumber,
                        passwordhint :passwordhint,
                        username :username
                    }
                })
            }
        } catch (error) {
            res.status(403).send({message : error})
        }
        res.status(200).send({message:"User is registered"})
    })

}

module.exports = new UserController() 