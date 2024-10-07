const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const signedIn = require("./middleware/signed-in.js");
const passUser = require("./middleware/pass-user.js");

const authController = require('./controllers/auth.js');
const postsController = require('./controllers/postsController.js')

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUser);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});



app.use('/auth', authController);
app.use(signedIn);
app.use("/MyPage", postsController)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});