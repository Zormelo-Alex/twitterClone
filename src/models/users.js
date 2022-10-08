const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    signUpDate: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    }
});


const Users = mongoose.model("Users", userSchema);

module.exports = Users;
