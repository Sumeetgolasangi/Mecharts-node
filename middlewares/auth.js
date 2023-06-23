const prisma = require('../utils/prisma');

const addUserDetails = async (req, res, next) => {
	let email = 'sumeet.golasangi@tredence.com';
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
