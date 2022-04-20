const express = require('express');
var cors = require('cors')


const routes = require('./routes');
require('dotenv').config()

const app = express();

// whitelist localhost 3000
// app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(cors());

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





app.listen(process.env.server_port, () => {
    console.log(`Server running at port ${process.env.server_port}`);
});

module.exports = app;
