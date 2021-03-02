const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const UserService = require('../services/user-service')

const { registerValidation, checkEmailAndUsername } = require('../middlewares/register-validation')
const loginValidation = require('../middlewares/login-validation')

const authMiddleware = require('../middlewares/auth-middleware')

router.post('/register', checkEmailAndUsername, async (req, res) => {
    //Validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Change user's password to hashedPassword
    const user = req.body
    user.password = hashedPassword

    //Create user
    const createdUser = await UserService.add(user)
    res.status(200).send(createdUser)
})

router.post('/login', loginValidation, async (req, res) => {
    const user = await UserService.find({ username: req.body.username })
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.status(200).send({ 'token': token, 'id': user._id })
})

router.post('/change-password', authMiddleware, async (req, res) => {
    const user = await UserService.find({ _id: req.user._id })

    if (req.body.password !== req.body.c_password)
        return res.status(400).send({ 'message': 'This two field should be same' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    user.password = hashedPassword
    const updatedUser = await UserService.add(user)
    res.status(200).send({ 'message': 'Password succesfully changed' })

})

const transporter = nodemailer.createTransport({
    post: 465,
    host: "smtp.gmail.com",
    auth:{
        user:process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    secure: true
})

router.post('/reset-password', async (req, res) => {
    const user = await UserService.find({ email: req.body.email })
    if(!user) return res.status(400).send({'message':'User not exist'})
    const newPassword = randomPass()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    await UserService.update(user._id,user)

    const to = req.body.email
    const mailData = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Password reset',
        text:`${newPassword}`,
        html: `<b>Hey there!</b><br>${newPassword}</br>`
    }
    transporter.sendMail(mailData,(error,info)=>{
        if(error) return console.log(error)
        res.status(200).send({message: 'Mail send', message_id: info.messageId})
    })
})

const randomPass = () => {
    return 'asdfghjk'
}

module.exports = router