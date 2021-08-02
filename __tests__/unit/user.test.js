const { User } = require('../../backend/models');
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');


describe('User', () => {

    beforeEach( async () => {
        await truncate();
    })

    it('Should encrypt user password', async () => {

        const user = await User.create({
            name: 'Test Encrypt',
            email: 'encrypt_password@email.com',
            password: 'pwd123123'
        })

        const passwordCompare = await bcrypt.compare('pwd123123', user.password_hash);

        expect(passwordCompare).toBe(true);
    });



    
});