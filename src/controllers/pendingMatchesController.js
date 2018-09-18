import PendingMatch from '../models/PendingMatch';

exports.getAll = (req, res) => {
    PendingMatch.find({}, (err, pendingMatch) => {
        if(err) res.send(err);
        res.json(pendingMatch);
    });
};

exports.getOne = (req, res) => {
    PendingMatch.findById(req.params._id, (err, pendingMatch) => {
        if(err) res.send(err);
        res.json(pendingMatch);
    });
};

exports.createNew = (req, res) => {
    const newPendingMatch = new PendingMatch(req.body);
    newPendingMatch.save((err, pendingMatch) => {
        if(err) res.send(err);
        res.json(pendingMatch);
    });
};

exports.updateOne = (req, res) => {
    PendingMatch.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, pendingMatch) => {
        if(err) res.send(err);
        res.json(pendingMatch);
    });
};

exports.deleteOne = (req, res) => {
    PendingMatch.remove({_id: req.params._id}, (err, pendingMatch) => {
        if(err) res.send(err);
        res.json({ message: 'Match successfully deleted' });
    });
};