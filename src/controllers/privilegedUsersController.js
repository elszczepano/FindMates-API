import PrivilegedUser from '../models/PrivilegedUser';

export default {
    getAll(req, res) {
        const offset = parseInt(req.query.offset) || 0;
        const perPage = parseInt(req.query.perPage) || 10;
        return PrivilegedUser.find({}).skip(offset).limit(perPage)
            .populate({
                path: 'user',
                select: '-__v -salt -hash -createdAt -updatedAt'
            })
            .then(item => {
                if(!item.length || !item) return res.status(404).json({
                    success: false,
                    message: "Privileged users not found."
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
        return PrivilegedUser.findById(req.params.id)
            .populate({
                path: 'user',
                select: '-__v -salt -hash -createdAt -updatedAt'
            })
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Privileged user with ID ${req.params.id} not found.`
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
    getResourcesOfUser(req, res) {
        return PrivilegedUser.find({'user': req.params.id})
            .then(item => {
                if(!item.length || !item) {
                    return res.status(200).json({
                        success: true,
                        userId: req.params.id,
                        role: 'User'
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        data: item
                    });
                }
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    createNew(req, res) {
        const privilegedUser = new PrivilegedUser(req.body);
        return privilegedUser.save()
            .then(item =>  res.status(201).json({
                success: true,
                message: "Privileged user created successfully.",
                data: item
            }))
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    updateOne(req, res) {
        return PrivilegedUser.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(item => {
                if(!item) return res.status(404).json({
                    item: item,
                    success: false,
                    message: `Privileged user with ID ${req.params.id} not found.`
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
    deleteOne(req, res) {
        return PrivilegedUser.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Privileged user with ID ${req.params.id} not found.`
                });
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
    }
}