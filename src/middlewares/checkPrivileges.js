import PrivilegedUser from '../models/PrivilegedUser';

export default (req, res, next) => {
	PrivilegedUser.find({'user': req.params.id})
		.then(item => {
			if (item.role === 'Administrator') next();
			else {
				res.status(403).json({
					success: false,
					message: 'Access denied. User not permitted.'
				});
			}
		})
		.catch(err => res.status(500).json({
			success: false,
			message: err
		}));
};
