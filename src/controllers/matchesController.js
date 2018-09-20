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
    Match.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({
            success: true,
            message: 'Match successfully deleted'
        })))
        .catch(err => res.status(404).json({ success: false }));
};