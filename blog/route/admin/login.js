
const { User } = require('../../model/user');

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
	const {email, password} = req.body;
	if(email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', {msg: '邮箱地址或密码错误'});
	let user = await User.findOne({email});
	if(user) {
		let isValid = await bcrypt.compare(password, user.password);
		if(isValid) {
			req.session.username = user.username;
			req.session.role = user.role;
			req.app.locals.userInfo = user;
			
			if(user.role == 'admin') {
				res.redirect('/admin/user');
			} else {
				res.redirect('/home/');
			}
		} else {
			res.status(400).render('admin/error', {msg: '邮箱地址或密码错误'});
		}
	} else {
		res.status(400).render('admin/error', {msg: '邮箱地址或密码错误'});
	}
}

