import Match from '../models/Match';

export default  {
    getAll(req, res) {
        const offset = parseInt(req.query.offset) || 0;
        const perPage = parseInt(req.query.perPage) || 100;
        return Match.find({})
            .populate({
                path: 'user1',
                select: 'name profilePicture -_id'
            })
            .populate({
                path: 'user2',
                select: 'name profilePicture -_id'
            })
            .skip(offset).limit(perPage)
            .then(item => {
                if(!item.length || !item) return res.status(404).json({
                    success: false,
                    message: 'Matches not found.'
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
        return Match.findById(req.params.id)
            .populate({
                path: 'user1',
                select: 'name profilePicture _id'
            })
            .populate({
                path: 'user2',
                select: 'name profilePicture _id'
            })
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Match with ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._id)) {
                    res.status(200).json({
                        success: true,
                        data: item
                    });
                } else {
                    res.status(403).json({
                        success: false,
                        message: 'Access denied. User not permitted.'
                    });
                }
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    getResourcesOfUser(req, res) {
        return Match.find({$or:
                [
                    {'user1': req.params.id},
                    {'user2': req.params.id}
                ]})
            .then(item => {
                if(!item.length || !item) return res.status(404).json({
                    success: false,
                    message: `Resources of user ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._id)) {
                    res.status(200).json(item);
                } else {
                    res.status(403).json({
                        success: false,
                        message: 'Access denied. User not permitted.'
                    });
                }
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    createNew(req, res) {
        const newMatch = new Match(req.body);
        return newMatch.save()
            .then(item => res.status(201).json({
                success: true,
                message: 'Match created successfully.',
                data: item
            }))
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    updateOne(req, res) {
        return Match.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Match with ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._id)) {
                    const match = Object.assign(item, req.body);
                    match.save()
                        .then(item => res.status(200).json({
                            success: true,
                            message: 'Match updated successfully.',
                            data: item
                        }));
                } else {
                    res.status(403).json({
                        success: false,
                        message: 'Access denied. User not permitted.'
                    });
                }
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    deleteOne(req, res) {
        return Match.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Match with ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._id)) {
                    item.delete({_id: req.params.id});
                    res.status(200).json({
                        success: true,
                        message: 'Message deleted successfully.'
                    });
                } else {
                    res.status(403).json({
                        success: false,
                        message: 'Access denied. User not permitted.'
                    });
                }
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    }
};