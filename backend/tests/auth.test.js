const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  jest.setTimeout(10000);
  const fakeName = `testuser${Date.now()}`;
  const fakeEmail = `test${Date.now()}@test.com`;
  const fakePassword = 'password123';

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@test.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(401); 
  });

  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@securesup.fr',
        password: 'admin_password'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        
        email: fakeEmail,
        password: fakePassword,
        name: fakeName
      });
    expect(res.statusCode).toBe(201);
  });
});