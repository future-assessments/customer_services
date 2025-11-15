const request = require('supertest');
let app;

describe('middleware auth + CORS', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    // Load app after setting NODE_ENV so test stub is used
    app = require('../index');
    // stub global fetch so proxy calls do not go out to network
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: 'Test' }]),
      status: 200
    }));
  });

  afterAll(() => {
    delete process.env.NODE_ENV;
    delete require.cache[require.resolve('../index')];
    global.fetch = undefined;
  });

  test('preflight OPTIONS returns 200 or 204', async () => {
    const res = await request(app)
      .options('/customer')
      .set('Origin', 'http://localhost:4200')
      .set('Access-Control-Request-Method', 'GET');
    expect([200, 204]).toContain(res.status);
  });

  test('GET /customer without token returns 401', async () => {
    await request(app)
      .get('/customer')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('GET /customer with test token returns 200', async () => {
    const res = await request(app)
      .get('/customer')
      .set('Authorization', 'Bearer test-token')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0]).toHaveProperty('id', 1);
  });
});
