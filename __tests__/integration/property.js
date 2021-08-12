const request = require('supertest');
const app = require('../../backend/app');
const truncate = require('../utils/truncate');
const { Property } = require('../../backend/models')
const factory = require('../utils/factory');

describe("Property", () => {

    beforeEach( async () => {
        await truncate({ cascade: true });
    })

    it("should create new property (route /api/v1/property/new)", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const response = await request(app)
                .post('/api/v1/property/new')
                .send({
                    number: '0001',
                    brand: 'Test',
                    model: 'Test Property',
                    description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                    category: 'Test Category',
                    is_avaliable: true,
                })
                .set('cookie', `token=${token}`)

        expect(response.status).toBe(201);
    });


    it("should not create new property with the same number ", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const property = await Property.create({
            number: '0001',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })

        const response = await request(app)
                .post('/api/v1/property/new')
                .send({
                    number: '0001',
                    brand: 'Test',
                    model: 'Test Property',
                    description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                    category: 'Test Category',
                    is_avaliable: true,
                })
                .set('cookie', `token=${token}`)

        expect(response.status).toBe(400);
    });

    it("should not create new property without token (route /api/v1/property/new)", async () => {

        const response = await request(app)
                .post('/api/v1/property/new')
                .send({
                    number: '0001',
                    brand: 'Test',
                    model: 'Test Property',
                    description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                    category: 'Test Category',
                    is_avaliable: true,
                })

        expect(response.status).toBe(401);
    });


    it("should update property (Route /api/v1/property/update/:number) ", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const property = await Property.create({
            number: '0002',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })
        
        const response = await request(app)
                .put(`/api/v1/property/update/0002`)
                .send({
                    number: '0003',
                    brand: 'Test Update',
                    model: 'Test Update',
                    description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                    category: 'Test Category',
                    is_avaliable: true,
                })
                .set('cookie', `token=${token}`)

            
        expect(response.status).toBe(200);
    });


    it("should not update property not found (Route /api/v1/property/update/:number) ", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()
        
        const response = await request(app)
                .put(`/api/v1/property/update/0`)
                .send({
                    number: '0003',
                    brand: 'Test Update',
                    model: 'Test Update',
                    description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                    category: 'Test Category',
                    is_avaliable: true,
                })
                .set('cookie', `token=${token}`)

        
        expect(response.status).toBe(404);
    });


    it("should get all properties in database (Route /api/v1/properties) ", async () => {

        const property = await Property.create({
            number: '0002',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })
        
        const response = await request(app)
                .get(`/api/v1/properties`)
                
        console.log(response.text);
        expect(response.status).toBe(200);
    });


    it("should get detail property (Route /api/v1/property/detail/:number) ", async () => {

        const property = await Property.create({
            number: '0002',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })
        
        const response = await request(app)
                .get(`/api/v1/property/detail/${property.number}`)
                
        console.log(response.text);
        expect(response.status).toBe(200);
    });


    it("should not get property detail (Route /api/v1/property/detail/:number) ", async () => {

        const response = await request(app)
                .get(`/api/v1/property/detail/0`)
                
       
        expect(response.status).toBe(404);
    });


    it("should delete property by number (Route /api/v1/property/delete/:number) ", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })
        const token = user.generateToken()

        const property = await Property.create({
            number: '0002',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })

        const response = await request(app)
                .delete(`/api/v1/property/delete/${property.number}`)
                .set('cookie', `token=${token}`)
                
       
        expect(response.status).toBe(200);
    });

    it("should not delete property not found  (Route /api/v1/property/delete/:number) ", async () => {

        const user = await factory.create('User', {
            password: 'auth123123'
        })

        const token = user.generateToken()


        const response = await request(app)
                .delete(`/api/v1/property/delete/00`)
                .set('cookie', `token=${token}`)
                
        expect(response.status).toBe(404);
    });
});


