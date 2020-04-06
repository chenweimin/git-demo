const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	state: {
		type: Number,
		default: 0
	}
});

const User = mongoose.model('User', userSchema);

async function createUser () {
	const salt = await bcrypt.genSalt(10);
	const pass = await bcrypt.hash('123456',salt);
	const user = await User.create({
		username: 'admin',
		email: 'admin@qq.com',
		password: pass,
		role: 'admin',
		state: 0
	});
}

// createUser();

const validateUser = user => {
	const schema = {
		username: Joi.string().min(2).max(12).required().error(new Error('用户名格式不正确')),
		email: Joi.string().required().error(new Error('邮箱格式不正确')),
		password: Joi.string().regex(/^[a-zA-z0-9]{3,30}$/).required().error(new Error('密码格式不正确')),
		role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值有误')),
		state: Joi.number().valid(0,1).required().error(new Error('状态值有误'))
	};

	return Joi.validate(user, schema);
} 


// User.create({
// 	username: 'admin',
// 	email: 'admin@qq.com',
// 	password: '123456',
// 	role: 'admin',
// 	state: 0
// }).then(() => {
// 	console.log('用户创建成功')
// }).catch(() => {
// 	console.log('用户创建失败')
// })

module.exports = {
	User,
	validateUser
}