const express = require('express');
const router = express.Router();
const {redirectAuthenticated} = require ("../libs/middleware")
const { signup, validateSignup, login, validateLogin, logout } = require("../libs/controllers/user.controller");



router.get('/signup', redirectAuthenticated , (req, res) => {
    res.render('pages/signup', {
        title: 'Sign up',
        user: req.flash('data')[0],
       errors: req.flash('errors'),
    });
});

router.get('/login', redirectAuthenticated,  (req, res) => {
    res.render('pages/login', {
        title: 'Sign in',
        user: req.flash('data')[0],
        info: req.flash('info')[0],
        errors: req.flash('errors'),
    });
});

router.get('/', (req, res) => {
    res.render('pages/index', { title: 'Finly' });
});

router.post("/signup", validateSignup, signup)
router.post('/login', validateLogin, login);
router.get('/logout', logout);


module.exports = router;
