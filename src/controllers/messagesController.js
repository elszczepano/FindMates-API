import Message from '../models/Message';

exports.getAll = (req, res) => {
    Message.find({})
        .populate({
            path: 'recipientId',
            select: 'name profilePicture -_id'
        })
        .populate({
            path: 'senderId',
            select: 'name profilePicture -_id'
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
            path: 'recipientId',
            select: 'name profilePicture -_id'
        })
        .populate({
            path: 'senderId',
            select: 'name profilePicture -_id'
        })
        .then(item => {
            if(!item) return res.status(404).json({ message: `Message with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.recipientId) || req.user._id.equals(item.senderId)) {
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
                {'recipientId': req.user._id},
                {'senderId': req.user._id}
            ]})
        .then(item => {
            if(!item) return res.status(404).json({ message: `Resources of user ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.recipientId) || req.user._id.equals(item.senderId)) {
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
    Message.find({'matchId': req.params.id})
        .then(item => {
            if(!item) return res.status(404).json({ message: `Resources of match ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.recipientId) || req.user._id.equals(item.senderId)) {
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
            if(req.user._id.equals(item.senderId) || req.user._id.equals(item.recipientId)) {
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
            if(req.user._id.equals(item.recipientId) || req.user._id.equals(item.senderId)) {
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