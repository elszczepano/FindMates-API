import matchesController from '../../../src/controllers/matchesController';
import assert from 'assert';

describe('Test if matches methods exists', () => {
    it('getAll method should be defined', () => {
        assert(typeof matchesController.getAll === 'function');
    });
    it('getOne method should be defined', () => {
        assert(typeof matchesController.getOne === 'function');
    });
    it('getResourcesOfUser method should be defined', () => {
        assert(typeof matchesController.getResourcesOfUser === 'function');
    });
    it('createNew method should be defined', () => {
        assert(typeof matchesController.createNew === 'function');
    });
    it('updateOne method should be defined', () => {
        assert(typeof matchesController.updateOne === 'function');
    });
    it('deleteOne method should be defined', () => {
        assert(typeof matchesController.deleteOne === 'function');
    });
});