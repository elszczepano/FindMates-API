import authController from '../../src/controllers/authController';

describe('Test whether register and login are functions', () => {
    it('Login function should be defined', () => {
        console.assert(typeof authController.login === 'function');
    });
    it('Register function should be defined', () => {
        console.assert(typeof authController.register === 'function');
    });
});