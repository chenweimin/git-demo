const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

module.exports = async (req, res, next) => {
	

	try {
		await validateUser(req.body);
	}catch (e) {
		return next(JSON.stringify({path: '/admin/user-edit', message: e.message}));
	}

	let user = await User.findOne({email: req.body.email});
	
	if(user) {
		return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
	}
	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.password, salt);
	req.body.password = password;
	await User.create(req.body);
	res.redirect('/admin/user');
}

