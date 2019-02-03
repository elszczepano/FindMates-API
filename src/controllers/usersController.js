import User from '../models/User';
import moment from 'moment';

export default {
    getAll(req, res) {
        const offset = parseInt(req.query.offset) || 0;
        const perPage = parseInt(req.query.perPage) || 3;
        return User.find({}).skip(offset).limit(perPage)
            .then(item => {
                if(!item.length || !item) return res.status(404).json({
                    success: false,
                    message: "Users not found."
                });
                res.status(200).json({
                    success: true,
                    data: item
                });
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    getOne(req, res) {
        return User.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `User with ID ${req.params.id} not found.`
                });
                res.status(200).json({
                    success: true,
                    data: item
                });
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    findNearby(req, res) {
        const offset = parseInt(req.query.offset) || 0;
        const perPage = parseInt(req.query.perPage) || 3;
        return User.aggregate().near({
            near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
            maxDistance: req.query.distance,
            spherical: true,
            distanceField: 'dist.calculated'
        })
            .match({
                gender: req.params.gender,
                $and: [
                    { birthDate: { $gte: moment().subtract(req.params.minAge, 'years') } },
                    { birthDate: { $lte: moment().subtract(req.params.maxAge, 'years') } }
                ]
            }).skip(offset).limit(perPage)
            .then(item => {
                if(!item.length || !item) return res.status(200).json({
                    success: true,
                    message: `There are no people nearby`
                });
                res.status(200).json({
                    success: true,
                    data: item
                });
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    updateOne(req, res) {
        return User.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `User with ID ${req.params.id} not found.`
                });
                res.status(200).json({
                    success: true,
                    data: item
                });
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    updateProfilePicture(req, res) {
        User.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `User with ID ${req.params.id} not found.`
                });
                const user = Object.assign(item, {profilePicture: req.file.path});
                return user.save()
                    .then(item => res.status(200).json({
                        success: true,
                        message: "User profile picture updated successfully.",
                        data: item
                    }));

            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    updateGallery(req, res) {
        const paths = req.files.map(file => file.path);
        User.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `User with ID ${req.params.id} not found.`
                });
                const user = Object.assign(item, {pictures: paths});
                return user.save()
                    .then(item => res.status(200).json({
                        success: true,
                        message: "User gallery updated successfully.",
                        data: item
                    }));

            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    deleteOne(req, res) {
        return User.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `User with ID ${req.params.id} not found.`
                });
                item.delete();
                res.status(200).json({
                    success: true,
                    message: 'User deleted successfully.'
                })
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    }
}