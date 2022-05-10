const mysql = require('mysql');
const e = require('express');

require('dotenv').config()

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: process.env.rds_host,
    user: process.env.rds_user,
    password: process.env.rds_password,
    port: process.env.rds_port,
    database: process.env.rds_db
});
connection.connect();



async function priceByDateRange(req, res) {
    // const league = req.params.league ? req.params.league : 'D1'

    if (
        req.query.startdate && 
        req.query.enddate
    ) {
        let startdate = req.query.startdate;
        let enddate = req.query.enddate;
        connection.query(
            `
                SELECT * 
                FROM Crypto_price 
                WHERE Date >= '${startdate}' AND Date <= '${enddate}'
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    } else {
        res.json({ error: "Invalid query. " });
    }
}

async function priceByTime(req, res) {
    // const league = req.params.league ? req.params.league : 'D1'

    if (
        req.query.date
    ) {
        let date = req.query.date;
        connection.query(
            `
                SELECT * 
                FROM Crypto_price 
                WHERE Date = '${date}'
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    } else {
        res.json({ error: "Invalid query. " });
    }
}

async function tweetsSearch(req, res) {
    const userName = req.query.userName ? req.query.userName : ""

    if (
        req.query.startDate && 
        req.query.endDate &&
        userName == ""
    ) {
        var usernameQuery = "";
        if (req.query.userName && req.query.userName.length > 0) {
            usernameQuery = `and user_name = '${req.query.userName}'`;
        }
        connection.query(
            `
                SELECT * 
<<<<<<< HEAD
                FROM tweet_info_clean
                WHERE Date between '${req.query.startDate}' and '${req.query.endDate}'
                LIMIT 2000
=======
                FROM tweet_info
                WHERE (Date between '${req.query.startDate}' and '${req.query.endDate}') ${usernameQuery}
                LIMIT 100
>>>>>>> 0600dc990d65289a7f5e1ffb34ff3df5a78b2d58
            `, 
            function (error, results, fields) {
                if (error) {
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    } else if (
        req.query.startDate && 
        req.query.endDate
    ) {
        connection.query(
            `
                SELECT * 
                FROM tweet_info_clean
                WHERE user_name = '${userName}' AND Date between '${req.query.startDate}' and '${req.query.endDate}'
                LIMIT 2000
            `, 
            function (error, results, fields) {
                if (error) {
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );  
    } else {
        res.json({ error: "Invalid query. " });
    }
}

async function tweetByTime(req, res) {
    // const league = req.params.league ? req.params.league : 'D1'

    if (
        req.query.date
    ) {
        let date = req.query.date;
        connection.query(
            `
                SELECT * 
                FROM Tweet 
                WHERE Date = '${date}'
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    } else {
        res.json({ error: "Invalid query. " });
    }
}

async function userByUsername(req, res) {
<<<<<<< HEAD
    console.log("here")
    if (req.query.user) {
        connection.query(
            `   SELECT * 
                FROM user_info
                WHERE user_name LIKE "${req.query.user}" 
                ORDER BY date DESC
                LIMIT 1
=======
    const user = req.params.user ? req.params.user : null;

    if (user) { // There will always be req.params.user if this function is called. Because of routing specification: /user/:user. 
        connection.query(
            `   SELECT DISTINCT * 
                FROM user_info 
                WHERE user_name = '${user}'
                LIMIT 10
>>>>>>> 0600dc990d65289a7f5e1ffb34ff3df5a78b2d58
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
<<<<<<< HEAD
    } else {
        connection.query(
            `   SELECT * 
                FROM user_info
                LIMIT 100
            `, 
            function (error, results, fields) {
                if (error) {
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
=======
>>>>>>> 0600dc990d65289a7f5e1ffb34ff3df5a78b2d58
    }
}

async function tweetsByVerified(req, res) {
    // const user = req.params.user ? req.params.user : null;

    if (
        true
    ) {
        connection.query(
            `
                SELECT * 
                FROM Tweet 
                WHERE user_verified = 'True'
                ORDER BY user_followers DESC
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    // } else {
    //     res.json({ error: "Invalid query. " });
    }
}

async function tweets5PercInc(req, res) {
    // const user = req.params.user ? req.params.user : null;

    if (
        true
    ) {
        connection.query(
            `
                SELECT tweet.text
                FROM Tweet tweet
                WHERE tweet.datehour in (SELECT price.datehour
                FROM Crypto_price price
                WHERE price.Symbol='BTC/US' AND price.High>price.Low*1.05);
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    // } else {
    //     res.json({ error: "Invalid query. " });
    }
}

async function tweetsWhenHigh(req, res) {
    // const user = req.params.user ? req.params.user : null;

    if (
        true
    ) {
        connection.query(
            `
                SELECT DISTINCT tweet.text
                FROM Tweet tweet
                WHERE tweet.datehour in (SELECT BTC.BTCDates as Dates
                FROM (SELECT btcprice.datehour AS BTCDates
                FROM Crypto_price btcprice
                WHERE btcprice.High < 5000 AND btcprice.High>4500 AND btcprice.Symbol='BTC/US') AS BTC,
                    (SELECT ethprice.datehour AS ETHDates
                FROM Crypto_price ethprice
                WHERE ethprice.High < 300 AND ethprice.High>200 AND ethprice.Symbol='ETH/US') AS ETH
                WHERE BTC.BTCDates = ETH.ETHDates)
                AND tweet.hashtags LIKE '%ETH%';
            
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    // } else {
    //     res.json({ error: "Invalid query. " });
    }
}

async function surgeInPrice(req, res) {
    // const user = req.params.user ? req.params.user : null;

    if (
        true
    ) {
        connection.query(
            `
                SELECT *
                FROM (
                        SELECT *,
                                AVG(Close) OVER (ORDER BY time RANGE BETWEEN INTERVAL 5 HOUR PRECEDING AND CURRENT ROW) AS cur_ma,
                                AVG(Close) OVER (ORDER BY time RANGE BETWEEN INTERVAL 10 HOUR PRECEDING AND INTERVAL 5 HOUR PRECEDING) AS prev_ma
                        FROM Crypto_price
                        WHERE Symbol = 'BTC/US'
                    ) cp
                WHERE cp.cur_ma > cp.prev_ma * 1.05;
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    // } else {
    //     res.json({ error: "Invalid query. " });
    }
}

async function aboveMovingAverage(req, res) {
    // const user = req.params.user ? req.params.user : null;

    if (
        true
    ) {
        connection.query(
            `
                SELECT *
                FROM (
                        SELECT *,
                                AVG(Close) OVER (ORDER BY time RANGE BETWEEN INTERVAL 5 HOUR PRECEDING AND CURRENT ROW) AS ma
                        FROM Crypto_price
                        WHERE Symbol = 'BTC/US'
                    ) cp
                WHERE cp.Close > cp.ma;
            `, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    // } else {
    //     res.json({ error: "Invalid query. " });
    }
}

module.exports = {
    priceByDateRange,
    priceByTime,
    tweetsSearch,
    tweetByTime,
    userByUsername,
    tweetsByVerified,
    tweets5PercInc,
    tweetsWhenHigh,
    surgeInPrice,
    aboveMovingAverage,
}