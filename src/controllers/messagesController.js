import Message from '../models/Message';
import Match from "../models/Match";

exports.getAll = (req, res) => {
    Message.find({})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.getOne = (req, res) => {
    Message.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.getResourcesOfUser = (req, res) => {
    Match.find({$or:
            [
                {'recepientId': req.params.id},
                {'senderId': req.params.id}
            ]})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.createNew = (req, res) => {
    const newMessage = new Message(req.body);
    newMessage.save()
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.updateOne = (req, res) => {
    Message.findOneAndUpdate({id: req.params.id}, req.body, {new: true})
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
};

exports.deleteOne = (req, res) => {
    Message.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({
                success: true,
                message: 'Message match successfully deleted'
        })))
        .catch(err => res.status(404).json({ success: false }));
};