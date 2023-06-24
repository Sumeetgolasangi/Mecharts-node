const prisma = require("../utils/prisma");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController {
  constructor() {}

  checkUser = catchAsync(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await prisma.Users.findUnique({
        where: {
          email: email,
        },
    });
    if (user) {
      const passwordIsMatched = await bcrypt.compare(password, user.password);
      if (user.email === email && passwordIsMatched) {
        const key = "meChartsToken";
        const token = jwt.sign({ email: user.email }, key, { expiresIn: "1h" });
        const data = await prisma.Users.findUnique({
          where:{
            email:user.email 
          }
        });
        res
          .status(200)
          .send({ message: "Login Successful", token: token, data: data });
      } else {
        res.status(401).send({ message: "Invalid User or Password" });
      }
    } else {
      res.status(401).send({ message: "Invalid User or Password" });
    }
  });
  createUsers = catchAsync(async (req, res) => {
    console.log(req.body, "body");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const passwordhint = req.body.passwordhint;
    const username = req.body.username;
    const user = await prisma.Users.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(403).send({ message: "Email already exist" });
      return;
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassowrd = await bcrypt.hash(password, salt);
      const data = await prisma.Users.create({
        data: {
          name: name,
          email: email,
          password: hashPassowrd,
          phonenumber: phonenumber,
          passwordhint: passwordhint,
          username: username,
        },
      });
      res.status(200).send({ message: "User is registered" });
      return;
    }
  });
}

module.exports = new UserController();
