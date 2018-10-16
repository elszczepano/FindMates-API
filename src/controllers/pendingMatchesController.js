import PendingMatch from '../models/PendingMatch';
import Match from "../models/Match";

exports.getAll = (req, res) => {
    PendingMatch.find({})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.getOne = (req, res) => {
    PendingMatch.findById(req.params.id)
        .then(item => {
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
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
    PendingMatch.find({$or:
            [
                {'user1Id': req.params.id},
                {'user2Id': req.params.id}
            ]})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.createNew = (req, res) => {
    const newPendingMatch = new PendingMatch(req.body);
    newPendingMatch.save()
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.updateOne = (req, res) => {
    PendingMatch.findOneAndUpdate({id: req.params.id}, req.body, {new: true})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.deleteOne = (req, res) => {
    PendingMatch.findById(req.params.id)
        .then(item => {
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
                item.remove({_id: req.params.id});
                res.status(200).json({
                    success: true,
                    message: 'Pending match deleted successfully'
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