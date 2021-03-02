const mongoose = require('mongoose')

const PageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    todos: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Todo'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

const PageModel = mongoose.model('Page', PageSchema)

module.exports = PageModel