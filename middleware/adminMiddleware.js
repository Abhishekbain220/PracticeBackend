let User = require("../model/userSchema")
let jwt = require("jsonwebtoken")

exports.authenticateAdmin = async (req, res, next) => {
    try {
        let token = req.cookies.token
        if (!token) return res.status(401).json({ message: "Unauthorised" })
        let decoded = jwt.verify(token, process.env.KEY)
        let user = await User.findById(decoded.id)
        if (!user) return res.status(401).json({ message: "User not found" })
        req.user = user
    if(!req.user || !req.user.isAdmin)return res.status(401).json({message:"Only Admin Can Access"})
        
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}