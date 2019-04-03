function restricted(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: `Wrong user and/or password provided` });
    }
};

module.exports = restricted;


