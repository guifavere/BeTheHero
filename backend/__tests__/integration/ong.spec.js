const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const factory = require('../factories');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const { name, email, whatsapp, city, uf } = await factory.build('ong');

    const response = await request(app)
      .post('/ongs')
      .send({ name, email, whatsapp, city, uf });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to get the ONGS', async () => {
    await Promise.all([
      factory.create('ong'),
      factory.create('ong'),
      factory.create('ong'),
    ]);

    const ongs = await connection('ongs').select('*');
    const response = await request(app).get('/ongs').send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(ongs);
  });
});