const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost/todo', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    console.log('Connected')
}

main()