import passport from 'passport';

export default (req, res, next) => {
    return passport.authenticate('jwt',{session: false}, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: info.message || 'Invalid token.'
            }
            );}
        req.user = user;
        next();
    })(req, res, next);
};