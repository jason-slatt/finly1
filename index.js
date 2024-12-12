const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');


const app = express();

require('dotenv').config();
require('./libs/dbConnecct');
 

app.set('views', './views');
app.set('view engine', 'ejs');

const userRouter = require("./routes/user.route")
const dashboardRouter = require("./routes/dashboard.route")
const {verifyUser} = require("./libs/middleware")


app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
    session({
        secret:process.env.AUTH_SECRET,
        saveUninitialized: true,
        resave: false, 
    })
);

app.use('/', userRouter);
app.use('/dashboard', verifyUser ,  dashboardRouter);

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});
 

app.get('*', (req, res) => {
    res.status(404).render('index', { message: 'Not Found' });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
