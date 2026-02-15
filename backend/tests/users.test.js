const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
    let adminToken;
    beforeAll(async () => {
        // We log in as admin to get the token for protected routes
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@securesup.fr',
                password: 'admin_password'
            });
        adminToken = res.body.token;
    });
  jest.setTimeout(10000);
  function createFakeUser() {
    const fakeName = `testuser${Date.now()}`;
    const fakeEmail = `test${Date.now()}@test.com`;
    const fakePassword = 'password123';
    return request(app)
      .post('/api/auth/register')
      .send({
        email: fakeEmail,
        password: fakePassword,
        name: fakeName
      });
  }
  it ('should fetch all users', async () => {
    const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should delete a user', async () => {
    const fakeUser = await createFakeUser();
    const userId = fakeUser.body.user.id;
    const deleteRes = await request(app)
      .delete(`/api/users/${userId}/delete`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(deleteRes.statusCode).toBe(200);
  });

    it('should edit a user', async () => {
    const fakeUser = await createFakeUser();
    const userId = fakeUser.body.user.id;
    const newName = `${fakeName}_edited`;
    const editRes = await request(app)
      .post(`/api/users/${userId}/edit`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: newName });
    expect(editRes.statusCode).toBe(200);
    expect(editRes.body.name).toBe(newName);
  });

  it ('should create a new user', async () => {
    const res = await request(app)
        .post('/api/users/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: fakeName,
            email: fakeEmail,
            password: fakePassword,
            role: 'USER'
        });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(fakeName);
    expect(res.body.email).toBe(fakeEmail);
    expect(res.body.role).toBe('USER');
  });

  it('should switch user role', async () => {
    const fakeUser = await createFakeUser();
    const userId = fakeUser.body.user.id;
    // Now we switch the user role
    const switchRes = await request(app)
        .post(`/api/users/${userId}/switch-role`)
        .set('Authorization', `Bearer ${adminToken}`);
    expect(switchRes.statusCode).toBe(200);
    expect(switchRes.body.role).toBe('ADMIN');
  });

  AfterEach(async () => {
    // We clean up by deleting the created user
    if (userId) {
      await request(app)
        .delete(`/api/users/${userId}/delete`)
        .set('Authorization', `Bearer ${adminToken}`);
    }
  });
});