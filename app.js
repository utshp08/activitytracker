const express = require('express');
const xprhbr = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const handlebars = require('handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const db = require('./config/database');


// Intiating server
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server started at port:' + port);
});

//Load database

//Setting up mongoose database
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI,
    {
        reconnectTries: 100,
        reconnectInterval: 500,
        autoReconnect: true,
        // useNewUrlParser: true,
        dbName: "activitytracker",
        username: "utspantonia",
        password: "secret123"
    }
).catch(err => {
    console.log(err);
});

// Load Routes
const tasks = require('./routes/tasks');
const preferred_tasks = require('./routes/preferred-tasks');
const users = require('./routes/users');


//using middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// use the flash middlewares
app.use(flash());
//GLOBAL Variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Initialize template handlebars
app.engine('handlebars', xprhbr({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


handlebars.registerHelper('select', () => {
    const id = handlebars.escapeExpression(this.id),
        value = handlebars.escapeExpression(this.value);

    return new handlebars.SafeString(

    );
});

// register dateFormat helper for handlebars
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));




//Defining Routes
app.get('/', (req, res) => {
    res.redirect('/tasks');
});

// call tasks routes whenever there is a /tasks request
app.use('/tasks', tasks);

// call preferred_tasks routes whenever there is a /tasks/preferred-tasks request
app.use('/tasks/preferred-tasks', preferred_tasks);

// call preferred_tasks routes whenever there is a /tasks/preferred-tasks request
app.use('/user', users);
