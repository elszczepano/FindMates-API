import PendingMatch from '../models/PendingMatch';

exports.getAll = (req, res) => {
    PendingMatch.find({})
        .then(item => {
            if(!item) return res.status(404).json({ message: "Matches not found."});
            return res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getOne = (req, res) => {
    PendingMatch.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Pending match with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
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
    PendingMatch.find({$or:
            [
                {'user1Id': req.params.id},
                {'user2Id': req.params.id}
            ]})
        .then(item => {
            if(!item) return res.status(404).json({ message: `Resources of user ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
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
    const pendingMatch = new PendingMatch(req.body);
    pendingMatch.save()
        .then(item => res.status(201).json(item))
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.updateOne = (req, res) => {
    PendingMatch.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Pending match with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
                const pendingMatch = Object.assign(item, req.body);
                pendingMatch.save()
                    .then(item => res.status(200).json({
                        success: true,
                        message: "Match updated successfully.",
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
    PendingMatch.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Pending match with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
                item.remove({_id: req.params.id});
                res.status(200).json({
                    success: true,
                    message: 'Pending match deleted successfully.'
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