const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');  // Import sequelize to close connection

describe('User Endpoints', () => {
  
  beforeAll(async () => {
    await sequelize.authenticate();  // Ensure DB connection is established
  });

  afterAll(async () => {
    await sequelize.close();  // Close DB connection after tests
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'New User',
        email: 'new_user@example.com',  // Use a new email to avoid duplication issues
        password: 'newpassword123',
        role: 'admin',
      });
    console.log(res.body);  // Log the response body for debugging
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id');
  });

  it('should login a new user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'new_user@example.com',
        password: 'newpassword123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
