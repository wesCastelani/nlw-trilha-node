import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create an Survey', async () => {
    const response = await request(app)
      .post('/surveys')
      .send({ title: 'Title exemple', description: 'description exemple' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to get all surveys', async () => {
    await request(app)
      .post('/surveys')
      .send({ title: 'Title exemple2', description: 'description exemple2' });

    const res = await request(app).get('/surveys');
    expect(res.body.length).toBe;
  });
});
