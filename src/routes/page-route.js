const router = require('express').Router()

const PageService = require('../services/page-service')
const UserModel = require('../models/user-model')

const authMiddleware = require('../middlewares/auth-middleware')

router.use('/*', authMiddleware)

router.get('/', async (req, res) => {
    const user = req.user._id
    const pages = await PageService.findAll(user)
    res.status(200).send(pages)
})

router.get('/:id', async (req, res) => {
    const user = req.user._id
    const pageId = req.params.id

    const page = await PageService.find(pageId, user)

    page ? res.status(200).send(page) : res.status(404).send({ 'message': 'Page not found' })
})

router.post('/', async (req, res) => {
    const userId = req.user._id
    req.body.owner = userId
    const createdPage = await PageService.add(req.body)
    const user = await UserModel.findOne({ _id: userId })
    user.pages.push(createdPage._id)
    user.save()
    res.status(200).send(createdPage)
})

router.put('/:id', async (req, res) => {
    const user = req.user._id
    const pageId = req.params.id

    const updatedPage = await PageService.update(pageId, req.body)
    res.status(200).send(updatedPage)
})

router.delete('/:id', async (req, res) => {
    const userId = req.user._id
    const pageId = req.params.id
    const page = await PageService.delete(pageId, userId)
    const user = await UserModel.findOne({ _id: userId })
    user.pages.remove(pageId)
    user.save()
    res.status(200).send({ 'message': 'Successfuly deleted' })
})

module.exports = router