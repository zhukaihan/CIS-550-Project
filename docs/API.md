# API

1. The request path (ex. /getUser) along with the method (i.e., GET, POST, DELETE,
   PUT) and a description of what the route is doing (e.g., retrieves a user by
   username).
2. The request params, including the name (e.g., username), param type (path or
   query), data type (e.g., integer, string, etc.), required / optional indicator, and
   description (e.g., username corresponding to a user).
3. The response params, including the name, data type, and description.

## GET /api/priceByDateRange

Get the price by date range. 

Query params: 

* `startdate`: The start date of the range. Ex. `2012-10-10`
* `enddate`: The end date of the range. Ex. `2012-10-11`

Return: 

* 200: Success. Data will be the results of tuples in the database. 
* Error: Invalid query. 

## GET /api/priceByTime

Get the price by time. 

Query params: 

* `date`: The time to match. Ex. `2012-10-10 00:11:22`

Return: 

* 200: Success. Data will be the results of tuples in the database. 
* Error: Invalid query. 

## GET /api/tweetByDateRange

Get the tweets by date range. 

Query params: 

* `startdate`: The start date of the range. Ex. `2012-10-10`
* `enddate`: The end date of the range. Ex. `2012-10-11`

Return: 

* 200: Success. Data will be the results of tuples in the database. 
* Error: Invalid query. 

## GET /api/tweetByTime

Get tweets by time. 

Query params: 

* `date`: The time to match. Ex. `2012-10-10 00:11:22`

Return: 

* 200: Success. Data will be the results of tuples in the database. 
* Error: Invalid query. 

## GET /api/user/:user

Get a user with specific username. 

Query params: 

* `user`: The username to match. Ex. `user1`

Return: 

* 200: Success. Data will be the results of tuples in the database. 
* Error: Invalid query. 

## GET /api/tweetsByVerified

Get the tweets by verified people. 

Return: 

* 200: Success. Data will be the results of tuples in the database from verified persons ordered by their followers count descending. 

## GET /api/tweets5PercInc

Get the result that are the tweets that tweeted within 1 hour of a 5% increase. 

Return: 

* 200: Success. Data will be the results of tuples in the database from the query 7 specified in SQL Queries document. 

## GET /api/tweetsWhenHigh

Get the tweets when bitcoin is priced between 4000-5000, and Eth is priced between 200-300. 

Return: 

* 200: Success. Data will be the results of tuples in the database from the query 8 specified in SQL Queries document. 

## GET /api/surgeInPrice

Get the surge in prices. 

Return: 

* 200: Success. Data will be the results of tuples in the database such that the prices surged by more than 50% over 5-hour windows. 

## GET /api/aboveMovingAverage

Get the prices that are above moving average. 

Return: 

* 200: Success. Data will be the results of tuples in the database such that the prices surged over 5-hour moving average. 
