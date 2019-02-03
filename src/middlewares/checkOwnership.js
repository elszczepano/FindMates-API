export default (req, res, next) => {
    if(req.user._id.equals(req.params.id)) next();
    else res.status(403).json({
        success: false,
        message: 'Access denied. User not permitted.'
    });
};