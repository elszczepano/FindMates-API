import messagesController from '../../../src/controllers/messagesController';
import assert from 'assert';

describe('Test if messages methods exists', () => {
    it('getAll method should be defined', () => {
        assert(typeof messagesController.getAll === 'function');
    });
    it('getOne method should be defined', () => {
        assert(typeof messagesController.getOne === 'function');
    });
    it('getResourcesOfUser method should be defined', () => {
        assert(typeof messagesController.getResourcesOfUser === 'function');
    });
    it('getResourcesOfMatch method should be defined', () => {
        assert(typeof messagesController.getResourcesOfMatch === 'function');
    });
    it('createNew method should be defined', () => {
        assert(typeof messagesController.createNew === 'function');
    });
    it('updateOne method should be defined', () => {
        assert(typeof messagesController.updateOne === 'function');
    });
    it('deleteOne method should be defined', () => {
        assert(typeof messagesController.deleteOne === 'function');
    });
});