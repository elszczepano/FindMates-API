import User from '../models/User';

exports.getAll = (req, res) => {
    User.find({})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.getOne = (req, res) => {
    User.findById(req.params._id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.createNew = (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.updateOne = (req, res) => {
    User.findOneAndUpdate({_id: req.params._id}, req.body, {new: true})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));

};

exports.deleteOne = (req, res) => {
    User.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({
                success: true,
                message: 'User match successfully deleted'
        })))
        .catch(err => res.status(404).json({ success: false }));
};