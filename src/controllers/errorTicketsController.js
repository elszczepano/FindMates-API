import ErrorTicket from '../models/ErrorTicket';

export default {
    getAll(req, res) {
        const offset = parseInt(req.query.offset) || 0;
        const perPage = parseInt(req.query.perPage) || 10;
        return ErrorTicket.find({})
            .populate({
                path: 'user',
                select: '-__v -salt -hash -createdAt -updatedAt'
            })
            .skip(offset).limit(perPage)
            .then(item => {
                if(!item.length) return res.status(404).json({
                    success: false,
                    message: "Error tickets not found."
                });
                res.status(200).json({
                    success: true,
                    data: item
                });
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    getOne(req, res) {
        return ErrorTicket.findById(req.params.id)
            .populate({
                path: 'user',
                select: '-__v -salt -hash -createdAt -updatedAt'
            })
            .then(item => {
                if(!item) return res.status(404).json({
                    success: false,
                    message: `Error ticket with ID ${req.params.id} not found.`
                });
                res.status(200).json({
                    success: true,
                    data: item
                });
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    getResourcesOfUser(req, res) {
        return ErrorTicket.find({'user': req.params.id})
            .then(item => {
                if (!item.length) return res.status(404).json({
                    success: false,
                    message: `Error ticket with user ID ${req.params.id} not found.`
                });
                res.status(200).json({
                    success: true,
                    data: item
                });
            })
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    createNew(req, res) {
        const errorTicket = new ErrorTicket(req.body);
        return errorTicket.save()
            .then(item =>  res.status(201).json({
                success: true,
                message: "Error ticket created successfully.",
                data: item
            }))
            .catch(err => res.status(500).json({
                success: false,
                message: err
            }));
    },
    deleteOne(req, res)  {
        return ErrorTicket.findById(req.params.id)
            .then(item => {
                if(!item.length) return res.status(404).json({
                    success: false,
                    message: `Error ticket with ID ${req.params.id} not found.`
                });
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
    }
}