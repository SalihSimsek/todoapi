const router = require('express').Router()

const TodoService = require('../services/todo-service')

const PageModel = require('../models/page-model')

const authMiddleware = require('../middlewares/auth-middleware')

router.use('/*', authMiddleware)

router.get('/:pageId', async (req, res) => {
    const page = req.params.pageId
    const todos = await TodoService.findAll(page)
    res.status(200).send(todos)
})

router.post('/:pageId', async (req, res) => {
    const pageId = req.params.pageId
    req.body.page = pageId
    req.body.owner = req.user._id

    //Check page exist
    const page = await PageModel.findOne({ _id: pageId, owner: req.user._id })
    if (!page) return res.status(400).send({ 'message': 'Page not found' })

    const createdTodo = await TodoService.add(req.body)
    await page.todos.push(createdTodo)
    page.save()

    res.status(200).send(createdTodo)
})

router.put('/:todoId', async (req, res) => {
    const todoId = req.params.todoId
    const updatedTodo = await TodoService.update(todoId, req.body)
    res.status(200).send(updatedTodo)
})

router.delete('/:todoId', async (req, res) => {
    const todoId = req.params.todoId
    const user = req.user._id
    const todo = await TodoService.find(todoId, user)
    const page = await PageModel.findOne({ _id: todo.page })
    page.todos.remove(todoId)
    page.save()
    await TodoService.delete(todoId, user)

    res.status(200).send({ 'message': 'Succesfully deleted' })
})

module.exports = router