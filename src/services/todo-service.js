const BaseService = require('./base-service')
const TodoModel = require('../models/todo-model')

class TodoService extends BaseService{
    model = TodoModel

    async findAll(id){
        return this.model.find({page:id})
    }
}

module.exports = new TodoService()