
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(body.json());
app.use(cookie());
app.use(express.static('dist'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const users = {
	'd.dorofeev@corp.mail.ru': {
		email: 'd.dorofeev@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 3,
	},
	's.volodin@corp.mail.ru': {
		email: 'marina.titova@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 100500,
	},
	'a.ts@corp.mail.ru': {
		email: 'a.tyuldyukov@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'hi@mail.ru': {
		email: 'hi@mail.ru',
		password: '111',
		status: 'hello!!!',
		name: 'Den',
		surname: 'Black',
	},
};
const ids = {};

app.post('/signup', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;
	const username = req.body.username;
	if (
		!password || !email ||
		!password.match(/^\S{4,}$/) ||
		!email.match(/@/)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {password, email, username, score: 0};
	ids[id] = email;
	users[email] = user;

	res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/login', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;
	if (!password || !email) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = email;

	res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({id});
});

app.get('/me', function (req, res) {
	const id = req.cookies['podvorot'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	res.json(users[email]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});