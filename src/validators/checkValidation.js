import {validationResult} from 'express-validator/check';

exports.checkValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			data: req.body,
			errors: errors.mapped()
		});
	}
	next();
};
