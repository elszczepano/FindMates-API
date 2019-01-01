import authController from '../../src/controllers/authController';
import assert from 'assert';

describe('Test whether register and login are functions', () => {
    it('Login function should be defined', () => {
        assert(typeof authController.login === 'function');
    });
    it('Register function should be defined', () => {
        assert(typeof authController.register === 'function');
    });
});