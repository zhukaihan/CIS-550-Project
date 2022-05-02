const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');


const routes = require('./routes');
require('dotenv').config()

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
// app.use(cors());

const router = express.Router()
app.use('/api', router);

// Routes. 
router.get('/priceByDateRange', routes.priceByDateRange)
// http://127.0.0.1:8080/api/priceByDateRange?startdate=2015-10-10&enddate=2015-10-11
router.get('/priceByTime', routes.priceByTime)
// http://127.0.0.1:8080/api/priceByTime?date=2015-10-08%2013:00:00
router.get('/tweetByDateRange', routes.tweetByDateRange)
// http://127.0.0.1:8080/api/tweetByDateRange?startdate=http://127.0.0.1:8080/tweetByTime?date=2021-02-10&enddate=2021-02-11
router.get('/tweetByTime', routes.tweetByTime)
// http://127.0.0.1:8080/api/tweetByTime?date=2021-02-10%2023:59:04
router.get('/user/:user', routes.userByUsername)
// http://127.0.0.1:8080/api/user/CryptoND
router.get('/tweetsByVerified', routes.tweetsByVerified)
// http://127.0.0.1:8080/api/tweetsByVerified
router.get('/query7', routes.query7)
// http://127.0.0.1:8080/api/query7
router.get('/query8', routes.query8)
// http://127.0.0.1:8080/api/query8
router.get('/surgeInPrice', routes.surgeInPrice)
// http://127.0.0.1:8080/api/surgeInPrice
router.get('/aboveMovingAverage', routes.aboveMovingAverage)
// http://127.0.0.1:8080/api/aboveMovingAverage

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//profile user endpoints
var User = require("./models/user.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
app.post( "/register/",async (req, res) => {
    console.log(`registering user ${req.body.email}`);
    const emailFormat = req.body.email;
    temp_email = emailFormat.split('@');
    if (temp_email.length < 2) {
      res.status(400).send({ err: { code: 'InvalidParameterException', 
        name: 'InvalidParameterException', 
        message: "1 validation error detected: Value at 'email' failed to satisfy constraint"}});
      return;
    }
    right_part_email = temp_email[1].split('.');
    if (temp_email[0].length < 1 || right_part_email[0].length < 1 || right_part_email[1].length < 1) {
      res.status(400).send({ err: { code: 'InvalidParameterException', 
        name: 'InvalidParameterException', 
        message: "1 validation error detected: Value at 'email' failed to satisfy format validity constraint"}});
      return;
    }
    // Password
    const toCheck = req.body.password;
    if (toCheck.length < 8) {
      res.status(400).send({ err: { code: 'InvalidParameterException', 
        name: 'InvalidParameterException', 
        message: "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 8"}});
      return;
    }
    
    if (!(/[A-Z]/.test(toCheck))) {
      res.status(400).send({ err: { code: 'InvalidPasswordException', 
        name: 'InvalidPasswordException', 
        message: "Password did not conform with policy: Password must have uppercase characters"}});
      return;
    }
  
    if (!(/\d/.test(toCheck))) {
      res.status(400).send({ err: { code: 'InvalidPasswordException', 
        name: 'InvalidPasswordException', 
        message: "Password did not conform with policy: Password must have numeric characters"}});
      return;
    }  
    
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.json({ 
        message: {
          user: {username: user.username, email: user.email}
        }
      });
    });
  }
);

app.post( "/login",async (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ err: { code: 'NotAuthorizedException', 
            name: 'NotAuthorizedException', 
            message: "No account exists with this email."}});
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({ err: { code: 'NotAuthorizedException', 
            name: 'NotAuthorizedException', 
            message: "Incorrect username or password."}});
        }
  
        // var token = jwt.sign({ id: user.id }, config.secret, {
        //   expiresIn: 86400 // 24 hours
        // });
  
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          loggedIn: true
        });
        console.log('login successful');
      });
});
  


const mongoString = `mongodb+srv://550proj:${process.env.atlaspw}@users.h746o.mongodb.net/login?retryWrites=true&w=majority`

mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.listen(process.env.server_port, () => {
    console.log(`Server running at port ${process.env.server_port}`);
});

module.exports = app;
