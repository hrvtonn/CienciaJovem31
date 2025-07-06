const request = require('supertest');
const express = require('express');

const app = express();
app.get('/health', (req, res) => res.status(200).send('ok'));

describe('Health check', () => {
  it('should return ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('ok');
  });
});
