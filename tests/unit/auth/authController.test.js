import authController from '../../../src/controllers/authController';
import assert from 'assert';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Test whether register and login are methods', () => {
    it('Login method should be defined', () => {
        assert(typeof authController.login === 'function');
    });
    it('Register method should be defined', () => {
        assert(typeof authController.register === 'function');
    });
});

describe('Test login method', () => {
    it('Login method should return JWT', done => {
        process.env.JWT_SECRET = 'test';
        const user = {
            _id: '1'
        };
        const req = {
            user: user
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        
        authController.login(req,res).then(() => {
            expect(res.json.firstCall.lastArg.token).to.be.a('string');
            done();
        });
    });

});