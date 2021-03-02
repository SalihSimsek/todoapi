const BaseService = require('./base-service')
const UserModel = require('../models/user-model')

class UserService extends BaseService{
    model = UserModel

    async find(object){
        return this.model.findOne(object)
    }

    async checkEmailExist(email){
        return this.model.findOne({email:email})
    }

    async checkUsernameExist(username){
        return this.model.findOne({username:username})
    }
}

module.exports = new UserService()