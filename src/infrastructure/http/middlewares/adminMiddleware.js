const adminMiddleware = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated"})
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Admins only."})
        }

        return next()
    } catch (error) {
        return res.status(403).json({ error: "Authorization failed"})
    }
}

module.exports = adminMiddleware