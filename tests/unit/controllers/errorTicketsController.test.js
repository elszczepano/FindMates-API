import errorTicketController from '../../../src/controllers/errorTicketController';
import sinon from 'sinon';
import { expect } from 'chai';

let idStore= '';

describe('Test errorTicketsController getAll method', () => {
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
        errorTicketController.getAll(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getAll should return all records', done => {
        const req = {
            body: {
                user: '5c308c78ce1c640bdc493942',
                message: 'lorem ipsum'
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
        errorTicketController.createNew(req,res).then(() => {
            errorTicketController.getAll(req,res).then(() => {
                expect(res.json.firstCall.lastArg.success).to.equal(true);
                done();
            });
        });
    });
});

describe('Test errorTicketsController createNew method', () => {
    it('createNew should return new record', done => {
        const req = {
            body: {
                user: '5c308c78ce1c640bdc493942',
                message: 'lorem ipsum'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.createNew(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            idStore = res.json.firstCall.lastArg.data._id;
            done();
        });
    });
    it('createNew should return an 500 error', done => {
        const req = {
            body: {
                user: '',
                message: ''
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.createNew(req,res).then(() => {
            throw 'Emit an error!';
        }).catch(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
});

describe('Test errorTicketsController getResourcesOfUser method',() => {
    it('getResourcesOfUser should return an 404 error', done => {
        const req = {
            params: {
                id: ''
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.getResourcesOfUser(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getResourcesOfUser should return records of exact user', done => {
        const req = {
            params: {
                id: '5c308c78ce1c640bdc493942'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.getResourcesOfUser(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});

describe('Test errorTicketsController getOne method', () => {
    it('getOne should return an 404 error', done => {
        const req = {
            params: {
                id: ''
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.getOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getOne should return one record', done => {
        const req = {
            params: {
                id: idStore
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.getOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});

describe('Test errorTicketsController deleteOne method', () => {
    it('deleteOne should return an 404 error', done => {
        const req = {
            params: {
                id: '5c308c78ce1c640bdc493942'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.deleteOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('deleteOne should return an 500 error', done => {
        const req = {
            params: {
                id: '1'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.deleteOne(req,res).then(() => {
            throw 'Emit an error';
        }).catch(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('deleteOne should delete one record', done => {
        const req = {
            params: {
                id: idStore
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        errorTicketController.deleteOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});

