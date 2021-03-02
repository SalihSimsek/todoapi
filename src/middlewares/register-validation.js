const Joi = require('joi')
const UserService = require('../services/user-service')

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        c_password: Joi.string().valid(Joi.ref('password')).required()
    })
    return schema.validate(data)
}

const checkEmailAndUsername = async(req,res,next) =>{
    const emailExist = await UserService.checkEmailExist(req.body.email)
    if (emailExist) return res.status(400).send({ 'message': 'Email already exist' })

    const usernameExist = await UserService.checkUsernameExist(req.body.username)
    if(usernameExist) return res.status(400).send({'message':'Username already exist'})

    next()
}

module.exports = {registerValidation,checkEmailAndUsername}