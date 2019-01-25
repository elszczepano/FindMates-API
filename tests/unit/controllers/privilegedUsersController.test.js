import privilegedUsersController from '../../../src/controllers/privilegedUsersController';
import sinon from "sinon";
import {expect} from "chai";

let idStore= '';

describe('Test privilegedUsersController getAll method', () => {
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
        privilegedUsersController.getAll(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getAll should return all records', done => {
        const req = {
            body: {
                user: '5c308c78ce1c640bdc493943',
                role: 'Administrator'
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
        privilegedUsersController.createNew(req,res).then(() => {
            privilegedUsersController.getAll(req,res).then(() => {
                expect(res.json.firstCall.lastArg.success).to.equal(true);
                done();
            });
        });
    });
});

describe('Test privilegedUsersController createNew method', () => {
    it('createNew should return new record', done => {
        const req = {
            body: {
                user: '5c308c78ce1c640bdc493943',
                role: 'Administrator'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.createNew(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            idStore = res.json.firstCall.lastArg.data._id;
            done();
        });
    });
    it('createNew should return an 500 error', done => {
        const req = {
            body: {
                user: '',
                role: ''
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.createNew(req,res).then(() => {
            throw "Emit an error!";
        }).catch(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
});

describe('Test privilegedUsersController getResourcesOfUser method',() => {
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
        privilegedUsersController.getResourcesOfUser(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getResourcesOfUser should return records of exact user', done => {
        const req = {
            params: {
                id: '5c308c78ce1c640bdc493943'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.getResourcesOfUser(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
    it('getResourcesOfUser should return default user role', done => {
        const req = {
            params: {
                id: '5c308c78ce1c640bdc493945'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.getResourcesOfUser(req,res).then(() => {
            expect(res.json.firstCall.lastArg.role).to.equal("User");
            done();
        });
    });
});

describe('Test privilegedUsersController getOne method', () => {
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
        privilegedUsersController.getOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('getOne should return one records', done => {
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
        privilegedUsersController.getOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});

describe('Test privilegedUsersController updateOne method', () => {
    it('updateOne should return an 404 error', done => {
        const req = {
            params: {
                id: '5c308c78ce1c640bdc493943'
            },
            body: {
                role: 'User'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.updateOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('updateOne should return an 500 error', done => {
        const req = {
            params: {
                id: "1"
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.updateOne(req,res).then(() => {
            throw "Emit an error";
        }).catch(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('updateOne should update one records', done => {
        const req = {
            params: {
                id: idStore
            },
            body: {
                role: 'User'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.updateOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});

describe('Test privilegedUsersController deleteOne method', () => {
    it('deleteOne should return an 404 error', done => {
        const req = {
            params: {
                id: '5c308c78ce1c640bdc493943'
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.deleteOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('deleteOne should return an 500 error', done => {
        const req = {
            params: {
                id: "1"
            }
        };
        const res = {
            status: function () {
                return this;
            },
            json: sinon.spy()
        };
        privilegedUsersController.deleteOne(req,res).then(() => {
            throw "Emit an error";
        }).catch(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(false);
            done();
        });
    });
    it('deleteOne should delete one records', done => {
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
        privilegedUsersController.deleteOne(req,res).then(() => {
            expect(res.json.firstCall.lastArg.success).to.equal(true);
            done();
        });
    });
});

