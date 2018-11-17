import Match from '../models/Match';

exports.getAll = (req, res) => {
    Match.find({})
        .populate({
            path: 'user1Id',
            select: 'name profilePicture -_id'
        })
        .populate({
            path: 'user2Id',
            select: 'name profilePicture -_id'
        })
        .populate({
            path: 'matchId'
        })
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
    Match.findById(req.params.id)
        .populate({
            path: 'user1Id',
            select: 'name profilePicture -_id'
        })
        .populate({
            path: 'user2Id',
            select: 'name profilePicture -_id'
        })
        .then(item => {
            if(!item) return res.status(404).json({ message: `Match with ID ${req.params.id} not found.`});
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
    Match.find({$or:
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
    const newMatch = new Match(req.body);
    newMatch.save()
        .then(item => res.status(201).json({
            success: true,
            message: "Match created successfully.",
            data: item
        }))
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.updateOne = (req, res) => {
    Match.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Match with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
                const match = Object.assign(item, req.body);
                match.save()
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
    Match.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Match with ID ${req.params.id} not found.`});
            if(req.user._id.equals(item.user1Id) || req.user._id.equals(item.user2Id)) {
                item.remove({_id: req.params.id});
                res.status(200).json({
                    success: true,
                    message: 'Message deleted successfully.'
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