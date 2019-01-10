import privilegedUsers from '../../../src/controllers/privilegedUsersController';
import assert from 'assert';

describe('Test if privileged users methods exists', () => {
    it('getAll method should be defined', () => {
        assert(typeof privilegedUsers.getAll === 'function');
    });
    it('getOne method should be defined', () => {
        assert(typeof privilegedUsers.getOne === 'function');
    });
    it('getResourcesOfUser method should be defined', () => {
        assert(typeof privilegedUsers.getResourcesOfUser === 'function');
    });
    it('updateOne method should be defined', () => {
        assert(typeof privilegedUsers.updateOne === 'function');
    });
    it('deleteOne method should be defined', () => {
        assert(typeof privilegedUsers.deleteOne === 'function');
    });
});