const request = require('supertest');
const app = require('../../backend/app');
const truncate = require('../utils/truncate');
const { 
    User, 
    AllocatedProperty,
    Local,
    Property
 } = require('../../backend/models');

 describe('Allocated Property', () => {
    beforeEach( async () => {
        await truncate({ cascade: true });
    })
    

    it('Should be able allocated new property', async () => {

        const user = await User.create({
            name: 'Register Name',
            email: 'registername@email.com',
            password: 'registerpwd'
        })

        const property = await Property.create({
            number: '0001',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })

        const local = await Local.create({

            contract: 'Test 0001',
            cust_of_center: '0001',
            city: 'Test City',
            state: 'Test State',
            country: 'Test country',
            is_active: true,
        })

        const response = await request(app)
                        .post('/api/v1/allocated/new')
                        .send({

                            description: 'New Test Allocated Property',
                            user: user.id,
                            property: property.id,
                            local: local.id
                        });

        expect(response.status).toBe(201);

    });

    it('Should not be able create new allocated with the same property', async () => {

        const user = await User.create({
            name: 'Register Name',
            email: 'registername@email.com',
            password: 'registerpwd'
        })

        const property = await Property.create({
            number: '0001',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })

        const local = await Local.create({

            contract: 'Test 0001',
            cust_of_center: '0001',
            city: 'Test City',
            state: 'Test State',
            country: 'Test country',
            is_active: true,
        })

        
        const allocated_property = await AllocatedProperty.create({

            description: 'New Test Allocated Property',
            user_id: user.id,
            property_id: property.id,
            local_id: local.id

        })
        
        
        const response = await request(app)
                        .post('/api/v1/allocated/new')
                        .send({
                            description: allocated_property.description,
                            user: allocated_property.user_id,
                            property: allocated_property.property_id,
                            local: allocated_property.local_id
                        });

        expect(response.status).toBe(400);

    });

    
    
    it('Should get Property Allocated by Number', async () => {

        const user = await User.create({
            name: 'Register Name',
            email: 'registername@email.com',
            password: 'registerpwd'
        })

        const property = await Property.create({
            number: '0001',
            brand: 'Test',
            model: 'Test Property',
            description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
            category: 'Test Category',
            is_avaliable: true,
        })

        const local = await Local.create({

            contract: 'Test 0001',
            cust_of_center: '0001',
            city: 'Test City',
            state: 'Test State',
            country: 'Test country',
            is_active: true,
        })

        
        const allocated_property = await AllocatedProperty.create({

            description: 'New Test Allocated Property',
            user_id: user.id,
            property_id: property.id,
            local_id: local.id

        })
        
        
        const response = await request(app)
                        .get(`/api/v1/allocated/property/${property.number}`)

        expect(response.status).toBe(200);

    });


    it('Should not get Property Allocated by Number', async () => {

        
        const response = await request(app)
                        .get(`/api/v1/allocated/property/800`)

        expect(response.status).toBe(404);

    });
    
    
 })