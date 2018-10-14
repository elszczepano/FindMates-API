export default (req, res, next) => {
    const userId = req.user._id;
    const queryId = req.params.id;
    if(queryId == userId) next();
    else res.status(403).json({
        success: false,
        message: 'Access denied. User not permitted'
    });
}