const request = require('supertest');
const app = require('../../backend/app');
const truncate = require('../utils/truncate');
const factory = require('../utils/factory');


describe("Local", () => {

    beforeEach( async () => {
        await truncate({ cascade: true });
    })
    
    it("should create new Local (route /api/v1/local/new)", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const response = await request(app)
                .post('/api/v1/local/new')
                .send({
                    contract: 'Test 0001',
                    cust_of_center: '0001',
                    city: 'Test City',
                    state: 'Test State',
                    country: 'Test country',
                    is_active: true,
                })
                .set('cookie', `token=${token}`)

        expect(response.status).toBe(201);
   
    });

    it("should not create new Local already exist (route /api/v1/local/new)", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const local = await factory.create('Local', {
            cust_of_center: '0001'
        })

     
        const response = await request(app)
                .post('/api/v1/local/new')
                .send({
                    contract: 'Test 0001',
                    cust_of_center: '0001',
                    city: 'Test City',
                    state: 'Test State',
                    country: 'Test country',
                    is_active: true,
                })
                .set('cookie', `token=${token}`)


        expect(response.status).toBe(400);
   
    });

    it("should update local (route /api/v1/local/update/:cust_of_center)", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const local = await factory.create('Local', {
            cust_of_center: '0002'
        })

        
        const response = await request(app)
                .put(`/api/v1/local/update/${local.cust_of_center}`)
                .send({
                    contract: 'Update Contract',
                })
                .set('cookie', `token=${token}`)

        
        expect(response.status).toBe(200);
   
    });

    it("should not update local (route /api/v1/local/update/:cust_of_center)", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const local = await factory.create('Local', {
            cust_of_center: '0002'
        })

        
        const response = await request(app)
                .put(`/api/v1/local/update/000`)
                .send({
                    contract: 'Update Contract',
                })
                .set('cookie', `token=${token}`)

        
        expect(response.status).toBe(404);
   
    });


    it("should delete local (route /api/v1/local/delete/:cust_of_center)", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const local = await factory.create('Local', {
            cust_of_center: '0002'
        })

        
        const response = await request(app)
                .delete(`/api/v1/local/delete/${local.cust_of_center}`)
                .set('cookie', `token=${token}`)

        
        expect(response.status).toBe(200);
   
    });


    it("should delete local (route /api/v1/local/delete/:cust_of_center)", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        
        const response = await request(app)
                .delete(`/api/v1/local/delete/0000`)
                .set('cookie', `token=${token}`)

        
        expect(response.status).toBe(404);
   
    });

    it("should get all local (route /api/v1/locals)", async () => {

        const local = await factory.create('Local')

        const response = await request(app)
                .get(`/api/v1/locals`)

        console.log(response.text);
        expect(response.status).toBe(200);
   
    });


    it("should get detail local (route /api/v1/local/:cust_of_center)", async () => {

        const local = await factory.create('Local')

        const response = await request(app)
                .get(`/api/v1/local/${local.cust_of_center}`)

        console.log(response.text);
        expect(response.status).toBe(200);
   
    });

    it("should not get detail local (route /api/v1/local/:cust_of_center)", async () => {

        

        const response = await request(app)
                .get(`/api/v1/local/000`)

        console.log(response.text);
        expect(response.status).toBe(404);
   
    });
});