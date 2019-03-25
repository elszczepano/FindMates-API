exports.notFound = (req, res, next) => {
	const err = new Error('404 - Resource not found.');
	err.status = 404;
	next(err);
};

exports.catchErrors = (err, req, res) => {
	res.status(err.status || 500);
	res.json({
		success: false,
		message: err.message
	});
};