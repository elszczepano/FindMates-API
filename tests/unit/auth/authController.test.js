import authController from '../../../src/controllers/authController';
import assert from 'assert';

describe('Test whether register and login are functions', () => {
    it('Login method should be defined', () => {
        assert(typeof authController.login === 'function');
    });
    it('Register method should be defined', () => {
        assert(typeof authController.register === 'function');
    });
});