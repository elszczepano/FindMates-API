import Message from '../models/Message';

exports.getAll = (req, res) => {
    Message.find({})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.getOne = (req, res) => {
    Message.findById(req.params.id)
        .then(item => {
            if(req.user._id.equals(item.recepientId) || req.user._id.equals(item.senderId)) {
                res.status(200).json(item);
            }
            else {
                res.status(403).json({
                    success: false,
                    message: 'Access denied. User not permitted'
                });
            }
        })
        .catch(err => res.status(404).json({ success: false }));
};

exports.getResourcesOfUser = (req, res) => {
    Message.find({$or:
            [
                {'recepientId': req.user._id},
                {'senderId': req.user._id}
            ]})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.getResourcesOfMatch = (req, res) => {
    Message.find({'matchId': req.params.id})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.createNew = (req, res) => {
    const newMessage = new Message(req.body);
    newMessage.save()
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.updateOne = (req, res) => {
    Message.findOneAndUpdate({id: req.params.id}, req.body, {new: true})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.deleteOne = (req, res) => {
    Message.findById(req.params.id)
        .then(item => {
            if(req.user._id.equals(item.recepientId) || req.user._id.equals(item.senderId)) {
                item.remove({_id: req.params.id});
                res.status(200).json({
                    success: true,
                    message: 'Match deleted successfully'
                });
            }
            else {
                res.status(403).json({
                    success: false,
                    message: 'Access denied. User not permitted'
                });
            }
        })
        .catch(err => res.status(404).json({ success: false }));
};