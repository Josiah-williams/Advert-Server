const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../server');

beforeEach(async () => {
    await db('adverts').truncate()
  })

describe('adverts', () => {
    describe('GET /api/adverts/', () => {
        test('Returns status code 200 response', async () => {
          await request(server)
          .get('/adverts')
          .expect(200);
        });
        test('returns a json object', async () => {
            await request(server)
            .get('/adverts')
            .expect('Content-Type', /json/);
        });
        test('returns an array of adverts', async () => {
            const response = await request(server).get('/adverts');
            expect(response.body.length).toEqual(2);
        });
    });

    describe('GET /:id', () => {
        test('returns a 200 response', async () => {
            await request(server)
            .get('/adverts/2/')
            .expect(200);
        });
        test('returns a json object', async () => {
            await request(server)
            .get('/adverts/1/')
            ,expect('Content-Type', /json/);
        });
        test('returns a 404 response if there is no existing advert', async () => {
            await request(server)
            ,get('/adverts/6/')
            .expect(404)
        });
    });

    describe('POST /add' , () => {
        const data = {
            id: 3,
            advertName: 'Test Advert',
            websiteUrl: 'www.web.co',
            country: 'mycountry',
            tags:'celebreties',
            days:5,
            number:3,
            datestring:'2021-5-03',
        };
        test('returns a 400 response for a server error', async () => {
            await request(server)
            .post('/adverts/')
            .expect(400);
        });
        test('returns a 201 response if adverts exist', async () => {
            request(server)
            .post('/adverts')
            .send(data)
            .expect(400);
        });
    });

    describe('DELETE /:id', () => {
        test('returns a 204 if adverts exist', async () => {
            await request(server)
            .delete('/adverts/1')
            .expect(204);
        });

        test("returns a 400 if review doesn't exist", async () => {
            await request(server)
            .delete('/adverts/2')
            .expect(400);
        });
    })

    afterAll(async () => {
        await db.raw('TRUNCATE adverts RESTART IDENTITY CASCADE')
    })
})