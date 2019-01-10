import errorTicketsController from '../../../src/controllers/errorTicketsController';
import assert from 'assert';

describe('Test if error ticket methods exists', () => {
    it('getAll method should be defined', () => {
        assert(typeof errorTicketsController.getAll === 'function');
    });
    it('getOne method should be defined', () => {
        assert(typeof errorTicketsController.getOne === 'function');
    });
    it('getResourcesOfUser method should be defined', () => {
        assert(typeof errorTicketsController.getResourcesOfUser === 'function');
    });
    it('createNew method should be defined', () => {
        assert(typeof errorTicketsController.createNew === 'function');
    });
    it('deleteOne method should be defined', () => {
        assert(typeof errorTicketsController.deleteOne === 'function');
    });
});