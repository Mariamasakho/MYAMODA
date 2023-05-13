module.exports = (req,res,next) => {
    if (!req.essentials.isAuthenticated) return res.redirect("/login");
    next()
}