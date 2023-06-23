const prisma =require('../utils/prisma')
const catchAsync = require('../utils/catchAsync');

class HomeController{
    constructor(){}
    
    Users = catchAsync(async(req,res)=>{
        const data = await prisma.Users.findMany({
            select : {
                id: true,
                name:true,
                email: true
            }
        })
        res.status(200).send({data:data})
    })
    createUsers= catchAsync(async(req,res)=>{
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const phonenumber = req.body.phonenumber
        const passwordhint = req.body.passwordhint
        const username = req.body.username
        const data = await prisma.Users.create({
            data : {
                name :name,
                email :email,
                password :password,
                phonenumber :phonenumber,
                passwordhint :passwordhint,
                username :username
            }
        })
        res.status(200).send({message:"User is registered"})
    })

}

module.exports = new HomeController() 