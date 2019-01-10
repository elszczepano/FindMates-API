import pendingMatchesController from '../../../src/controllers/pendingMatchesController';
import assert from 'assert';

describe('Test if pending matches methods exists', () => {
    it('getAll method should be defined', () => {
        assert(typeof pendingMatchesController.getAll === 'function');
    });
    it('getOne method should be defined', () => {
        assert(typeof pendingMatchesController.getOne === 'function');
    });
    it('getResourcesOfUser method should be defined', () => {
        assert(typeof pendingMatchesController.getResourcesOfUser === 'function');
    });
    it('createNew method should be defined', () => {
        assert(typeof pendingMatchesController.createNew === 'function');
    });
    it('updateOne method should be defined', () => {
        assert(typeof pendingMatchesController.updateOne === 'function');
    });
    it('deleteOne method should be defined', () => {
        assert(typeof pendingMatchesController.deleteOne === 'function');
    });
});