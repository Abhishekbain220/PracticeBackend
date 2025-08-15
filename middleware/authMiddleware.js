let User = require("../model/userSchema")
let jwt = require("jsonwebtoken")

exports.authenticateUser = async (req, res, next) => {
    try {
        let token = req.cookies.token
        if (!token) return res.status(401).json({ message: "Unauthorised" })
            console.log(token)
        let decoded = jwt.verify(token, process.env.KEY)
        console.log(decoded)
        let user = await User.findById(decoded.id)
        if (!user) return res.status(401).json({ message: "User not found" })
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}