import Message from '../models/Message';

exports.getAll = (req, res) => {
    Message.find({}, (err, message) => {
        if(err) res.send(err);
        res.json(message);
    });
};

exports.getOne = (req, res) => {
    Message.findById(req.params._id, (err, message) => {
        if(err) res.send(err);
        res.json(message);
    });
};

exports.createNew = (req, res) => {
    const newMessage = new Message(req.body);
    newMessage.save((err, message) => {
        if(err) res.send(err);
        res.json(message);
    });
};

exports.updateOne = (req, res) => {
    Message.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, message) => {
        if(err) res.send(err);
        res.json(message);
    });
};

exports.deleteOne = (req, res) => {
    Message.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({
            success: true,
            message: 'Message match successfully deleted'
        })))
        .catch(err => res.status(404).json({ success: false }));
};