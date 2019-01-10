import usersController from '../../../src/controllers/usersController';
import assert from 'assert';

describe('Test if user methods exists', () => {
    it('getAll method should be defined', () => {
        assert(typeof usersController.getAll === 'function');
    });
    it('getOne method should be defined', () => {
        assert(typeof usersController.getOne === 'function');
    });
    it('findNearby method should be defined', () => {
        assert(typeof usersController.findNearby === 'function');
    });
    it('updateOne method should be defined', () => {
        assert(typeof usersController.updateOne === 'function');
    });
    it('updateProfilePicture method should be defined', () => {
        assert(typeof usersController.updateProfilePicture === 'function');
    });
    it('updateGallery method should be defined', () => {
        assert(typeof usersController.updateGallery === 'function');
    });
    it('deleteOne method should be defined', () => {
        assert(typeof usersController.deleteOne === 'function');
    });
});