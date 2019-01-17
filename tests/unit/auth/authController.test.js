import authController from '../../../src/controllers/authController';
import { expect } from 'chai';
import sinon from 'sinon';

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

describe('Test register method', () => {
    it('Register method should create new user', done => {

    });
    it('Register method should emit an error', done => {

    });
});