import User from '../models/User';

exports.getAll = (req, res) => {
    User.find({})
        .then(item => {
            if(!item) return res.status(404).json({ message: "Users not found."});
            return res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getOne = (req, res) => {
    User.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
            return res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.createNew = (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(item => res.status(201).json(item))
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.updateOne = (req, res) => {
    User.findOneAndUpdate({id: req.params.id}, req.body, {new: true})
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
            return res.status(200).json(item);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.deleteOne = (req, res) => {
    User.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `User with ID ${req.params.id} not found.`});
            item.remove();
            res.json({
                success: true,
                message: 'User successfully deleted.'
            })
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};