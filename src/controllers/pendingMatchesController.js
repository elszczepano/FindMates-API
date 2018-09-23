import PendingMatch from '../models/PendingMatch';

exports.getAll = (req, res) => {
    PendingMatch.find({})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.getOne = (req, res) => {
    PendingMatch.findById(req.params.id)
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
        .then(item => item.remove()
            .then(() => res.json({
                success: true,
                message: 'Pending match successfully deleted'
        })))
        .catch(err => res.status(404).json({ success: false }));
};