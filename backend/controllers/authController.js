const User = require.main.require('./models/User')

module.exports = {
    authenticate: async (req,res) => {
        let result = await User.authenticate(req.body.email, req.body.password)
        if(result.error){
            res.status(403).json({
                error: result.message
            })
        }else{
            res.json({
                token: result.token,
                user: result.userData
            })
        }
    },

    register: async (req,res) => {
        let user = await User.create(req.body)
        if(user.error){
            res.status(400)
            .json({
                errors: user.messages
            })
        }else{
            res.status(200)
            .json({
                message: "User registered!"
            })
        }
    },

    getUserData: async(req, res) => {
        // Delete password from user
        delete req.user.password
        // Return result
        if(req.user){
            // Return 200 OK code and the payment details
            res.status(200)
            .json({
                "user": req.user
            })
        } else {
            // Return 403 error code
            res.status(403).json({
                error: "Could not get user data"
            })
        }
    }
}