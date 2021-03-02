module.exports = class BaseService{
    async findAll(id){
        return this.model.find({owner: id})
    }

    async find(id,owner){
        return this.model.findOne({_id:id,owner:owner})
    }

    async add(item){
        return this.model.create(item)
    }

    async update(id,item){
        return this.model.findByIdAndUpdate(id,item,{new:true})
    }

    async delete(id,owner){
        return this.model.deleteOne({_id:id,owner:owner})
    }
}