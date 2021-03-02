const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    pages: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Page'
    }]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel