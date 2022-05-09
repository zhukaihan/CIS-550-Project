const request = require('supertest');

const webapp = require('../server');
const server = webapp.listen(8800);

beforeAll(async () => {
});

afterAll(async () => {
  server.close()
});

describe('Test login signup', () => {
  beforeAll(async () => {
  });

  test('Endpoint POST /register', async () => {
    jest.setTimeout(10 * 1000);
    const response = await request(webapp).post('/register/').send({
      username: "demo1",
      email: "demo1@d.d",
      password: "Demodemo1"
    });
    expect(response.status).toEqual(200);
    expect(response.body.message.user.email).toEqual("demo1@d.d");
  });

  test('Endpoint POST /register fail err email', async () => {
    jest.setTimeout(10 * 1000);
    let response;
    response = await request(webapp).post('/register/').send({
      username: "demo1",
      email: "demo1",
      password: "Demodemo1"
    });
    expect(response.status).toEqual(400);
  });
  test('Endpoint POST /register fail err pwd no cap', async () => {
    jest.setTimeout(10 * 1000);
    let response;
    response = await request(webapp).post('/register/').send({
      username: "demo1",
      email: "demo1@d.d",
      password: "emodemo1"
    });
    expect(response.status).toEqual(400);
  });
  test('Endpoint POST /register fail err pwd no num', async () => {
    jest.setTimeout(10 * 1000);
    let response;
    response = await request(webapp).post('/register/').send({
      username: "demo1",
      email: "demo1@d.d",
      password: "Demodemo"
    });
    expect(response.status).toEqual(400);
  });
  test('Endpoint POST /register fail err pwd <8 chars', async () => {
    jest.setTimeout(10 * 1000);
    let response;
    response = await request(webapp).post('/register/').send({
      username: "demo1",
      email: "demo1@d.d",
      password: "Demode1"
    });
    expect(response.status).toEqual(400);
  });

  test('Endpoint POST /login', async () => {
    jest.setTimeout(10 * 1000);
    const response = await request(webapp).post('/login/').send({
      email: "demo1@d.d",
      password: "Demodemo1"
    });
    expect(response.status).toEqual(200);
    expect(response.body.loggedIn).toEqual(true);
  });

  test('Endpoint POST /login fail', async () => {
    jest.setTimeout(10 * 1000);
    let response;
    response = await request(webapp).post('/login/').send({
      email: "demo1129837138746@d.d",
      password: "Demodemo1"
    });
    expect(response.status).toEqual(404);
    response = await request(webapp).post('/login/').send({
      email: "demo1@d.d",
      password: "demodemo1"
    });
    expect(response.status).toEqual(401);
  });

});
