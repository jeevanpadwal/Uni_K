const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://G1:Password@cohort.cb4iojj.mongodb.net/net?retryWrites=true&w=majority')
const todoSchema = mongoose.Schema({
      title :String,
      description: String,
      completed : Boolean
})

const todo = mongoose.model('todos',todoSchema)

module.exports ={
    todo
}