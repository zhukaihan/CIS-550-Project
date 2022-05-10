const request = require('supertest');

const webapp = require('../server');
const server = webapp.listen(8801);

beforeAll(async () => {
});

afterAll(async () => {
  server.close()
});

jest.setTimeout(10 * 60 * 1000);
describe('Test routes', () => {
  beforeAll(async () => {
  });

  test('Endpoint GET /priceByDateRange', async () => {
    const response = await request(webapp).get('/api/priceByDateRange?startdate=2015-10-10&enddate=2015-10-11').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /priceByTime', async () => {
    const response = await request(webapp).get('/api/priceByTime?date=2015-10-08%2013:00:00').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /tweetByDateRange', async () => {
    const response = await request(webapp).get('/api/tweetByDateRange?startdate=2021-02-10&enddate=2021-02-12').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /tweetByTime', async () => {
    const response = await request(webapp).get('/api/tweetByTime?date=2021-02-10%2023:59:04').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /user/:user', async () => {
    const response = await request(webapp).get('/api/user/CryptoND').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /tweetsByVerified', async () => {
    const response = await request(webapp).get('/api/tweetsByVerified').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /tweets5PercInc', async () => {
    const response = await request(webapp).get('/api/tweets5PercInc').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /tweetsWhenHigh', async () => {
    const response = await request(webapp).get('/api/tweetsWhenHigh').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /surgeInPrice', async () => {
    const response = await request(webapp).get('/api/surgeInPrice').send();
    expect(response.status).toEqual(200);
  });

  test('Endpoint GET /aboveMovingAverage', async () => {
    const response = await request(webapp).get('/api/aboveMovingAverage').send();
    expect(response.status).toEqual(200);
  });



  test('Endpoint GET /priceByDateRange err no enddate', async () => {
    const response = await request(webapp).get('/api/priceByDateRange?startdate=2015-10-10').send();
    expect(response.body.error).toEqual("Invalid query. ");
  });

  test('Endpoint GET /priceByTime err no date', async () => {
    const response = await request(webapp).get('/api/priceByTime').send();
    expect(response.body.error).toEqual("Invalid query. ");
  });

  test('Endpoint GET /tweetByDateRange err no enddate', async () => {
    const response = await request(webapp).get('/api/tweetByDateRange?startdate=2021-02-10').send();
    expect(response.body.error).toEqual("Invalid query. ");
  });

  test('Endpoint GET /tweetByTime err', async () => {
    const response = await request(webapp).get('/api/tweetByTime').send();
    expect(response.body.error).toEqual("Invalid query. ");
  });

  // test('Endpoint GET /user/:user err no user', async () => {
  //   const response = await request(webapp).get('/api/user').send();
  //   expect(response.body.error).toEqual("Invalid query. ");
  // });

});
