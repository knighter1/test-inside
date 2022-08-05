const request = require('supertest');
const express = require('express');
const login = require('./api/login');
const mockStorageService = require('./services/mock-storage');

describe('Success authentication', () => {

    let response;

    const app = express();
    app.use(express.json());
    login(app, mockStorageService);
  
    beforeAll(async () =>
    {
        response = await request(app)
        .post('/login')
        .set('Content-type', 'Application/json')
        .send({
            "name": "test",
            "password": "test"
        });
    });         
  
    test('Status code 200', () => expect(response.statusCode).toBe(200));

    test('There is a token field in response', () => expect(response.body.token.length).not.toBe(undefined));
});

describe('Fail authentication (wrong login)', () => {

    let response;

    const app = express();
    app.use(express.json());
    login(app, mockStorageService);
  
    beforeAll(async () =>
    {
        response = await request(app)
        .post('/login')
        .set('Content-type', 'Application/json')
        .send({
            "name": "test1",
            "password": "test"
        });
    });         
  
    test('Status code 403', () => expect(response.statusCode).toBe(403));
});

describe('Fail authentication (wrong password)', () => {

    let response;

    const app = express();
    app.use(express.json());
    login(app, mockStorageService);
  
    beforeAll(async () =>
    {
        response = await request(app)
        .post('/login')
        .set('Content-type', 'Application/json')
        .send({
            "name": "test",
            "password": "test1"
        });
    });         
  
    test('Status code 403', () => expect(response.statusCode).toBe(403));
});
