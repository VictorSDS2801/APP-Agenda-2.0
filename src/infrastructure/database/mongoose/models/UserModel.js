const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        defauld: "student"
    },
    createdAt: {
        type: Date,
        defauld: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)