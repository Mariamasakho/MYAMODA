module.exports = (req,res,next) => {
    if(!req.session.user){
        return res.render('admin/login',{error:"Please login to your account!"})
    }
    
    next()

}