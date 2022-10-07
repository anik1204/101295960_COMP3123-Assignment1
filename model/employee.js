const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxLength: 100},
    last_name: { type: String, required: true, maxLength: 50},
    email: { type: String, required: true, unique: true, maxLength: 50 },
    gender: { type: String, required: true, maxLength: 25 },
    salary: { type: Number, required: true },

},
{collection: 'Employees'});

const model = mongoose.model('employeeSchema', employeeSchema);
module.exports = model;