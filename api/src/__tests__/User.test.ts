import request from 'supertest';
import { app } from '../app';
import { getConnection } from 'typeorm';

import createConnection from '../database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create an User', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'user', email: 'user@gmail.com' });
    expect(response.status).toBe(201);
  });

  it('Should not be able to creat an user with exists email', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'user', email: 'user@gmail.com' });
    expect(response.status).toBe(400);
  });
});
