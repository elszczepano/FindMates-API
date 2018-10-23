import passport from 'passport';

export default (req, res, next) => {
    return passport.authenticate('local',{session: false}, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: info.message || 'An error occurred.'
            })
        }
        next();
    })(req, res, next);
}