const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }, is_completed: {
        type: Boolean,
        default: false
    },
    completed_at: {
        type: Date
    },
    page: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Page'
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

const TodoModel = mongoose.model('Todo', TodoSchema)

module.exports = TodoModel