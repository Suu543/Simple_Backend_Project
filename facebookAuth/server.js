const passport = require('passport');
const connect_Ensure_Login = require('connect-ensure-login');
const Strategy = require('passport-facebook').Strategy;
const bodyParser = require('body-parser');
const logger = require('morgan');
const ejs = require('ejs');
const expressSession = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new Strategy({
    clientID: process.env.APPID,
    clientSecret: process.env.APPSECRET,
    callbackURL: process.env.CALLBACKURL
},
    (accessToken, refreshToken, profile, cb) => {
        // null means no error
        // profile: userinfo will be included in profile
        return cb(null, profile)
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
})

// Create Express App
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname + '/views'));

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'su app', resave: true, saveUninitialized: true }))

// @route - GET  /
// @desc  - a route to home page
// @access - PUBLIC
app.get('/', (req, res, next) => {
    // serialize에서 req.user에 실어준다.
    res.render('home', { user: req.user })
})

// @route - GET  /login
// @desc  - a route to login
// @access - PUBLIC
app.get('/login', (req, res, next) => {
    res.render('login');
})

// @route - GET  /login/facebook
// @desc  - a route to facebook auth
// @access - PUBLIC
// This is how we call strategy)
app.get('/login/facebook', passport.authenticate('facebook'));

// @route - GET  /login/facebook.callback
// @desc  - a route to facebook auth
// @access - PUBLIC
app.get('/login/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res, next) => {
    res.redirect('/');
})

// @route - GET  /profile
// @desc  - a route to profile of user
// @access - PRIVATE
app.get('/profile', connect_Ensure_Login.ensureLoggedIn(), (req, res, next) => {
    res.render('profile', { user: req.user })
})

app.listen(PORT, () => {
    console.log(`Listening On ${PORT}`)
})