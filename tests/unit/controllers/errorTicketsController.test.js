import errorTicketsController from '../../../src/controllers/errorTicketsController';
import mongoose from "mongoose";
import sinon from "sinon";
import {expect} from "chai";



describe('Test method getAll', () => {
    it('getAll should return all records', (done) => {
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
        errorTicketsController.getAll(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});