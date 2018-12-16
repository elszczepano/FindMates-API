import PrivilegedUser from '../models/PrivilegedUser';

exports.getAll = (req, res) => {
    PrivilegedUser.find({})
        .populate({
            path: 'user',
            select: '-__v -salt -hash -createdAt -updatedAt'
        })
        .then(item => {
            if(!item) return res.status(404).json({ message: "Privileged users not found."});
            return res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getOne = (req, res) => {
    PrivilegedUser.findById(req.params.id)
        .populate({
            path: 'user',
            select: '-__v -salt -hash -createdAt -updatedAt'
        })
        .then(item => {
            if(!item) return res.status(404).json({ message: `Privileged user with ID ${req.params.id} not found.`});
            res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getResourcesOfUser = (req, res) => {
    PrivilegedUser.find({'user': req.params.id})
        .then(item => {
            if(!item) return res.status(200).json({
                userId: req.params.id,
                role: 'User'
            });
            else {
                res.status(200).json(item);
            }
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.updateOne = (req, res) => {
    PrivilegedUser.findOneAndUpdate({id: req.params.id}, req.body, {new: true})
        .then(item => {
            if(!item) return res.status(404).json({ message: `Privileged user with ID ${req.params.id} not found.`});
            res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.deleteOne = (req, res) => {
    PrivilegedUser.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Privileged user with ID ${req.params.id} not found.`});
            item.remove();
            res.status(200).json({
                success: true,
                message: 'Privileged user deleted successfully.'
            })
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};