import authController from '../../../src/controllers/authController';
import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';

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
        const req = {
            file: {
                path: '/'
            },
            body: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                gender: "Male",
                birthDate: faker.date.past(),
                purpose: "Friends",
                password: "Secret",
                geometry: {
                    coordinates: [21.37, 12.04]
                }
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        authController.register(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
    it('Register method should emit an error', done => {
        const req = {
            body: {}
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        authController.register(req,res).then(() => {
            expect(res.json.firstCall.lastArg.message).to.equal("No username was given");
            done();
        });
    });
});