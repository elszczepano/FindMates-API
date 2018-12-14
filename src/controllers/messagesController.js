import Message from '../models/Message';
import Match from '../models/Match';

exports.getAll = (req, res) => {
    Message.find({})
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
            if(!item) return res.status(404).json({ message: "Messages not found."});
            return res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getOne = (req, res) => {
    Message.findById(req.params.id)
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
            if(!item) return res.status(404).json({ message: `Message with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.recipient) || req.user._id.equals(item.sender)) {
                res.status(200).json(item);
            }
            else {
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
};

exports.getResourcesOfUser = (req, res) => {
    Message.find({$or:
            [
                {'recipient': req.user._id},
                {'sender': req.user._id}
            ]})
        .then(item => {
            if(!item) return res.status(404).json({ message: `Resources of user ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.recipient) || req.user._id.equals(item.sender)) {
                res.status(200).json(item);
            }
            else {
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
};

exports.getResourcesOfMatch = (req, res) => {
    Message.find({'match': req.params.id})
        .then(item => {
            if(!item) return res.status(404).json({ message: `Resources of match ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.recipient) || req.user._id.equals(item.sender)) {
                res.status(200).json(item);
            }
            else {
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
};

exports.createNew = (req, res) => {
    Match.findById(req.body.match)
        .then(item => {
            if(!item) {
                res.status(404).json({
                    success: false,
                    message: `Match with ID ${req.body.match} not found.`
                })
            }
        });
    if(req.user._id.equals(req.body.recipient) || !req.user._id.equals(req.body.sender)) {
        res.status(403).json({
            success: false,
            message: 'Access denied. User not permitted.'
        });
    }
    const message = new Message(req.body);
    message.save()
        .then(item => res.status(201).json({
            success: true,
            message: "Message created successfully.",
            data: item
        }))
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.updateOne = (req, res) => {
    Message.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Message with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.sender)) {
                const message = Object.assign(item, req.body);
                message.save()
                    .then(item => res.status(200).json({
                        success: true,
                        message: "Message updated successfully.",
                        data: item
                    }));
            }
            else {
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
};

exports.deleteOne = (req, res) => {
    Message.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Message with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.sender)) {
                item.remove({_id: req.params.id});
                res.status(200).json({
                    success: true,
                    message: 'Match deleted successfully.'
                });
            }
            else {
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
};