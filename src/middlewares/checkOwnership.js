export default (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;
    if(_id == id) next();
    else res.status(403).json({
        success: false,
        message: 'Access denied. User not permitted.'
    });
}