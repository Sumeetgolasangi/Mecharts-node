const prisma = require('../utils/prisma');

const addUserDetails = async (req, res, next) => {
	const email = req.query.email
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
    select:{
      id: true,
      name: true,
      email: true,
    }
	});
  req.user = user
	return next();
};

module.exports.addUserDetails = addUserDetails;
