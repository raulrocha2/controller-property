const request = require('supertest');
const app = require('../../backend/app');
const factory = require('../utils/factory');
const truncate = require('../utils/truncate');


describe('Register and Authentication', () => {
    beforeEach( async () => {
        await truncate();
    })


    it('Should authenticate with valid credentials ', async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })

        console.log(user);
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: user.email,
                password: 'auth123123'
            })
        
        expect(response.status).toBe(200);
    });

    it('Should not be able to access with e-mail not registered', async () => {

        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'noregister@email.com',
                password: 'auth123123'
            })
            
        expect(response.status).toBe(401);
    });


    it('Should Register new user in router /api/v1/register ', async () => {

        const response = await request(app)
            .post('/api/v1/register')
            .send({
                name: 'Register Name',
                email: 'registername@email.com',
                password: 'registerpwd'
            })
        
        expect(response.status).toBe(200);
    });

    it('Should not authenticate with invalid credentials ', async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })

        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: user.email,
                password: 'wrongpassword'
            })
        
        expect(response.status).toBe(401);
    });


    it('Should return jwt token when authenticated', async () => {

        const user = await factory.create('User', {
            password: 'token123123'
        })

        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: user.email,
                password: 'token123123'
            })
        
        expect(response.body).toHaveProperty('token');
    });


    it('Should be able to access private routes when authenticated', async () => {

        const user = await factory.create('User', {
            password: 'token123123'
        })

        const token = user.generateToken()

        const response = await request(app)
            .get(`/api/v1/profile/me`)
            .set('cookie', `token=${token}`)
            
        expect(response.status).toBe(200);
    });

    it('Should not be able to access private routes whithout jwt token', async () => {

        
        const response = await request(app)
            .get('/api/v1/profile/me')
        
        expect(response.status).toBe(401);
    });

    it('Should not be able to access private routes whith invalid jwt token', async () => {

        const user = await factory.create('User', {
            password: 'token123123'
        })
        
        const response = await request(app)
            .get('/api/v1/profile/me')
            .set('cookie', 'token=12312313')
        
        expect(response.status).toBe(401);
    });


    
});