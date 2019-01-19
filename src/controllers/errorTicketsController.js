import ErrorTicket from '../models/ErrorTicket';

exports.getAll = (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const perPage = parseInt(req.query.perPage) || 10;
    ErrorTicket.find({})
        .populate({
            path: 'user',
            select: '-__v -salt -hash -createdAt -updatedAt'
        })
        .skip(offset).limit(perPage)
        .then(item => {
            if(!item) return res.status(404).json({ message: "Error tickets not found."});
            return res.status(200).json({
                success: true,
                data: item
            });
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getOne = (req, res) => {
    ErrorTicket.findById(req.params.id)
        .populate({
            path: 'user',
            select: '-__v -salt -hash -createdAt -updatedAt'
        })
        .then(item => {
            if(!item) return res.status(404).json({ message: `Error ticket with ID ${req.params.id} not found.`});
            return res.status(200).json({
                success: true,
                data: item
            });
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.getResourcesOfUser = (req, res) => {
    ErrorTicket.find({'user': req.params.id})
        .then(item => {
            if(!item) return res.status(404).json({ message: `Error ticket with user ID ${req.params.id} not found.`});
            return res.status(200).json({
                success: true,
                data: item
            });
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.createNew = (req, res) => {
    const errorTicket = new ErrorTicket(req.body);
    errorTicket.save()
        .then(item => res.status(201).json({
            success: true,
            message: "Error ticket created successfully.",
            data: item
        }))
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.deleteOne = (req, res) => {
    ErrorTicket.findById(req.params.id)
        .then(item => {
            if(!item) return res.status(404).json({ message: `Error ticket with ID ${req.params.id} not found.`});
            item.remove();
            res.json({
                success: true,
                message: 'Error ticket deleted successfully.'
            })
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};