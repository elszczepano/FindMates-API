import User from '../models/User';
import moment from 'moment';

export default (req, res, next) => {
    User.findById(req.user._id).select('+blocked +blockedTo')
        .then(item => {
            if(!item.blocked) next();
            else {
                if(moment(item.blockedTo).isBefore(moment())) {
                    const user = Object.assign(item, {blockedTo: null, blocked: false});
                    user.save();
                    next();
                }
                else {
                    res.status(403).json({
                        success: false,
                        message: `Access denied. User blocked to ${item.blockedTo}.`,
                        blockedTo: item.blockedTo
                    });
                }
            }
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};