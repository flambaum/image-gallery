const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');

const app = express();

app.set('view engine', 'pug')

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	resave: true,
	saveUninitialized: false,
	secret: 'qwerty',
	cookie: {
		maxAge: 10 * 60 * 1000,
		httpOnly: true,
	},
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/upload', uploadRoute);

app.use((req, res, next) => {
	next(404);
});

app.use((err, req, res, next) => {
    if (typeof err === 'number') {
        err = {status: err};
	}
	
	let { status = 500, message = http.STATUS_CODES[status] || `Server Error`} = err;

	return res
		.status(status)
		.json({ message });
});

module.exports = app;

