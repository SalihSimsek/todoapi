const UserService = require('../services/user-service')
const bcrypt = require('bcryptjs')

const loginValidation = async(req,res,next) => {
    const user = await UserService.checkUsernameExist(req.body.username)

    if(!user)
        res.status(400).send({'message':'Email or username not exist'})

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send({'message':'Wrong password'})
    
    next()
}

module.exports = loginValidation