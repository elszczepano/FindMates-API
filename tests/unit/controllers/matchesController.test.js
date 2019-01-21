import matchesController from '../../../src/controllers/matchesController';
import sinon from "sinon";
import {expect} from "chai";

describe('Test matchesController getAll method', () => {
    it('getAll should return an 404 error', done => {
        const req = {
            query: {
                offset: 0,
                perPage: 10
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        matchesController.getAll(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getAll should return all records', done => {
        const req = {
            body: {
                user1: '5c308c78ce1c640bdc493942',
                user2: '5c308c78ce1c640bdc493942'
            },
            query: {
                offset: 0,
                perPage: 10
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        matchesController.createNew(req,res).then(() => {
            matchesController.getAll(req,res).then(() => {
                expect(res.json.firstCall.lastArg.success).to.equal(true);
                done();
            });
        });
    });
});