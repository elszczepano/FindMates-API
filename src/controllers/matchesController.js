import Match from '../models/Match';

exports.getAll = (req, res) => {
    Match.find({}, (err, match) => {
        if(err) res.send(err);
        res.json(match);
    });
};

exports.getOne = (req, res) => {
    Match.findById(req.params._id, (err, match) => {
        if(err) res.send(err);
        res.json(match);
    });
};

exports.createNew = (req, res) => {
    const newMatch = new Match(req.body);
    newMatch.save((err, match) => {
        if(err) res.send(err);
        res.json(match);
    });
};

exports.updateOne = (req, res) => {
    Match.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, match) => {
        if(err) res.send(err);
        res.json(match);
    });
};

exports.deleteOne = (req, res) => {
    Match.remove({_id: req.params._id}, (err, match) => {
        if(err) res.send(err);
        res.json({ message: 'Match successfully deleted' });
    });
};