const request = require('supertest');
const express = require('express');
const message = require('./api/message');
const login = require('./api/login');
const mockStorageService = require('./services/mock-storage');

describe('Unauthorized (without jwt)', () => {

    let response;

    const app = express();
    app.use(express.json());
    message(app, mockStorageService);
  
    beforeAll(async () =>
    {
        response = await request(app)
        .get('/message');
    });         
  
    test('Status code 401', () => expect(response.statusCode).toBe(401));
});

describe('Unauthorized (with wrong jwt)', () => {

    let response;

    const app = express();
    app.use(express.json());
    message(app, mockStorageService);
  
    beforeAll(async () =>
    {
        response = await request(app)
        .get('/message')
        .set('Authorization', '123');
    });         
  
    test('Status code 401', () => expect(response.statusCode).toBe(401));
});

const messagesCount = 4;

describe(`Success, ${messagesCount} last messages (with auth)`, () => {

    let response;

    const app = express();
    app.use(express.json());
    login(app, mockStorageService);
    message(app, mockStorageService);

    beforeAll(async () =>
    {      
        response = await request(app)
        .post('/login')
        .set('Content-type', 'Application/json')
        .send({
            "name": "test",
            "password": "test"
        });

        response = await request(app)
        .get(`/message?name=test&message=history ${messagesCount}`)
        .set('Authorization', 'Bearer_' + response.body.token);
    });
  
    test('Status code 200', () => expect(response.statusCode).toBe(200));

    test('There is a `messages` field', () => expect(response.body.messages).not.toBe(undefined));

    test(`Messages count is ${messagesCount}`, () => expect(response.body.messages.length).toBe(messagesCount));

    test('Messages list must be mess10, mess9, mess8, mess7', () => expect(response.body.messages).toEqual(['mess10', 'mess9', 'mess8', 'mess7'])); 
});
