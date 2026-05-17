const request = require('supertest');
const app = require('../src/app');

describe('SIT753 DevOps API', () => {
    it('GET / should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Welcome to SIT753 DevOps API');
    });

    it('GET /health should return ok status', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    it('GET /add should return sum', async () => {
        const res = await request(app).get('/add?x=2&y=3');
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(5);
    });

    it('GET /add should validate params', async () => {
        const res = await request(app).get('/add?x=a&y=3');
        expect(res.statusCode).toBe(400);
    });
});
