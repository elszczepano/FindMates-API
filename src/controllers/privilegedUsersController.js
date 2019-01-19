import PrivilegedUser from '../models/PrivilegedUser';

exports.getAll = (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const perPage = parseInt(req.query.perPage) || 10;
    PrivilegedUser.find({}).skip(offset).limit(perPage)
        .populate({
            path: 'user',
            select: '-__v -salt -hash -createdAt -updatedAt'
        })
        .then(item => {
            if(!item) return res.status(404).json({ message: "Privileged users not found."});
            return res.status(200).json({
                success: true,
                data: item
            });
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
            return res.status(200).json({
                success: true,
                data: item
            });
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
                return res.status(200).json({
                    success: true,
                    data: item
                });
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
            return res.status(200).json({
                success: true,
                data: item
            });
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