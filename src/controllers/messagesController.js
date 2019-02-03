import Message from '../models/Message';
import Match from '../models/Match';

export default {
    getAll(req, res) {
        const offset = parseInt(req.query.offset) || 0;
        const perPage = parseInt(req.query.perPage) || 100;
        return Message.find({})
            .populate({
                path: 'recipient',
                select: 'name profilePicture -_id'
            })
            .populate({
                path: 'sender',
                select: 'name profilePicture -_id'
            })
            .populate({
                path: 'match'
            })
            .skip(offset).limit(perPage)
            .then(item => {
                if(!item.length || !item) return res.status(404).json({
                    success: false,
                    message: 'Messages not found.'
                });
                return res.status(200).json({
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
        return Message.findById(req.params.id)
            .populate({
                path: 'recipient',
                select: 'name profilePicture -_id'
            })
            .populate({
                path: 'sender',
                select: 'name profilePicture -_id'
            })
            .populate({
                path: 'match'
            })
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Message with ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.recipient._id) || req.user._id.equals(item.sender._id)) {
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
        return Message.find({$or:
                [
                    {'recipient': req.user._id},
                    {'sender': req.user._id}
                ]})
            .then(item => {
                if(!item.length || !item) return res.status(404).json({
                    success: false,
                    message: `Resources of user ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.recipient._id) || req.user._id.equals(item.sender_id)) {
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
    getResourcesOfMatch(req, res) {
        return Message.find({'match': req.params.id})
            .then(item => {
                if(!item.length || !item) return res.status(404).json({
                    success: false,
                    message: `Resources of match ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.recipient._id) || req.user._id.equals(item.sender._id)) {
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
    createNew(req, res) {
        Match.findById(req.body.match)
            .then(item => {
                if(!item) {
                    return res.status(404).json({
                        success: false,
                        message: `Match with ID ${req.body.match} not found.`
                    });
                }
                if(!req.user._id.equals(item.user1._id) || !req.user._id.equals(item.user2._id)) {
                    return res.status(403).json({
                        success: false,
                        message: 'Invalid match. User not permitted.'
                    });
                }
            });
        if(req.user._id.equals(req.body.recipient) || !req.user._id.equals(req.body.sender)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. User not permitted.'
            });
        }
        const message = new Message(req.body);
        return message.save()
            .then(item => res.status(201).json({
                success: true,
                message: 'Message created successfully.',
                data: item
            }))
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    updateOne(req, res) {
        return Message.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Message with ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.sender._id)) {
                    const message = Object.assign(item, req.body);
                    message.save()
                        .then(item => res.status(200).json({
                            success: true,
                            message: 'Message updated successfully.',
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
        return Message.findById(req.params.id)
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Message with ID ${req.params.id} not found.`
                });
                if(req.user._id.equals(item.sender._id)) {
                    item.delete({_id: req.params.id});
                    res.status(200).json({
                        success: true,
                        message: 'Match deleted successfully.'
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