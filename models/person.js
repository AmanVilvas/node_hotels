const mongoose = require('mongoose');
//create person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String, // Change to String to allow hyphens or formatting
        //by this database will expect you to add the number in " " and have hypens or any char
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

//creates person's model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
//helloooooo