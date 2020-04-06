const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateformat');
const morgan = require('morgan');
const config = require('config');
const app = express();
require('./model/connect')
app.use(bodyPaser.urlencoded({extended: false}))

app.use(session({
	resave: false,  
    saveUninitialized: false, 
    secret: 'secret key',
    cookie: {
    	maxAge: 24 * 60 * 60 * 1000
    }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));
template.defaults.imports.dateFormat = dateFormat;
app.use(express.static(path.join(__dirname,'public')));

console.log(config.get('title'));

if (process.env.NODE_ENV == 'development') {
	console.log('当前是开发环境');
	app.use(morgan('dev'));
}else {
	console.log('当前是生产环境');
}

const home = require('./route/home');
const admin = require('./route/admin');

app.use('/admin', require('./middleware/loginGuard'));
app.use('/home', home);
app.use('/admin', admin);




app.use((err, req, res, next) => {
	const result = JSON.parse(err);

	let params = [];
	for(let attr in result) {
		if(attr != 'path') {
			params.push(attr + '=' + result[attr]);
		}
	}
	res.redirect(`${result.path}?${params.join('&')}`);
});

app.listen(80);
console.log('网站服务器启动成功');