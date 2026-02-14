const request = require('supertest');
const app = require('../src/app'); // On pointe vers app.js, pas index/server

describe('Auth API', () => {
  // Optionnel : augmente le timeout pour laisser le temps à la DB de répondre
  jest.setTimeout(10000);

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@test.com',
        password: 'wrongpassword'
      });
    
    // On vérifie que le serveur répond (même une erreur 401 ou 404 est un signe de vie)
    expect(res.statusCode).toBe(401); 
  });
});