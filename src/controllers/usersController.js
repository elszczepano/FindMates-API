import User from '../models/User';

exports.getAll = (req, res) => {
    User.find({})
        .then(item => {
            if(!item) return res.status(404).json({ message: "Users not found."});
            res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getOne = (req, res) => {
    User.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
            res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.findNearby = (req, res) => {
    User.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: req.query.distance,
        spherical: true,
        distanceField: 'dist.calculated'
        })
        .then(item => {
            if(!item) return res.status(404).json({ message: `There are no people nearby`});
            res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.updateOne = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
            res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.updateProfilePicture = (req, res) => {
    User.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
                const user = Object.assign(item, {profilePicture: req.file.path});
                user.save()
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
};

exports.updateGallery = (req, res) => {
    const paths = req.files.map(file => file.path);
    User.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
            const user = Object.assign(item, {pictures: paths});
            user.save()
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
};

exports.deleteOne = (req, res) => {
    User.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
            item.remove();
            res.json({
                success: true,
                message: 'User deleted successfully.'
            })
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};