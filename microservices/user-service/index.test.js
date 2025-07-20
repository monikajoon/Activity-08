const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./index'); // Import the Express app

// Mocking mongoose model methods to prevent actual DB operations
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        model: jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue([{ _id: '1', name: 'Alice', email: '<a href="mailto:alice@example.com">alice@example.com</a>' }]),
            findById: jest.fn().mockImplementation(id =>
                Promise.resolve({ _id: id, name: 'Alice', email: '<a href="mailto:alice@example.com">alice@example.com</a>' })
            ),
            save: jest.fn().mockImplementation(function () { return Promise.resolve(this); })
        }),
        connect: jest.fn(),
        Schema: actualMongoose.Schema,
        connection: {
            close: jest.fn(),
        },
    };
});

describe('User Service API', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /users', () => {
        it('should return all users', async () => {
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body.users).toEqual([{ _id: '1', name: 'Alice', email: '<a href="mailto:alice@example.com">alice@example.com</a>' }]);
        });
    });

    describe('GET /users/:userId', () => {
        it('should return a specific user by userId', async () => {
            const userId = '1';
            const response = await request(app).get(`/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body.user).toEqual({ _id: userId, name: 'Alice', email: '<a href="mailto:alice@example.com">alice@example.com</a>' });
        });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const newUser = { name: 'Bob', email: '<a href="mailto:bob@example.com">bob@example.com</a>' };
            const response = await request(app).post('/users').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ _id: expect.any(String), name: 'Bob', email: '<a href="mailto:bob@example.com">bob@example.com</a>' });
        });
    });
});
