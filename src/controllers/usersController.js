import User from '../models/User';

exports.getAll = (req, res) => {
    User.find({}, (err, user) => {
        if(err) res.send(err);
        res.json(user);
    });
};

exports.getOne = (req, res) => {
    User.findById(req.params._id, (err, user) => {
        if(err) res.send(err);
        res.json(user);
    });
};

exports.createNew = (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if(err) res.send(err);
        res.json(user);
    });
};

exports.updateOne = (req, res) => {
    User.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, user) => {
        if(err) res.send(err);
        res.json(user);
    });
};

exports.deleteOne = (req, res) => {
    User.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({
            success: true,
            message: 'User match successfully deleted'
        })))
        .catch(err => res.status(404).json({ success: false }));
};